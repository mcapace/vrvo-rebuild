/**
 * Beam Suntory × Whisky Advocate — native extension fixture.
 *
 * **Flight:** 2025-10-15 → **2026-03-01** · **$3,489.75 × 4 billing periods** = **$13,959** net media.
 * **Book:** $12.00 endemic native planning CPM.
 *
 * **One IO** · **$3,489.75 × 4** = **$13,959** net media (Oct 15 → Mar 1, 2026).
 * Two **creative activations** on the same budget — not separate orders:
 *   1. House of Suntory (launch Oct 15)
 *   2. America's Top Whisky Bars 2025 (in-market from Jan 17, same period-4 budget)
 *
 * | Billing period | Dates | Prod |
 * |----------------|-------|------|
 * | 1 | Oct 15 – Oct 31 | $3,489.75 |
 * | 2 | Nov 2025 | $3,489.75 |
 * | 3 | Dec 2025 | $3,489.75 |
 * | 4 | Jan 1 – Mar 1 | $3,489.75 |
 *
 * Open `/reporting?campaign=beam-suntory` (also `?campaign=beam` or `?campaign=suntory`).
 */

import type { AudienceBucket, CampaignReport } from './bigSmokeMiami'
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

const LAUNCH = '2025-10-15'
const FLIGHT_END = '2026-03-01'
const REPORT_AS_OF = FLIGHT_END

const BOOKED_CPM_USD = REPORTING_PLANNING_CPM.endemicNative

const PERIOD_SPEND_USD = 3489.75
const BILLING_PERIODS = 4
const TOTAL_MEDIA_SPEND_USD = Math.round(PERIOD_SPEND_USD * BILLING_PERIODS * 100) / 100

const PERIOD_IMP = impressionsFromMediaSpend(PERIOD_SPEND_USD, BOOKED_CPM_USD)

function clicksForImps(imps: number, ctrPct: number): number {
  return Math.max(0, Math.round((imps * ctrPct) / 100))
}

/** Four equal billing periods — Oct launch through Mar 1 close. */
const MONTHLY_SEGMENTS: MonthlyDeliverySegment[] = [
  {
    start: '2025-10-15',
    end: '2025-10-31',
    impressions: PERIOD_IMP,
    clicks: clicksForImps(PERIOD_IMP, 0.98),
  },
  {
    start: '2025-11-01',
    end: '2025-11-30',
    impressions: PERIOD_IMP,
    clicks: clicksForImps(PERIOD_IMP, 1.0),
  },
  {
    start: '2025-12-01',
    end: '2025-12-31',
    impressions: PERIOD_IMP,
    clicks: clicksForImps(PERIOD_IMP, 1.02),
  },
  {
    start: '2026-01-01',
    end: '2026-03-01',
    impressions: PERIOD_IMP,
    clicks: clicksForImps(PERIOD_IMP, 1.03),
  },
]

const IMPRESSIONS_BOOKED = impressionsFromMediaSpend(TOTAL_MEDIA_SPEND_USD, BOOKED_CPM_USD)

const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

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

const BEAM_PRIMARY = ['New York', 'Los Angeles', 'Chicago'] as const
const BEAM_SECONDARY = ['San Francisco', 'Dallas', 'Miami', 'Seattle'] as const
const BEAM_GEO_PRIMARY = [0.26, 0.23, 0.15] as const
const BEAM_GEO_SECONDARY = [0.12, 0.11, 0.08, 0.05] as const

const beamDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 61.2 },
  { device: 'Desktop', sharePct: 31.4 },
  { device: 'Tablet', sharePct: 7.4 },
]

const beamAudiences: AudienceBucket[] = [
  {
    id: 'activation-house-of-suntory',
    label: 'Activation 1 · House of Suntory',
    description:
      'First creative rotation on the single WA.com native IO — Oct 15 through mid-January, billed at $3,489.75 per period.',
    cohorts: [
      {
        title: 'Japanese & world whisky enthusiasts',
        detail:
          '“Crafted in Japan. Revered Around the World.” — Yamazaki, Hibiki, and Toki on endemic WA.com + newsletter.',
      },
      {
        title: 'WA.com article native',
        detail: 'Article feed and embed units against the shared monthly $3,489.75 production allocation.',
      },
      {
        title: 'Click-through',
        detail: 'suntory.whiskyadvocate.com/house-of-suntory.html',
      },
    ],
  },
  {
    id: 'activation-whisky-bars',
    label: "Activation 2 · America's Top Whisky Bars 2025",
    description:
      'Second creative rotation on the same order — swapped in Jan 17 for the balance of period 4 (through Mar 1). No incremental IO; same $3,489.75/mo budget.',
    cohorts: [
      {
        title: 'On-premise & bar culture intent',
        detail:
          '“Discover America’s Top Whisky Bars 2025” — venue discovery and bar-culture messaging on the same endemic package.',
      },
      {
        title: 'Geo-weighted metro bar scene',
        detail: 'Delivery weighted to major whisky-bar DMAs within the existing flight book.',
      },
      {
        title: 'Click-through',
        detail: 'whiskybars.whiskyadvocate.com',
      },
    ],
  },
]

export const beamSuntoryWhiskyAdvocateCampaign: CampaignReport = {
  id: 'beam_suntory_wa_native_2025_2026',
  name: 'Beam Suntory — Whisky Advocate Native Extension',
  clientFacingName: 'Beam Suntory · WA.com native (one IO · two activations)',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Flight ended ${REPORT_AS_OF} · one IO · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} ($3,489.75 × 4) · ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book).`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: Math.round(PCT_DELIVERED * 10) / 10,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media on one IO ($3,489.75 × 4, Oct–Mar 1). Two creative activations (House of Suntory, then Top Whisky Bars Jan 17+) share the same budget — not separate orders. ${DELIVERED_IMP.toLocaleString('en-US')} delivered @ ~$${CPM_USD.toFixed(2)} blended CPM · ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR).`,
  },
  geo: {
    headline:
      'National whisky enthusiast footprint — premium metro skew for Japanese whisky and on-premise bar culture.',
    primaryMarkets: [...BEAM_PRIMARY],
    driveInMarkets: [...BEAM_SECONDARY],
  },
  creative: {
    environments:
      'One WA.com native IO — two creative swaps on the same $3,489.75/mo production: House of Suntory, then Top Whisky Bars (Jan 17).',
    sizes: [...NATIVE_FORMATS],
    assetsFolderUrl: 'https://www.whiskyadvocate.com/',
  },
  tracking: {
    description:
      'Single native extension order. Activation 1: House of Suntory → suntory.whiskyadvocate.com/house-of-suntory.html. Activation 2 (from Jan 17): Top Whisky Bars → whiskybars.whiskyadvocate.com. Both run against the same $3,489.75 × 4 budget.',
    clickthroughUrl:
      'https://whiskybars.whiskyadvocate.com/?utm_source=vrvo&utm_medium=native&utm_campaign=beam_whisky_bars_2025',
  },
  overviewObjectiveSub: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} on one IO ($3,489.75 × 4) · two activations · ${Math.round(IMPRESSIONS_BOOKED / 1000)}k book @ $${BOOKED_CPM_USD.toFixed(2)} CPM · Oct 15–Mar 1.`,
  monthlyDelivery: [...MONTHLY_SEGMENTS],
  monthlyDeliveryNote:
    'Each row = one $3,489.75 billing period on the same IO. Periods 1–3: House of Suntory creative. Period 4 (Jan–Mar 1): Top Whisky Bars swapped in Jan 17 — same budget allocation, new activation.',
  audienceActivationMix: [
    { name: 'Endemic site native', value: 44 },
    { name: 'Newsletter native', value: 26 },
    { name: 'Modeled whisky intent', value: 20 },
    { name: 'On-premise / bar culture', value: 10 },
  ],
  audiences: beamAudiences,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: MONTHLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-BEAM-WA-2025',
      lineItem: 'Beam Suntory — WA.com native IO ($3,489.75 × 4 · 2 activations)',
      dsp: 'Direct publisher (M Shanken native extension)',
      supplyPath: 'Whisky Advocate endemic — WA.com + member newsletter',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...BEAM_PRIMARY],
        [...BEAM_SECONDARY],
        { primary: [...BEAM_GEO_PRIMARY], secondary: [...BEAM_GEO_SECONDARY] },
      ),
      formatDelivery: buildFormatDelivery([...NATIVE_FORMATS], DELIVERED_IMP),
      deviceSplit: beamDeviceSplit,
    }
  })(),
}
