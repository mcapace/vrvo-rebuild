import type { CampaignReport } from '@/lib/data/bigSmokeMiami'

function escapeCsvCell(value: string | number | boolean): string {
  const s = String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function row(values: (string | number | boolean)[]): string {
  return values.map(escapeCsvCell).join(',')
}

/** UTF-8 BOM so Excel on Windows recognizes UTF-8. */
const CSV_BOM = '\uFEFF'

/**
 * Single workbook-style CSV: summary metrics, daily grain, then geo / format / device blocks.
 * Suitable for spreadsheets or BI ingestion.
 */
export function buildCampaignReportCsv(campaign: CampaignReport): string {
  const { delivery, tradeDesk, performance, flight } = campaign
  const td = tradeDesk.meta

  const deliveredImp = Math.round((delivery.impressionsPurchased * delivery.pctDelivered) / 100)
  const mediaCost = (deliveredImp / 1000) * delivery.cpmUsd
  const bookedSpend = (delivery.impressionsPurchased / 1000) * delivery.cpmUsd
  const totalClicks = tradeDesk.daily.reduce((a, r) => a + r.clicks, 0)
  const blendedCtr =
    deliveredImp > 0 ? (totalClicks / deliveredImp) * 100 : performance.ctrPct
  const cpc = totalClicks > 0 ? mediaCost / totalClicks : 0

  const lines: string[] = []

  lines.push('Campaign summary')
  lines.push(row(['Metric', 'Value']))
  lines.push(row(['Campaign ID', campaign.id]))
  lines.push(row(['Campaign name', campaign.name]))
  lines.push(row(['Client-facing name', campaign.clientFacingName]))
  lines.push(row(['Flight launched', flight.launched]))
  lines.push(row(['In market', flight.inMarket ? 'Yes' : 'No']))
  lines.push(row(['Flight summary', flight.summary]))
  lines.push(row(['IO number', td.ioNumber]))
  lines.push(row(['Line item', td.lineItem]))
  lines.push(row(['DSP', td.dsp]))
  lines.push(row(['Supply path', td.supplyPath]))
  lines.push(row(['Currency', td.currency]))
  lines.push(row(['Flight planned days', td.flightPlannedDays]))
  lines.push(row(['Report generated at', td.reportGeneratedAt]))
  lines.push(row(['Last data date', td.lastDataDate]))
  lines.push(row(['Booked impressions', delivery.impressionsPurchased]))
  lines.push(row(['Delivered impressions', deliveredImp]))
  lines.push(row(['Flight completion %', delivery.pctDelivered]))
  lines.push(row(['CPM (USD)', delivery.cpmUsd]))
  lines.push(row(['Estimated spend (delivered)', Math.round(mediaCost * 100) / 100]))
  lines.push(row(['Booked media value (USD)', Math.round(bookedSpend * 100) / 100]))
  lines.push(row(['Total clicks', totalClicks]))
  lines.push(row(['Blended CTR %', Math.round(blendedCtr * 1000) / 1000]))
  lines.push(row(['CPC (USD)', Math.round(cpc * 1000) / 1000]))
  lines.push(row(['Measurement note', performance.measurementNote]))
  lines.push(row(['Geo headline', campaign.geo.headline]))

  lines.push('')
  lines.push('Daily performance')
  lines.push(
    row([
      'Date',
      'Planned impressions',
      'Actual impressions',
      'Delta (actual - planned)',
      'Clicks',
      'CTR %',
      'Cumulative actual',
      'Cumulative planned',
      'Pace index',
      'Pace vs plan %',
    ]),
  )

  for (const r of tradeDesk.daily) {
    const delta = r.actualImp - r.plannedImp
    lines.push(
      row([
        r.date,
        r.plannedImp,
        r.actualImp,
        delta,
        r.clicks,
        Math.round(r.ctr * 1000) / 1000,
        r.cumulativeActual,
        r.cumulativePlanned,
        Math.round(r.paceIndex * 10000) / 10000,
        Math.round((r.paceIndex * 100 - 100) * 10) / 10,
      ]),
    )
  }

  lines.push('')
  lines.push('Geo delivery')
  lines.push(row(['Region', 'Impressions', 'Share %']))
  for (const g of tradeDesk.geoDelivery) {
    lines.push(row([g.region, g.impressions, Math.round(g.sharePct * 10) / 10]))
  }

  lines.push('')
  lines.push('Format delivery')
  lines.push(row(['Format', 'Impressions', 'Share %']))
  for (const f of tradeDesk.formatDelivery) {
    lines.push(row([f.format, f.impressions, Math.round(f.sharePct * 10) / 10]))
  }

  lines.push('')
  lines.push('Device split')
  lines.push(row(['Device', 'Share %']))
  for (const d of tradeDesk.deviceSplit) {
    lines.push(row([d.device, Math.round(d.sharePct * 10) / 10]))
  }

  lines.push('')
  lines.push('Audience cohorts')
  lines.push(row(['Audience bucket', 'Cohort', 'Detail']))
  for (const bucket of campaign.audiences) {
    for (const c of bucket.cohorts) {
      lines.push(row([bucket.label, c.title, c.detail]))
    }
  }

  return CSV_BOM + lines.join('\n')
}

export function downloadCampaignReportCsv(campaign: CampaignReport): void {
  const csv = buildCampaignReportCsv(campaign)
  const stamp = new Date().toISOString().slice(0, 10)
  const safeId = campaign.id.replace(/[^a-zA-Z0-9-_]/g, '_')
  const filename = `VRVO_report_${safeId}_${stamp}.csv`

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
