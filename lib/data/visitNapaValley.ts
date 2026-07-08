/**
 * Visit Napa Valley — display awareness fixture.
 *
 * **Flight:** Apr 20–Jun 30, 2026 · **Net media spend:** **$3,900**
 * **Book:** derived at **$11.00** planning CPM.
 *
 * Monthly delivery (Apr partial launch through flight close):
 *
 * | Month    | Impressions | CTR¹   | Clicks |
 * |----------|--------------:|--------|-------:|
 * | Apr 2026 |        79,400 | 1.10%  |    873 |
 * | May 2026 |       144,400 | 1.20%  |  1,733 |
 * | Jun 2026 |       137,126 | 1.25%  |  1,714 |
 * | **Total**|   **360,926** | 1.20%  | **4,320** |
 *
 * ¹ CTR = clicks ÷ impressions for that month. Apr = partial (launch Apr 20).
 *
 * Open `/reporting?campaign=visit-napa` (also `?campaign=napa` or `?campaign=visit-napa-valley`).
 */

import type { AudienceBucket, CampaignReport } from './bigSmokeMiami'
import {
  impressionsFromMediaSpend,
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

const LAUNCH = '2026-04-20'
const FLIGHT_END = '2026-06-30'
const REPORT_AS_OF = FLIGHT_END

const TOTAL_MEDIA_SPEND_USD = 3900
const BOOKED_CPM_USD = 11

const MONTHLY_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-04-20', end: '2026-04-30', impressions: 79_400, clicks: 873 },
  { start: '2026-05-01', end: '2026-05-31', impressions: 144_400, clicks: 1_733 },
  { start: '2026-06-01', end: '2026-06-30', impressions: 137_126, clicks: 1_714 },
]

const IMPRESSIONS_BOOKED = impressionsFromMediaSpend(TOTAL_MEDIA_SPEND_USD, BOOKED_CPM_USD)

const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP
const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, FLIGHT_END)

const napaFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

const NAPA_FORMAT_WEIGHTS = [0.11, 0.14, 0.2, 0.16, 0.14, 0.12, 0.13]

const NAPA_PRIMARY_FEEDER_DMAS = ['San Francisco', 'Los Angeles', 'Sacramento'] as const
const NAPA_SECONDARY_FEEDER_DMAS = ['Seattle', 'Portland', 'Las Vegas', 'San Diego'] as const
const NAPA_GEO_PRIMARY_SHARES = [0.28, 0.24, 0.14] as const
const NAPA_GEO_SECONDARY_SHARES = [0.11, 0.09, 0.08, 0.06] as const

const napaDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 59.4 },
  { device: 'Desktop', sharePct: 33.8 },
  { device: 'Tablet', sharePct: 6.8 },
]

const napaAudienceBuckets: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Wine country & leisure travel intent',
    description:
      'Households in Bay Area, SoCal, and Pacific Northwest feeder markets researching Napa Valley getaways, tastings, and overnight stays.',
    cohorts: [
      {
        title: 'Napa & wine country destination intent',
        detail:
          'Modeled and search-intent signals for Napa Valley trips, winery reservations, and tasting-room visits from origin markets within drive and short-haul fly rings.',
      },
      {
        title: 'Luxury weekend & culinary travel',
        detail:
          'Affluent leisure travelers indexing on fine dining, boutique hotels, and spa weekends — aligned to Visit Napa Valley spring and early-summer pushes.',
      },
      {
        title: 'Regional drive & short-haul fly feeders',
        detail:
          'Bay Area, Sacramento, LA, Seattle, and Portland households within practical weekend-drive or short-flight distance to Napa Valley.',
      },
    ],
  },
  {
    id: 'context',
    label: 'Premium travel context',
    description: 'Brand-safe travel, lifestyle, and wine-adjacent environments.',
    cohorts: [
      {
        title: 'Travel & wine lifestyle publishers',
        detail: 'Curated open auction and PMP on tier-1 travel, food & wine, and news — spring and summer getaway adjacency.',
      },
      {
        title: 'Conquest: competing wine & leisure destinations',
        detail:
          'Light conquest against Sonoma, Paso Robles, and coastal leisure DMAs where incremental reach is modeled without bid inflation.',
      },
    ],
  },
]

export const visitNapaValleyCampaign: CampaignReport = {
  id: 'visit_napa_valley_display_2026',
  name: 'Visit Napa Valley — Display awareness',
  clientFacingName: 'Visit Napa Valley',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Flight ended ${REPORT_AS_OF} · ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked · ${DELIVERED_IMP.toLocaleString('en-US')} delivered · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend (~${PCT_DELIVERED.toFixed(1)}% of book).`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media over Apr 20–Jun 30 flight; ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR). Monthly grain is flight-close reporting for this view.`,
  },
  geo: {
    headline:
      'Prospecting households in Napa Valley feeder markets — Bay Area, Northern California drive rings, SoCal, and Pacific Northwest short-haul fly markets.',
    primaryMarkets: [...NAPA_PRIMARY_FEEDER_DMAS],
    driveInMarkets: [...NAPA_SECONDARY_FEEDER_DMAS],
  },
  creative: {
    environments: 'Desktop and mobile; standard display and high-impact units.',
    sizes: [...napaFormats],
    assetsFolderUrl: 'https://www.visitnapavalley.com/',
  },
  tracking: {
    description:
      'Creative routes to Visit Napa Valley campaign landing experiences and partner booking paths as trafficked in the IO.',
    clickthroughUrl:
      'https://www.visitnapavalley.com/?utm_source=vrvo&utm_medium=display&utm_campaign=vnv_awareness_2026',
  },
  overviewObjectiveSub: `${Math.round(IMPRESSIONS_BOOKED / 1000)}k book, ended Jun 30; $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend on ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book; blended CPM from spend ÷ imps). Apr 20 launch through Jun 30 flight close.`,
  monthlyDelivery: [...MONTHLY_SEGMENTS],
  monthlyDeliveryNote:
    'Apr 2026: partial month from Apr 20 launch. May–Jun 2026: full-month flight-close delivery in this view.',
  audienceActivationMix: [
    { name: 'Search & intent', value: 36 },
    { name: 'Social & online video', value: 26 },
    { name: 'Publisher / PMP', value: 24 },
    { name: 'Contextual / endemic', value: 14 },
  ],
  audiences: napaAudienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: MONTHLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-VNV-2026-0418',
      lineItem: 'Visit Napa Valley — Display awareness (Apr 20–Jun 30, 2026)',
      dsp: 'Programmatic display (open auction + wine & travel PMPs)',
      supplyPath: 'SSP stack + Napa Valley / wine country private marketplace',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...NAPA_PRIMARY_FEEDER_DMAS],
        [...NAPA_SECONDARY_FEEDER_DMAS],
        {
          primary: [...NAPA_GEO_PRIMARY_SHARES],
          secondary: [...NAPA_GEO_SECONDARY_SHARES],
        },
      ),
      formatDelivery: buildFormatDelivery([...napaFormats], DELIVERED_IMP, [...NAPA_FORMAT_WEIGHTS]),
      deviceSplit: napaDeviceSplit,
    }
  })(),
}
