/**
 * Davidoff × Cigar Aficionado — native extension (AVO Expresivo).
 *
 * **Flight:** 2026-07-01 → **2026-07-31** · **Production:** **$2,000**
 * **Book:** $12.00 endemic native planning CPM → **166,667** impressions.
 *
 * Creative: *AVO Continues Burn Brighter Celebration with New EXPRESIVO Line*
 * CTA: Find Out More
 * URL: https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line
 *
 * Open `/reporting?campaign=davidoff-ca` (also `?campaign=davidoff` or `?campaign=avo`).
 */

import type {
  AudienceBucket,
  BillingPeriodRow,
  CampaignReport,
  CreativeTraffickingEvent,
} from './bigSmokeMiami'
import {
  impressionsFromMediaSpend,
  REPORTING_PLANNING_CPM,
} from './reportingCpmDefaults'
import {
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDailyFromMonthlySegments,
  daysInclusive,
  type DeviceSplitRow,
  type MonthlyDeliverySegment,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2026-07-01'
const FLIGHT_END = '2026-07-31'
const REPORT_AS_OF = FLIGHT_END

const BOOKED_CPM_USD = REPORTING_PLANNING_CPM.endemicNative
const TOTAL_MEDIA_SPEND_USD = 2000

const HEADLINE = 'AVO Continues Burn Brighter Celebration with New EXPRESIVO Line'
const CTA = 'Find Out More'
const CLICKTHROUGH_URL =
  'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line?utm_source=vrvo&utm_medium=native&utm_campaign=davidoff_avo_expresivo_jul2026'

function clicksForImps(imps: number, ctrPct: number): number {
  return Math.max(0, Math.round((imps * ctrPct) / 100))
}

/**
 * Weekly partner grain within the single July billing period —
 * slight over-delivery vs book (~101.4%).
 */
const WEEKLY_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-07-01', end: '2026-07-07', impressions: 35_840, clicks: clicksForImps(35_840, 0.96) },
  { start: '2026-07-08', end: '2026-07-14', impressions: 42_610, clicks: clicksForImps(42_610, 1.02) },
  { start: '2026-07-15', end: '2026-07-21', impressions: 44_925, clicks: clicksForImps(44_925, 1.09) },
  { start: '2026-07-22', end: '2026-07-31', impressions: 45_720, clicks: clicksForImps(45_720, 1.05) },
]

const BILLING_PERIOD_ROWS: BillingPeriodRow[] = [
  {
    period: 'July 2026',
    start: LAUNCH,
    end: FLIGHT_END,
    spendUsd: TOTAL_MEDIA_SPEND_USD,
    impressions: WEEKLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0),
    clicks: WEEKLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0),
    creativeLabel: 'AVO Expresivo — Burn Brighter',
    placements: 'Article feed native · Newsletter · Homepage native · Mobile web',
  },
]

const CREATIVE_TRAFFICKING_LOG: CreativeTraffickingEvent[] = [
  {
    date: '2026-07-01',
    action: 'launch',
    creativeName: 'AVO Expresivo — Burn Brighter',
    headline: HEADLINE,
    destinationUrl:
      'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line',
    placementsUpdated: 'Article feed native card · Newsletter native block',
    notes: `Tags live on CA.com endemic package. CTA: ${CTA}.`,
  },
  {
    date: '2026-07-08',
    action: 'refresh',
    creativeName: 'AVO Expresivo — Burn Brighter',
    headline: HEADLINE,
    destinationUrl:
      'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line',
    placementsUpdated: 'Homepage native unit · Mobile web article native',
    notes: 'Incremental homepage + mobile placements added; same click-through and CTA.',
  },
  {
    date: '2026-07-20',
    action: 'refresh',
    creativeName: 'AVO Expresivo — Burn Brighter',
    destinationUrl:
      'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line',
    placementsUpdated: 'Newsletter native block',
    notes: 'Newsletter asset re-trafficked mid-flight — headline and destination unchanged.',
  },
  {
    date: '2026-07-31',
    action: 'close',
    creativeName: 'AVO Expresivo — Burn Brighter',
    placementsUpdated: 'All active units',
    notes: 'Flight end — tags removed, July delivery reconciled.',
  },
]

const IMPRESSIONS_BOOKED = impressionsFromMediaSpend(TOTAL_MEDIA_SPEND_USD, BOOKED_CPM_USD)
const DELIVERED_IMP = WEEKLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, WEEKLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP
const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, FLIGHT_END)

const NATIVE_FORMATS = [
  'Article feed native card',
  'Mobile web article native',
  'Desktop article embed',
  'Newsletter native block',
  'Homepage native unit',
]

const DAV_PRIMARY = ['New York', 'Miami', 'Los Angeles'] as const
const DAV_SECONDARY = ['Chicago', 'Dallas', 'Houston', 'Atlanta'] as const
const DAV_GEO_PRIMARY = [0.27, 0.22, 0.18] as const
const DAV_GEO_SECONDARY = [0.11, 0.09, 0.08, 0.05] as const

const davidoffDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 63.1 },
  { device: 'Desktop', sharePct: 29.6 },
  { device: 'Tablet', sharePct: 7.3 },
]

const davidoffAudiences: AudienceBucket[] = [
  {
    id: 'activation-avo-expresivo',
    label: 'AVO Expresivo · Burn Brighter',
    description:
      'July CA.com native extension promoting the new AVO EXPRESIVO line within the Burn Brighter celebration.',
    cohorts: [
      {
        title: 'Premium cigar enthusiasts',
        detail:
          'CA.com readers and newsletter subscribers engaged with premium Dominican / Davidoff-family product stories.',
      },
      {
        title: 'Article-adjacent native',
        detail:
          'Feed and embed units against AVO / Burn Brighter editorial adjacency on Cigar Aficionado.',
      },
      {
        title: 'Click-through',
        detail:
          'cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line — CTA: Find Out More',
      },
    ],
  },
]

export const davidoffAvoExpresivoCampaign: CampaignReport = {
  id: 'davidoff_avo_expresivo_ca_native_jul2026',
  name: 'Davidoff — CA.com Native · AVO Expresivo',
  clientFacingName: 'Davidoff · AVO Expresivo (July)',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Flight ended ${REPORT_AS_OF} · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} production · ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} book).`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: Math.round(PCT_DELIVERED * 10) / 10,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} CA.com native (Jul 1–31). Creative: “${HEADLINE}” · CTA ${CTA}. ${DELIVERED_IMP.toLocaleString('en-US')} delivered @ ~$${CPM_USD.toFixed(2)} blended CPM · ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR).`,
  },
  geo: {
    headline:
      'National premium cigar footprint — metro skew for CA.com endemic readers and Davidoff / AVO buyers.',
    primaryMarkets: [...DAV_PRIMARY],
    driveInMarkets: [...DAV_SECONDARY],
  },
  creative: {
    environments:
      'CA.com native extension — article feed, newsletter, homepage, and mobile web units for AVO Expresivo.',
    sizes: [...NATIVE_FORMATS],
    assetsFolderUrl: 'https://www.cigaraficionado.com/',
  },
  tracking: {
    description: `${HEADLINE} · CTA: ${CTA}. Routes to the Cigar Aficionado article experience as trafficked for the July IO.`,
    clickthroughUrl: CLICKTHROUGH_URL,
  },
  overviewObjectiveSub: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} Jul production · ${Math.round(IMPRESSIONS_BOOKED / 1000)}k book @ $${BOOKED_CPM_USD.toFixed(2)} CPM · AVO Expresivo Burn Brighter on CA.com native.`,
  monthlyDelivery: [...WEEKLY_SEGMENTS],
  monthlyDeliveryNote:
    'Weekly delivery grain within the single July billing period ($2,000 production). Slight over-delivery vs $12 CPM book at flight close.',
  billingPeriods: [...BILLING_PERIOD_ROWS],
  creativeTraffickingLog: [...CREATIVE_TRAFFICKING_LOG],
  audienceActivationMix: [
    { name: 'Endemic site native', value: 48 },
    { name: 'Newsletter native', value: 28 },
    { name: 'Modeled cigar affinity', value: 16 },
    { name: 'Article retargeting', value: 8 },
  ],
  audiences: davidoffAudiences,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: WEEKLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-DAVIDOFF-AVO-JUL2026',
      lineItem: 'Davidoff — CA.com Native Extension · AVO Expresivo (Jul 2026)',
      dsp: 'Direct publisher (M Shanken native extension)',
      supplyPath: 'Cigar Aficionado endemic — CA.com + member newsletter',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...DAV_PRIMARY],
        [...DAV_SECONDARY],
        { primary: [...DAV_GEO_PRIMARY], secondary: [...DAV_GEO_SECONDARY] },
      ),
      formatDelivery: buildFormatDelivery([...NATIVE_FORMATS], DELIVERED_IMP),
      deviceSplit: davidoffDeviceSplit,
    }
  })(),
}
