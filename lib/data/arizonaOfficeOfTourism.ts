/**
 * Arizona Office of Tourism — display fixture.
 *
 * **Book:** 180,000 impressions. **Flight ended** 2026-04-30.
 * **Net media spend** over the flight dates: **$4,500** — blended **CPM** is derived from
 * spend ÷ delivered imps (no separate placeholder rate).
 *
 * **Delivered impressions** use the Nov–Apr partner **shape**, scaled to a **non-round** total
 * (not a tidy “000s” number); daily grain sums to that total.
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

/** Partner-reported shape (Nov–Apr); magnitudes used only as ratios for scaling. */
const PARTNER_REF = [
  { start: '2025-11-01', end: '2025-11-30', imp: 28_450, clk: 299 },
  { start: '2025-12-01', end: '2025-12-31', imp: 54_120, clk: 617 },
  { start: '2026-01-01', end: '2026-01-31', imp: 64_890, clk: 792 },
  { start: '2026-02-01', end: '2026-02-29', imp: 72_315, clk: 926 },
  { start: '2026-03-01', end: '2026-03-31', imp: 83_477, clk: 1_094 },
  { start: '2026-04-01', end: '2026-04-30', imp: 95_800, clk: 1_284 },
] as const

const REF_IMP_SUM = PARTNER_REF.reduce((a, s) => a + s.imp, 0)
const REF_CLK_SUM = PARTNER_REF.reduce((a, s) => a + s.clk, 0)

/** IO book — user cap. */
const IMPRESSIONS_BOOKED = 180_000

/**
 * Delivered impressions after scaling the partner curve (~1.6% over book).
 * Intentionally not a round thousands figure — months sum exactly here.
 */
const DELIVERED_IMP = 182_847

/** Actualized net media spend over Nov–Apr flight (drives blended CPM in the dashboard). */
const TOTAL_MEDIA_SPEND_USD = 4500

/** Blended CPM from spend and delivered imps: (spend / (imps/1000))). */
const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP

const TOTAL_CLICKS = Math.max(1, Math.round((DELIVERED_IMP * REF_CLK_SUM) / REF_IMP_SUM))
const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, REPORT_AS_OF)

function scaleMonthlyToTargets(
  targetImp: number,
  targetClk: number,
): MonthlyDeliverySegment[] {
  const imps = PARTNER_REF.map((x) => Math.round((x.imp * targetImp) / REF_IMP_SUM))
  let impDrift = targetImp - imps.reduce((a, b) => a + b, 0)
  imps[imps.length - 1] += impDrift

  const clks = PARTNER_REF.map((x, i) => {
    if (x.imp <= 0) return 0
    return Math.max(0, Math.round((x.clk * imps[i]) / x.imp))
  })
  let clkDrift = targetClk - clks.reduce((a, b) => a + b, 0)
  let ix = clks.length - 1
  while (clkDrift !== 0 && ix >= 0) {
    const adj = clkDrift > 0 ? 1 : -1
    if (clks[ix] + adj >= 0) {
      clks[ix] += adj
      clkDrift -= adj
    }
    ix -= 1
  }

  return PARTNER_REF.map((x, i) => ({
    start: x.start,
    end: x.end,
    impressions: imps[i],
    clicks: clks[i],
  }))
}

const MONTHLY_SEGMENTS = scaleMonthlyToTargets(DELIVERED_IMP, TOTAL_CLICKS)

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
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media over Nov–Apr flight; ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${((TOTAL_CLICKS / DELIVERED_IMP) * 100).toFixed(2)}% CTR). Monthly mix scaled from the earlier partner extract.`,
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
  overviewObjectiveSub:
    '180k book, ended Apr 30; $4,500 net spend on delivered imps (blended CPM from spend ÷ imps). Delivered total is scaled from partner monthly shape, not a round placeholder.',
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
