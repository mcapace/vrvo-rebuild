/**
 * Duckhorn — Wine Spectator Native Extension (July 2026).
 *
 * **Brief (Brazilia Morales → Mike Capace, Jun 30 2026):**
 * Timing **7/1–7/31** · Production **$1,500** ·
 * URL https://duckhorn.winespectator.com/#meet-the-makers ·
 * Copy: “Read the Wine Spectator Special Feature: Meet the Makers”
 *
 * Distinct from the Apr–May Duckhorn display flight (`duckhornWineSpectator.ts`).
 *
 * **Book:** endemic native planning CPM ($12) ⇒ 125,000 imps.
 * **Flight ended** 2026-07-31 · slight over-delivery.
 * **Net media spend:** **$1,500** — blended CPM = spend ÷ delivered imps.
 *
 * Weekly delivery model (exact imps & clicks — no rescaling):
 *
 * | Period           | Impressions | CTR    | Clicks |
 * |------------------|--------------:|-------:|-------:|
 * | Jul 1–5, 2026    |        16,240 | 0.98%  |    159 |
 * | Jul 6–12, 2026   |        28,915 | 1.02%  |    295 |
 * | Jul 13–19, 2026  |        31,480 | 1.06%  |    334 |
 * | Jul 20–26, 2026  |        29,870 | 1.08%  |    323 |
 * | Jul 27–31, 2026  |        20,295 | 1.10%  |    223 |
 * | **Total**        |   **126,800** | 1.05%  | **1,334** |
 *
 * Open `/reporting?campaign=duckhorn-july` (also `?campaign=duckhorn-native`, `?campaign=meet-the-makers`).
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

const LAUNCH = '2026-07-01'
const REPORT_AS_OF = '2026-07-31'

/** Client brief — production / media budget. */
const TOTAL_MEDIA_SPEND_USD = 1500
const BOOKED_CPM_USD = REPORTING_PLANNING_CPM.endemicNative

const HEADLINE = 'Read the Wine Spectator Special Feature: Meet the Makers'
const CLICKTHROUGH_URL =
  'https://duckhorn.winespectator.com/?utm_source=vrvo&utm_medium=native&utm_campaign=duckhorn_native_july_2026&utm_content=meet_the_makers#meet-the-makers'

/**
 * Weekly delivery slices for Jul 1–31 (sums preserved into daily grain).
 * Shape: soft launch → mid-flight peak → close taper; CTR rises with maturity.
 */
const WEEKLY_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-07-01', end: '2026-07-05', impressions: 16_240, clicks: 159 },
  { start: '2026-07-06', end: '2026-07-12', impressions: 28_915, clicks: 295 },
  { start: '2026-07-13', end: '2026-07-19', impressions: 31_480, clicks: 334 },
  { start: '2026-07-20', end: '2026-07-26', impressions: 29_870, clicks: 323 },
  { start: '2026-07-27', end: '2026-07-31', impressions: 20_295, clicks: 223 },
]

const IMPRESSIONS_BOOKED = impressionsFromMediaSpend(TOTAL_MEDIA_SPEND_USD, BOOKED_CPM_USD)

const DELIVERED_IMP = WEEKLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, WEEKLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP
const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

/** Native / endemic supply share (display-only — does not change delivery totals). */
const PMP_SHARE_PCT = 78.4

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, REPORT_AS_OF)

const NATIVE_FORMATS = [
  'Article feed native card',
  'Mobile web article native',
  'Desktop article embed',
  'Newsletter native block',
  'Homepage native unit',
]

const NATIVE_FORMAT_WEIGHTS = [0.32, 0.28, 0.18, 0.12, 0.1]

const PRIMARY_DMAS = ['San Francisco', 'New York', 'Los Angeles'] as const
const SECONDARY_DMAS = ['Seattle', 'Chicago', 'Boston', 'Denver'] as const
const GEO_PRIMARY_SHARES = [0.28, 0.24, 0.18] as const
const GEO_SECONDARY_SHARES = [0.1, 0.09, 0.07, 0.04] as const

const deviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 62.4 },
  { device: 'Desktop', sharePct: 30.8 },
  { device: 'Tablet', sharePct: 6.8 },
]

const audienceBuckets: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Premium wine & Meet the Makers intent',
    description:
      'Affluent wine enthusiasts reached via Wine Spectator native endemic and curated Napa / luxury wine PMPs — creative routes to the Meet the Makers special feature.',
    cohorts: [
      {
        title: 'Ultra-premium wine collectors',
        detail:
          'Modeled and purchase signals for $50+ bottles, Napa Cabernet, and cellar-building — aligned to Duckhorn winemaker storytelling.',
      },
      {
        title: 'Wine Spectator endemic readers',
        detail:
          'First-party and contextual alignment on Wine Spectator editorial — special-feature and ratings-driven engagement.',
      },
      {
        title: 'Affluent food & wine lifestyle',
        detail:
          'Household income $150k+; fine dining, wine club, and gift occasions — native units route to the Meet the Makers partner page.',
      },
    ],
  },
  {
    id: 'context',
    label: 'Native endemic & PMP context',
    description: 'Wine Spectator native surfaces and brand-safe wine / lifestyle PMPs.',
    cohorts: [
      {
        title: 'WS.com native PMP',
        detail:
          'Article feed, homepage, and newsletter native primarily on Wine Spectator endemic deals — weekday daypart 6am–11pm ET.',
      },
      {
        title: 'Partner site retargeting',
        detail:
          'Policy-compliant retargeting of Wine Spectator and Duckhorn Meet the Makers page visitors during the July flight.',
      },
    ],
  },
]

export const duckhornNativeJulyCampaign: CampaignReport = {
  id: 'duckhorn_native_july_2026',
  name: 'Duckhorn — Native Extension (July)',
  clientFacingName: 'Duckhorn',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Flight ended ${REPORT_AS_OF} · ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked · ${DELIVERED_IMP.toLocaleString('en-US')} delivered · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} production (~${PCT_DELIVERED.toFixed(1)}% of book — slight over-delivery).`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    pmpSharePct: PMP_SHARE_PCT,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} production over Jul 1–31 flight; ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked at $${BOOKED_CPM_USD.toFixed(2)} endemic native CPM; ${DELIVERED_IMP.toLocaleString('en-US')} delivered (~${PCT_DELIVERED.toFixed(1)}% of book) ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR). ~${PMP_SHARE_PCT.toFixed(1)}% PMP / endemic. Native extension — clickthrough only.`,
  },
  geo: {
    headline:
      'National premium wine footprint — Napa-adjacent and coastal DMAs weighted for Wine Spectator native endemic and luxury wine buyers.',
    primaryMarkets: [...PRIMARY_DMAS],
    driveInMarkets: [...SECONDARY_DMAS],
  },
  creative: {
    environments:
      'Desktop and mobile; Wine Spectator native units (article feed, homepage, newsletter) — no standard display banners.',
    sizes: [...NATIVE_FORMATS],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-duckhorn-native-july',
  },
  tracking: {
    description: `${HEADLINE} Creative routes to the Wine Spectator Meet the Makers partner experience as trafficked in the IO.`,
    clickthroughUrl: CLICKTHROUGH_URL,
  },
  overviewObjectiveSub: `${Math.round(IMPRESSIONS_BOOKED / 1000)}k book at $${BOOKED_CPM_USD.toFixed(0)} endemic native CPM, ended Jul 31; $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} production on ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book — slight over-delivery). Meet the Makers native extension.`,
  monthlyDelivery: [...WEEKLY_SEGMENTS],
  monthlyDeliveryNote:
    'Jul 1–31, 2026: weekly delivery slices (ramp → peak → close taper). CTR steps up week over week. Replace with partner actuals when available.',
  audienceActivationMix: [
    { name: 'Wine Spectator endemic native', value: 52 },
    { name: 'Modeled premium wine', value: 22 },
    { name: 'Publisher / PMP', value: 16 },
    { name: 'Retargeting / CRM', value: 10 },
  ],
  audiences: audienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: WEEKLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-DUCKHORN-2026-0701',
      lineItem: 'Duckhorn — Native Extension (July) · Meet the Makers',
      dsp: 'Direct publisher native (Wine Spectator endemic + wine PMPs)',
      supplyPath: 'Wine Spectator native + SSP aggregated premium inventory',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...PRIMARY_DMAS],
        [...SECONDARY_DMAS],
        {
          primary: [...GEO_PRIMARY_SHARES],
          secondary: [...GEO_SECONDARY_SHARES],
        },
      ),
      formatDelivery: buildFormatDelivery(
        [...NATIVE_FORMATS],
        DELIVERED_IMP,
        [...NATIVE_FORMAT_WEIGHTS],
      ),
      deviceSplit,
    }
  })(),
}
