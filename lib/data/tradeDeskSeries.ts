/**
 * Synthetic trade-desk time series aligned to book totals (fixture / QA).
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

function addDays(iso: string, delta: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const x = new Date(Date.UTC(y, m - 1, d + delta))
  return x.toISOString().slice(0, 10)
}

function daysInclusive(start: string, end: string): number {
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

    const baseCtr = overallCtrPct / 100
    const ctrNoise = 1 + (Math.sin(i * 1.7) * 0.09 + Math.cos(i * 0.9) * 0.06)
    const ctr = Math.max(0.55, Math.min(1.55, baseCtr * ctrNoise))
    const clicks = Math.max(0, Math.round((actualImp * ctr) / 100))

    rows.push({
      date,
      plannedImp,
      actualImp,
      clicks,
      ctr: ctr * 100,
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
): FormatDeliveryRow[] {
  const template = [0.18, 0.16, 0.14, 0.13, 0.12, 0.1, 0.09, 0.08]
  const rows: FormatDeliveryRow[] = formats.map((format, i) => {
    const t = template[i] ?? 0.08
    const imp = Math.round(deliveredImp * t)
    return { format, impressions: imp, sharePct: t * 100 }
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
