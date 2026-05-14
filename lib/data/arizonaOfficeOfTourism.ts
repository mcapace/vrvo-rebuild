/**
 * Arizona Office of Tourism — display fixture built from **partner monthly actuals**
 * (Nov 2025–Mar 2026) plus **Apr 2026 projected** row for continuity.
 *
 * Booked / delivered in the app match **399,052 impressions** and **5,012 clicks** (sum of months below).
 * Device mix, format mix, and activation pie are **Arizona-specific** (not shared with other fixtures).
 *
 * | Month    | Impressions | CTR   | Clicks |
 * |----------|------------:|------:|-------:|
 * | Nov 2025 |      28,450 | 1.05% |    299 |
 * | Dec 2025 |      54,120 | 1.14% |    617 |
 * | Jan 2026 |      64,890 | 1.22% |    792 |
 * | Feb 2026 |      72,315 | 1.28% |    926 |
 * | Mar 2026 |      83,477 | 1.31% |  1,094 |
 * | Apr 2026 |      95,800 | 1.34% |  1,284 |  ← projected
 * | **Total**| **399,052** | 1.26% | **5,012** |
 *
 * Open `/reporting?campaign=arizona` (any casing) to view.
 */

import type { AudienceBucket, CampaignReport } from './bigSmokeMiami'
import {
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDailyFromMonthlySegments,
  daysInclusive,
  type DeviceSplitRow,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2025-11-01'
const REPORT_AS_OF = '2026-04-30'

const APRIL_2026 = { impressions: 95_800, clicks: 1_284 }

const MONTHLY_SEGMENTS = [
  { start: '2025-11-01', end: '2025-11-30', impressions: 28_450, clicks: 299 },
  { start: '2025-12-01', end: '2025-12-31', impressions: 54_120, clicks: 617 },
  { start: '2026-01-01', end: '2026-01-31', impressions: 64_890, clicks: 792 },
  { start: '2026-02-01', end: '2026-02-29', impressions: 72_315, clicks: 926 },
  { start: '2026-03-01', end: '2026-03-31', impressions: 83_477, clicks: 1_094 },
  { start: '2026-04-01', end: '2026-04-30', impressions: APRIL_2026.impressions, clicks: APRIL_2026.clicks },
] as const

const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0)
const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100

/** Booked = delivered YTD so KPIs match partner totals (no placeholder IO cap). */
const IMPRESSIONS_BOOKED = DELIVERED_IMP
const PCT_DELIVERED = 100
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

/** Distinct from other fixtures — travel skew, more mobile / video-friendly units. */
const ARIZONA_FORMAT_WEIGHTS = [0.11, 0.14, 0.2, 0.16, 0.14, 0.12, 0.09, 0.04]

const arizonaDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 58.6 },
  { device: 'Desktop', sharePct: 34.2 },
  { device: 'Tablet', sharePct: 7.2 },
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
    summary: `Partner-reported delivery Nov 2025–Mar 2026 plus projected Apr 2026 · ${DELIVERED_IMP.toLocaleString('en-US')} impressions and ${TOTAL_CLICKS.toLocaleString('en-US')} clicks through ${REPORT_AS_OF} (daily grain sums to these totals).`,
  },
  delivery: {
    cpmUsd: 11.5,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `Partner totals: Nov 28,450 imps / 299 clk; Dec 54,120 / 617; Jan 64,890 / 792; Feb 72,315 / 926; Mar 83,477 / 1,094; Apr 95,800 / 1,284 (projected). Blended CTR ${((TOTAL_CLICKS / DELIVERED_IMP) * 100).toFixed(2)}% from ${DELIVERED_IMP.toLocaleString('en-US')} imps and ${TOTAL_CLICKS.toLocaleString('en-US')} clicks.`,
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
    'Statewide and drive-market display — Visit Arizona consideration and trip planning; KPIs match partner monthly rollups in the measurement note.',
  audienceActivationMix: [
    { name: 'Search & intent', value: 38 },
    { name: 'Social & online video', value: 28 },
    { name: 'Publisher / PMP', value: 22 },
    { name: 'Contextual / endemic', value: 12 },
  ],
  audiences: arizonaAudienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: [...MONTHLY_SEGMENTS],
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

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
        DELIVERED_IMP,
        ['Phoenix', 'Tucson', 'Scottsdale / East Valley'],
        ['Flagstaff / Grand Canyon gateway', 'Sedona / Verde Valley', 'Yuma / Lake Havasu', 'Las Vegas spillover'],
      ),
      formatDelivery: buildFormatDelivery([...arizonaFormats], DELIVERED_IMP, [...ARIZONA_FORMAT_WEIGHTS]),
      deviceSplit: arizonaDeviceSplit,
    }
  })(),
}
