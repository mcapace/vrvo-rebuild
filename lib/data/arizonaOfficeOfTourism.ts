/**
 * Arizona Office of Tourism — display fixture.
 *
 * **Book:** 405,000 impressions (IO cap). **Flight ended** 2026-04-30.
 * **Net media spend** over the flight: **$4,500** — blended **CPM** = spend ÷ delivered imps.
 *
 * Monthly delivery (exact imps & clicks — no rescaling):
 *
 * | Month    | Impressions | CTR¹   | Clicks |
 * |----------|--------------:|--------|-------:|
 * | Nov 2025 |        28,450 | 1.05%  |    299 |
 * | Dec 2025 |        54,120 | 1.14%  |    617 |
 * | Jan 2026 |        64,890 | 1.22%  |    792 |
 * | Feb 2026 |        72,315 | 1.28%  |    926 |
 * | Mar 2026 |        83,477 | 1.31%  |  1,094 |
 * | Apr 2026 |        96,847 | 1.34%² |  1,293 |
 * | **Total**|   **400,099** | 1.25%  | **5,021** |
 *
 * ¹ CTR = clicks ÷ impressions for that month. ² April = flight-close estimate (not in original Nov–Mar extract).
 *
 * Open `/reporting?campaign=arizona` (any casing).
 */

import type { AudienceBucket, CampaignReport } from './bigSmokeMiami'
import {
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDailyFromMonthlySegments,
  daysInclusive,
  type DeviceSplitRow,
  type MonthlyDeliverySegment,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2025-11-01'
const REPORT_AS_OF = '2026-04-30'

/**
 * Nov–Mar: partner-reported monthly delivery (exact). Apr: flight-close estimate (non-round; modest lift vs March).
 */
const MONTHLY_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2025-11-01', end: '2025-11-30', impressions: 28_450, clicks: 299 },
  { start: '2025-12-01', end: '2025-12-31', impressions: 54_120, clicks: 617 },
  { start: '2026-01-01', end: '2026-01-31', impressions: 64_890, clicks: 792 },
  { start: '2026-02-01', end: '2026-02-29', impressions: 72_315, clicks: 926 },
  { start: '2026-03-01', end: '2026-03-31', impressions: 83_477, clicks: 1_094 },
  { start: '2026-04-01', end: '2026-04-30', impressions: 96_847, clicks: 1_293 },
]

/** IO book — cap slightly above delivered flight total for pacing headroom in reporting. */
const IMPRESSIONS_BOOKED = 405_000

const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

/** Actualized net media spend over Nov–Apr flight (drives blended CPM in the dashboard). */
const TOTAL_MEDIA_SPEND_USD = 4500

/** Blended CPM from spend and delivered imps: (spend / (imps/1000))). */
const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP

const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, REPORT_AS_OF)

const arizonaFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

const ARIZONA_FORMAT_WEIGHTS = [0.11, 0.14, 0.2, 0.16, 0.14, 0.12, 0.09, 0.04]

/** Out-of-state prospecting only — shares sum to 1 (normalized in `buildGeoDelivery` if needed). */
const ARIZONA_PRIMARY_FEEDER_DMAS = ['Los Angeles', 'Las Vegas', 'Denver'] as const
const ARIZONA_SECONDARY_FEEDER_DMAS = [
  'Dallas–Fort Worth',
  'Salt Lake City',
  'San Diego',
  'Seattle',
] as const
const ARIZONA_GEO_PRIMARY_SHARES = [0.26, 0.2, 0.14] as const
const ARIZONA_GEO_SECONDARY_SHARES = [0.12, 0.1, 0.1, 0.08] as const

const arizonaDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 58.6 },
  { device: 'Desktop', sharePct: 34.2 },
  { device: 'Tablet', sharePct: 7.2 },
]

const arizonaAudienceBuckets: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Travel intent & in-market',
    description: 'Modeled and behavioral signals for leisure travel to Arizona from out-of-state origin markets.',
    cohorts: [
      {
        title: 'Destination intent — warm / hot',
        detail:
          'Households outside Arizona actively researching flights, resorts, and outdoor itineraries to Arizona; aligned to Visit Arizona seasonal pushes in feeder DMAs.',
      },
      {
        title: 'Regional fly & drive feeders',
        detail:
          'Short-haul flights and weekend drive rings (CA, NV, CO, TX, UT) into Arizona’s core visit corridors — aligned to Visit Arizona feeder-DMA strategy.',
      },
      {
        title: 'Outdoor & national-park affinity',
        detail:
          'Hiking, scenic drives, and park pass purchasers in origin states — messaging indexes to northern Arizona and Grand Canyon itineraries as the trip destination.',
      },
    ],
  },
  {
    id: 'context',
    label: 'Premium context & conquest',
    description: 'Brand-safe environments and light conquest against competing sun destinations.',
    cohorts: [
      {
        title: 'Travel & lifestyle publishers',
        detail: 'PMP and curated open auction on tier-1 travel, news, and sports — road trip and spring break adjacency.',
      },
      {
        title: 'Conquest: competing sun destinations',
        detail:
          'Contextual exclusions for brand safety; conquest only where overlap modeling shows incremental reach, not bid inflation.',
      },
    ],
  },
]

export const arizonaOfficeOfTourismCampaign: CampaignReport = {
  id: 'arizona_office_of_tourism_display_2025',
  name: 'Visit Arizona — Display awareness',
  clientFacingName: 'Arizona Office of Tourism',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Flight ended ${REPORT_AS_OF} · ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked · ${DELIVERED_IMP.toLocaleString('en-US')} delivered · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend (~${((DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100).toFixed(1)}% of book).`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media over Nov–Apr flight; ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${((TOTAL_CLICKS / DELIVERED_IMP) * 100).toFixed(2)}% CTR). Nov–Mar are partner line-item actuals; April is the flight-close estimate in this view.`,
  },
  geo: {
    headline:
      'Prospecting households outside Arizona in priority fly and short-haul drive feeder DMAs (West and Texas); geo delivery is origin-market weighted, not in-state residents.',
    primaryMarkets: [...ARIZONA_PRIMARY_FEEDER_DMAS],
    driveInMarkets: [...ARIZONA_SECONDARY_FEEDER_DMAS],
  },
  creative: {
    environments: 'Desktop and mobile; standard display and high-impact units.',
    sizes: [...arizonaFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-arizona-creative',
  },
  tracking: {
    description:
      'Creative routes to Visit Arizona campaign landing experiences and partner booking paths as trafficked in the IO.',
    clickthroughUrl: 'https://www.visitarizona.com/?utm_source=vrvo&utm_medium=display&utm_campaign=aot_awareness_2025',
  },
  overviewObjectiveSub: `${Math.round(IMPRESSIONS_BOOKED / 1000)}k book, ended Apr 30; $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend on ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (blended CPM from spend ÷ imps). Nov–Mar match partner monthly actuals; April is an updated flight-close estimate.`,
  monthlyDelivery: [...MONTHLY_SEGMENTS],
  monthlyDeliveryNote:
    'Nov 2025–Mar 2026: partner-reported monthly actuals. Apr 2026: internal flight-close estimate (not from the original extract).',
  audienceActivationMix: [
    { name: 'Search & intent', value: 38 },
    { name: 'Social & online video', value: 28 },
    { name: 'Publisher / PMP', value: 22 },
    { name: 'Contextual / endemic', value: 12 },
  ],
  audiences: arizonaAudienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: MONTHLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-AZTOUR-2025-1144',
      lineItem: 'Visit Arizona — Display awareness',
      dsp: 'Programmatic display (open auction + Arizona travel PMPs)',
      supplyPath: 'SSP stack + state tourism private marketplace',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...ARIZONA_PRIMARY_FEEDER_DMAS],
        [...ARIZONA_SECONDARY_FEEDER_DMAS],
        {
          primary: [...ARIZONA_GEO_PRIMARY_SHARES],
          secondary: [...ARIZONA_GEO_SECONDARY_SHARES],
        },
      ),
      formatDelivery: buildFormatDelivery([...arizonaFormats], DELIVERED_IMP, [...ARIZONA_FORMAT_WEIGHTS]),
      deviceSplit: arizonaDeviceSplit,
    }
  })(),
}
