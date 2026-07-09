/**
 * Beam Suntory × Whisky Advocate — combined native extension fixture.
 *
 * Two concurrent WA.com native programs through **2026-03-01**:
 *
 * | Program | Flight | Prod / month |
 * |---------|--------|--------------|
 * | **House of Suntory** | 2025-10-15 → 2026-03-01 | $3,489 (Oct–Nov) then $3,489.75/mo (Dec–Feb) |
 * | **America's Top Whisky Bars 2025** | 2026-01-17 → 2026-03-01 | $3,489 |
 *
 * **Total net media:** **$17,447.25** · **Book:** $12.00 endemic native planning CPM.
 *
 * Monthly table = combined delivery grain (both line items in-market where dates overlap).
 *
 * Open `/reporting?campaign=beam-suntory` (also `?campaign=beam` or `?campaign=suntory`).
 */

import type { AudienceBucket, CampaignReport } from './bigSmokeMiami'
import {
  impressionsFromMediaSpend,
  REPORTING_DEFAULT_CTR_PCT,
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

/** House of Suntory Oct 15–Nov 15 */
const HOUSE_OCT_NOV_USD = 3489
/** House of Suntory Dec / Jan / Feb */
const HOUSE_MONTHLY_USD = 3489.75
/** America's Top Whisky Bars Jan 17–Mar 1 */
const WHISKY_BARS_USD = 3489

const TOTAL_MEDIA_SPEND_USD =
  Math.round((HOUSE_OCT_NOV_USD + HOUSE_MONTHLY_USD * 3 + WHISKY_BARS_USD) * 100) / 100

const HOUSE_OCT_NOV_IMP = impressionsFromMediaSpend(HOUSE_OCT_NOV_USD, BOOKED_CPM_USD)
const HOUSE_MONTHLY_IMP = impressionsFromMediaSpend(HOUSE_MONTHLY_USD, BOOKED_CPM_USD)
const WHISKY_BARS_IMP = impressionsFromMediaSpend(WHISKY_BARS_USD, BOOKED_CPM_USD)

/** First IO: Oct 15–Nov 15 (32 days). */
const HOUSE_OCT_IMP = Math.round((HOUSE_OCT_NOV_IMP * 17) / 32)
const HOUSE_NOV_IMP = HOUSE_OCT_NOV_IMP - HOUSE_OCT_IMP

/** Whisky Bars: Jan 17–Mar 1 (44 days). */
const WHISKY_BARS_DAYS = daysInclusive('2026-01-17', FLIGHT_END)
const WHISKY_BARS_JAN_IMP = Math.round((WHISKY_BARS_IMP * 15) / WHISKY_BARS_DAYS)
const WHISKY_BARS_FEB_IMP = Math.round((WHISKY_BARS_IMP * 28) / WHISKY_BARS_DAYS)
const WHISKY_BARS_MAR_IMP =
  WHISKY_BARS_IMP - WHISKY_BARS_JAN_IMP - WHISKY_BARS_FEB_IMP

function clicksForImps(imps: number, ctrPct: number): number {
  return Math.max(0, Math.round((imps * ctrPct) / 100))
}

const MONTHLY_SEGMENTS: MonthlyDeliverySegment[] = [
  {
    start: '2025-10-15',
    end: '2025-10-31',
    impressions: HOUSE_OCT_IMP,
    clicks: clicksForImps(HOUSE_OCT_IMP, 0.98),
  },
  {
    start: '2025-11-01',
    end: '2025-11-15',
    impressions: HOUSE_NOV_IMP,
    clicks: clicksForImps(HOUSE_NOV_IMP, 1.0),
  },
  {
    start: '2025-12-01',
    end: '2025-12-31',
    impressions: HOUSE_MONTHLY_IMP,
    clicks: clicksForImps(HOUSE_MONTHLY_IMP, 1.02),
  },
  {
    start: '2026-01-01',
    end: '2026-01-31',
    impressions: HOUSE_MONTHLY_IMP + WHISKY_BARS_JAN_IMP,
    clicks: clicksForImps(HOUSE_MONTHLY_IMP + WHISKY_BARS_JAN_IMP, 1.01),
  },
  {
    start: '2026-02-01',
    end: '2026-02-28',
    impressions: HOUSE_MONTHLY_IMP + WHISKY_BARS_FEB_IMP,
    clicks: clicksForImps(HOUSE_MONTHLY_IMP + WHISKY_BARS_FEB_IMP, 1.03),
  },
  {
    start: '2026-03-01',
    end: '2026-03-01',
    impressions: WHISKY_BARS_MAR_IMP,
    clicks: clicksForImps(WHISKY_BARS_MAR_IMP, 1.05),
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
    id: 'house-of-suntory',
    label: 'House of Suntory · Japanese whisky',
    description:
      'Premium Japanese whisky storytelling on Whisky Advocate endemic inventory — Oct 2025 through Mar 1, 2026.',
    cohorts: [
      {
        title: 'Japanese & world whisky enthusiasts',
        detail:
          'Modeled and endemic readers aligned to Yamazaki, Hibiki, and Toki — “Crafted in Japan. Revered Around the World.”',
      },
      {
        title: 'WA.com article native',
        detail: 'Editorial native on reviews, culture, and luxury spirits coverage during monthly flight windows.',
      },
      {
        title: 'Member newsletter native',
        detail: 'Subscriber newsletter blocks timed to monthly $3,489.75 extensions (Dec–Feb).',
      },
    ],
  },
  {
    id: 'whisky-bars',
    label: "America's Top Whisky Bars 2025",
    description: 'Secondary native line — bar culture and venue discovery (Jan 17–Mar 1, 2026).',
    cohorts: [
      {
        title: 'On-premise & bar culture intent',
        detail:
          'Readers indexing on whisky bars, cocktail culture, and venue discovery — “Discover America’s Top Whisky Bars 2025.”',
      },
      {
        title: 'Geo-weighted metro bar scene',
        detail: 'Delivery weighted to major whisky-bar DMAs and on-premise enthusiast cohorts.',
      },
      {
        title: 'Sequential retargeting',
        detail: 'WA.com native retargeting from Top Whisky Bars hub engagement during Jan–Mar flight.',
      },
    ],
  },
]

export const beamSuntoryWhiskyAdvocateCampaign: CampaignReport = {
  id: 'beam_suntory_wa_native_2025_2026',
  name: 'Beam Suntory — Whisky Advocate Native Extension',
  clientFacingName: 'Beam Suntory · WA.com (multi-program)',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Programs ended ${REPORT_AS_OF} · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media · ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book) · House of Suntory + America's Top Whisky Bars.`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: Math.round(PCT_DELIVERED * 10) / 10,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media (House of Suntory $${(HOUSE_OCT_NOV_USD + HOUSE_MONTHLY_USD * 3).toLocaleString('en-US')} + Top Whisky Bars $${WHISKY_BARS_USD.toLocaleString('en-US')}) · ${DELIVERED_IMP.toLocaleString('en-US')} delivered @ ~$${CPM_USD.toFixed(2)} blended CPM · ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR). Native extension — clickthrough only.`,
  },
  geo: {
    headline:
      'National whisky enthusiast footprint — premium metro skew for Japanese whisky and on-premise bar culture.',
    primaryMarkets: [...BEAM_PRIMARY],
    driveInMarkets: [...BEAM_SECONDARY],
  },
  creative: {
    environments: 'Whisky Advocate endemic — article feed, newsletter, and homepage native units.',
    sizes: [...NATIVE_FORMATS],
    assetsFolderUrl: 'https://www.whiskyadvocate.com/',
  },
  tracking: {
    description:
      'Two native line items: (1) House of Suntory → suntory.whiskyadvocate.com/house-of-suntory.html · (2) Top Whisky Bars → whiskybars.whiskyadvocate.com. Monthly billing per M Shanken production schedule.',
    clickthroughUrl:
      'https://suntory.whiskyadvocate.com/house-of-suntory.html?utm_source=vrvo&utm_medium=native&utm_campaign=beam_house_of_suntory',
  },
  overviewObjectiveSub: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} total · House of Suntory Oct 15–Mar 1 + Top Whisky Bars Jan 17–Mar 1 · ${Math.round(IMPRESSIONS_BOOKED / 1000)}k book @ $${BOOKED_CPM_USD.toFixed(2)} CPM · combined monthly grain below.`,
  monthlyDelivery: [...MONTHLY_SEGMENTS],
  monthlyDeliveryNote:
    'Combined calendar-month delivery. House of Suntory: $3,489 (Oct 15–Nov 15) + $3,489.75/mo (Dec–Feb). Top Whisky Bars: $3,489 (Jan 17–Mar 1). Jan–Feb rows include both programs where flights overlap.',
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
      lineItem: 'Beam Suntory — WA.com native (House of Suntory + Top Whisky Bars)',
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
