/**
 * Sample campaign: Arizona Office of Tourism — display performance snapshot.
 *
 * Partner-reported monthly delivery (exact imps & clicks):
 *
 * | Month    | Impressions | CTR   | Clicks |
 * |----------|------------:|------:|-------:|
 * | Nov 2025 |      28,450 | 1.05% |    299 |
 * | Dec 2025 |      54,120 | 1.14% |    617 |
 * | Jan 2026 |      64,890 | 1.22% |    792 |
 * | Feb 2026 |      72,315 | 1.28% |    926 |
 * | Mar 2026 |      83,477 | 1.31% |  1,094 |
 * | Apr 2026 |      95,800 | 1.34% |  1,284 |  ← projected (not in original extract)
 * | **Total**| **399,052** | 1.26% | **5,012** |
 *
 * Open `/reporting?campaign=arizona` to view in the app.
 */

import type { AudienceBucket, CampaignReport } from './bigSmokeMiami'
import {
  buildDeviceSplit,
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDailyFromMonthlySegments,
  daysInclusive,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2025-11-01'
/** Last day included in daily grain (April 2026 projection). */
const REPORT_AS_OF = '2026-04-30'

/**
 * April 2026 not in original extract — projected for planning continuity.
 * Impressions ~15% above March; CTR 1.34%; clicks rounded to match.
 */
const APRIL_2026 = { impressions: 95_800, clicks: 1_284 }

const MONTHLY_SEGMENTS = [
  { start: '2025-11-01', end: '2025-11-30', impressions: 28_450, clicks: 299 },
  { start: '2025-12-01', end: '2025-12-31', impressions: 54_120, clicks: 617 },
  { start: '2026-01-01', end: '2026-01-31', impressions: 64_890, clicks: 792 },
  { start: '2026-02-01', end: '2026-02-29', impressions: 72_315, clicks: 926 },
  { start: '2026-03-01', end: '2026-03-31', impressions: 83_477, clicks: 1_094 },
  {
    start: '2026-04-01',
    end: '2026-04-30',
    impressions: APRIL_2026.impressions,
    clicks: APRIL_2026.clicks,
  },
] as const

const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0)
const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100

/** Full-flight book (through summer); daily actuals sum to `DELIVERED_IMP` through Apr 30. */
const IMPRESSIONS_BOOKED = 500_000
const FLIGHT_END_PLAN = '2026-08-31'
const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, FLIGHT_END_PLAN)
/** Precise % so dashboard delivered imps match daily grain (399,052). */
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const arizonaFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

const arizonaAudienceBuckets: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Travel intent & in-market',
    description: 'Modeled and behavioral signals for leisure travel to Arizona.',
    cohorts: [
      {
        title: 'State welcome funnel — warm / hot intent',
        detail:
          'Users actively researching flights, resorts, and outdoor itineraries in-state; aligned to Visit Arizona seasonal pushes.',
      },
      {
        title: 'Regional drive markets',
        detail:
          'Households in CA, NV, UT, CO, TX with road-trip and long-weekend propensity; daypart weekday + weekend leisure.',
      },
      {
        title: 'Outdoor & national-park affinity',
        detail:
          'Hiking, scenic drives, and park pass purchasers — indexes toward northern Arizona and Grand Canyon corridor messaging.',
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
    inMarket: true,
    summary: `In market since Nov 2025 · delivery through ${REPORT_AS_OF} (${DELIVERED_IMP.toLocaleString('en-US')} imps YTD vs ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked through ${FLIGHT_END_PLAN.slice(0, 7)}).`,
  },
  delivery: {
    cpmUsd: 11.5,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote:
      'Click-based display reporting through April 2026; April figures are projected from trend. No attributed bookings in this view.',
  },
  geo: {
    headline: 'Arizona statewide + priority DMAs and drive corridors',
    primaryMarkets: ['Phoenix', 'Tucson', 'Scottsdale / East Valley'],
    driveInMarkets: ['Flagstaff / Grand Canyon gateway', 'Sedona / Verde Valley', 'Yuma / Lake Havasu', 'Las Vegas spillover'],
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
  overviewObjectiveSub:
    'Statewide and drive-market display — Visit Arizona consideration and trip planning against booked flight.',
  audiences: arizonaAudienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: [...MONTHLY_SEGMENTS],
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })
    const deliveredForGeo = Math.round((IMPRESSIONS_BOOKED * PCT_DELIVERED) / 100)

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-AOT-2025-Q4',
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
        deliveredForGeo,
        ['Phoenix', 'Tucson', 'Scottsdale / East Valley'],
        ['Flagstaff / Grand Canyon gateway', 'Sedona / Verde Valley', 'Yuma / Lake Havasu', 'Las Vegas spillover'],
      ),
      formatDelivery: buildFormatDelivery([...arizonaFormats], deliveredForGeo),
      deviceSplit: buildDeviceSplit(),
    }
  })(),
}
