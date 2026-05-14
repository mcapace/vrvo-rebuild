/**
 * Trade-desk-shaped time series aligned to book totals (internal QA / planning projections).
 * Daily counts sum to delivered impressions; pacing curve vs planned flight length.
 */

export interface TradeDeskDailyRow {
  date: string
  /** Planned impressions for that calendar day (linear flight pacing). */
  plannedImp: number
  /** Delivered impressions (simulated daily distribution). */
  actualImp: number
  clicks: number
  /** Daily CTR % */
  ctr: number
  cumulativeActual: number
  cumulativePlanned: number
  /** Pace index: cumulative actual / cumulative planned at this date */
  paceIndex: number
}

export interface GeoDeliveryRow {
  region: string
  impressions: number
  sharePct: number
}

export interface FormatDeliveryRow {
  format: string
  impressions: number
  sharePct: number
}

export interface DeviceSplitRow {
  device: string
  sharePct: number
}

export interface TradeDeskMeta {
  reportGeneratedAt: string
  ioNumber: string
  lineItem: string
  dsp: string
  supplyPath: string
  flightPlannedDays: number
  /** Last date included in daily grain */
  lastDataDate: string
  currency: string
}

export function addDays(iso: string, delta: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const x = new Date(Date.UTC(y, m - 1, d + delta))
  return x.toISOString().slice(0, 10)
}

export function daysInclusive(start: string, end: string): number {
  const [ys, ms, ds] = start.split('-').map(Number)
  const [ye, me, de] = end.split('-').map(Number)
  const a = Date.UTC(ys, ms - 1, ds)
  const b = Date.UTC(ye, me - 1, de)
  return Math.round((b - a) / 86400000) + 1
}

export function buildTradeDeskDaily(params: {
  launchDate: string
  lastDate: string
  impressionsBooked: number
  pctDelivered: number
  overallCtrPct: number
  flightPlannedDays: number
}): TradeDeskDailyRow[] {
  const {
    launchDate,
    lastDate,
    impressionsBooked,
    pctDelivered,
    overallCtrPct,
    flightPlannedDays,
  } = params

  const deliveredTotal = Math.round((impressionsBooked * pctDelivered) / 100)
  const n = daysInclusive(launchDate, lastDate)

  const weights: number[] = []
  for (let i = 0; i < n; i++) {
    const iso = addDays(launchDate, i)
    const [y, m, d] = iso.split('-').map(Number)
    const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
    const weekend = wd === 0 || wd === 6 ? 0.68 : 1.02
    const wave = 1 + 0.12 * Math.sin((i / 4.2) * Math.PI)
    const dip = i < 3 ? 0.88 : 1 // ramp-up first days
    weights.push(weekend * wave * dip)
  }

  const sumW = weights.reduce((a, b) => a + b, 0)
  let raw = weights.map((w) => Math.round((deliveredTotal * w) / sumW))
  let diff = deliveredTotal - raw.reduce((a, b) => a + b, 0)
  let ix = raw.length - 1
  while (diff !== 0 && ix >= 0) {
    const adj = diff > 0 ? 1 : -1
    if (raw[ix] + adj >= 0) {
      raw[ix] += adj
      diff -= adj
    }
    ix -= 1
  }

  const rows: TradeDeskDailyRow[] = []
  let cumA = 0
  let cumP = 0

  const plannedDailyRate = impressionsBooked / flightPlannedDays

  for (let i = 0; i < n; i++) {
    const date = addDays(launchDate, i)
    const actualImp = raw[i]

    const dayPlannedTotal = Math.min(
      impressionsBooked,
      plannedDailyRate * (i + 1),
    )
    const prevPlanned = Math.min(impressionsBooked, plannedDailyRate * i)
    const plannedImp = Math.round(dayPlannedTotal - prevPlanned)

    cumA += actualImp
    cumP = Math.min(impressionsBooked, Math.round(plannedDailyRate * (i + 1)))

    /** Daily CTR in percent (e.g. 1.024). Same units as `overallCtrPct`. */
    const ctrNoise = 1 + (Math.sin(i * 1.7) * 0.09 + Math.cos(i * 0.9) * 0.06)
    const ctrPct = Math.max(0.55, Math.min(1.55, overallCtrPct * ctrNoise))
    const clicks = Math.max(0, Math.round((actualImp * ctrPct) / 100))

    rows.push({
      date,
      plannedImp,
      actualImp,
      clicks,
      ctr: ctrPct,
      cumulativeActual: cumA,
      cumulativePlanned: cumP,
      paceIndex: cumP > 0 ? cumA / cumP : 1,
    })
  }

  return rows
}

/** One calendar slice with exact delivered impressions and clicks (sums preserved). */
export type MonthlyDeliverySegment = {
  start: string
  end: string
  impressions: number
  clicks: number
}

/**
 * Builds daily rows so each segment’s impressions and clicks sum exactly to the inputs
 * (within-segment day splits use weekend-weighted noise like `buildTradeDeskDaily`).
 * Planned curve is linear against `impressionsBooked` over `flightPlannedDays` from first row.
 */
export function buildTradeDeskDailyFromMonthlySegments(params: {
  segments: MonthlyDeliverySegment[]
  impressionsBooked: number
  flightPlannedDays: number
}): TradeDeskDailyRow[] {
  const { segments, impressionsBooked, flightPlannedDays } = params
  if (!segments.length || flightPlannedDays < 1) return []

  type Day = { date: string; actualImp: number; clicks: number }
  const days: Day[] = []

  for (const seg of segments) {
    const n = daysInclusive(seg.start, seg.end)
    if (n < 1) continue

    const weights: number[] = []
    for (let i = 0; i < n; i++) {
      const iso = addDays(seg.start, i)
      const [y, m, d] = iso.split('-').map(Number)
      const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
      const weekend = wd === 0 || wd === 6 ? 0.68 : 1.02
      const wave = 1 + 0.08 * Math.sin((i / Math.max(n, 2)) * Math.PI)
      weights.push(weekend * wave)
    }

    const sumW = weights.reduce((a, b) => a + b, 0)
    let imps = weights.map((w) => Math.round((seg.impressions * w) / sumW))
    let diff = seg.impressions - imps.reduce((a, b) => a + b, 0)
    let ix = imps.length - 1
    while (diff !== 0 && ix >= 0) {
      const adj = diff > 0 ? 1 : -1
      if (imps[ix] + adj >= 0) {
        imps[ix] += adj
        diff -= adj
      }
      ix -= 1
    }

    const segTotalImp = imps.reduce((a, b) => a + b, 0)
    let clk = imps.map((imp) => Math.round((seg.clicks * imp) / Math.max(segTotalImp, 1)))
    diff = seg.clicks - clk.reduce((a, b) => a + b, 0)
    ix = clk.length - 1
    while (diff !== 0 && ix >= 0) {
      const adj = diff > 0 ? 1 : -1
      if (clk[ix] + adj >= 0) {
        clk[ix] += adj
        diff -= adj
      }
      ix -= 1
    }

    for (let i = 0; i < n; i++) {
      days.push({ date: addDays(seg.start, i), actualImp: imps[i], clicks: clk[i] })
    }
  }

  const nRows = days.length
  if (!nRows) return []

  const plannedDailyRate = impressionsBooked / flightPlannedDays
  let cumA = 0
  const rows: TradeDeskDailyRow[] = []

  for (let i = 0; i < nRows; i++) {
    const { date, actualImp, clicks } = days[i]
    const dayPlannedTotal = Math.min(impressionsBooked, plannedDailyRate * (i + 1))
    const prevPlanned = Math.min(impressionsBooked, plannedDailyRate * i)
    const plannedImp = Math.round(dayPlannedTotal - prevPlanned)
    cumA += actualImp
    const cumP = Math.min(impressionsBooked, Math.round(plannedDailyRate * (i + 1)))
    const ctrPct = actualImp > 0 ? (clicks / actualImp) * 100 : 0

    rows.push({
      date,
      plannedImp,
      actualImp,
      clicks,
      ctr: Math.round(ctrPct * 1000) / 1000,
      cumulativeActual: cumA,
      cumulativePlanned: cumP,
      paceIndex: cumP > 0 ? cumA / cumP : 1,
    })
  }

  return rows
}

export function buildGeoDelivery(
  deliveredImp: number,
  primary: string[],
  secondary: string[],
): GeoDeliveryRow[] {
  const sharesPrimary = [0.34, 0.22, 0.18]
  const sharesSecondary = [0.09, 0.08, 0.05, 0.04]
  const rows: GeoDeliveryRow[] = []
  primary.forEach((region, i) => {
    const sharePct = sharesPrimary[i] ?? 0
    rows.push({
      region,
      impressions: Math.round(deliveredImp * sharePct),
      sharePct: sharePct * 100,
    })
  })
  secondary.forEach((region, i) => {
    const sharePct = sharesSecondary[i] ?? 0
    rows.push({
      region,
      impressions: Math.round(deliveredImp * sharePct),
      sharePct: sharePct * 100,
    })
  })
  const sumImp = rows.reduce((a, r) => a + r.impressions, 0)
  const drift = deliveredImp - sumImp
  if (rows.length && drift !== 0) {
    rows[rows.length - 1].impressions += drift
  }
  return rows
}

export function buildFormatDelivery(
  formats: string[],
  deliveredImp: number,
  /** Optional share weights (must sum to ~1; same length as formats or padded). */
  weightTemplate?: number[],
): FormatDeliveryRow[] {
  const base = weightTemplate ?? [0.18, 0.16, 0.14, 0.13, 0.12, 0.1, 0.09, 0.08]
  const t = formats.map((_, i) => base[i] ?? 0.08)
  const sumT = t.reduce((a, b) => a + b, 0)
  const norm = t.map((w) => w / sumT)
  const rows: FormatDeliveryRow[] = formats.map((format, i) => {
    const w = norm[i] ?? 0
    const imp = Math.round(deliveredImp * w)
    return { format, impressions: imp, sharePct: Math.round(w * 10000) / 100 }
  })
  const sumImp = rows.reduce((a, r) => a + r.impressions, 0)
  const drift = deliveredImp - sumImp
  if (rows.length && drift !== 0) {
    rows[rows.length - 1].impressions += drift
  }
  return rows
}

export function buildDeviceSplit(): DeviceSplitRow[] {
  return [
    { device: 'Mobile', sharePct: 54.2 },
    { device: 'Desktop', sharePct: 41.8 },
    { device: 'Tablet', sharePct: 4.0 },
  ]
}
