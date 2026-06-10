/**
 * Duckhorn × Wine Spectator — display fixture.
 *
 * **Brief:** Apr 15–May 13 flight (program start Apr 15) · creative production **$1,500** · copy below ·
 * click-through https://duckhorn.winespectator.com/
 *
 * **Book:** 200,000 impressions (IO). **Flight ended** 2026-05-13 · **~102.0% delivered** (slight over-delivery).
 * **Net media spend** over the flight: **$1,500** — blended **CPM** = spend ÷ delivered imps
 * (same formula as Arizona: `(TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP`).
 *
 * Monthly delivery (exact imps & clicks — no rescaling):
 *
 * | Month    | Impressions | CTR¹   | Clicks |
 * |----------|--------------:|--------|-------:|
 * | Apr 2026 |       112,597 | 1.03%  |  1,160 |
 * | May 2026 |        91,483 | 1.07%  |    979 |
 * | **Total**|   **204,080** | 1.05%  | **2,139** |
 *
 * ¹ CTR = clicks ÷ impressions for that month. Apr = partial (launch Apr 15); May = partial (close May 13).
 *
 * Open `/reporting?campaign=duckhorn` (also `?campaign=wine-spectator` or `?campaign=duckhorn-ws`).
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

const LAUNCH = '2026-04-15'
const REPORT_AS_OF = '2026-05-13'

/** Client brief — creative production fee (shown in reporting notes). */
const CREATIVE_PRODUCTION_USD = 1500

/** Actualized net media spend over Apr–May flight (drives blended CPM in the dashboard). */
const TOTAL_MEDIA_SPEND_USD = CREATIVE_PRODUCTION_USD

const HEADLINE =
  'Read the Wine Spectator Special Feature: Celebrating 50 Years of Winemaking Heritage'
const CLICKTHROUGH_URL =
  'https://duckhorn.winespectator.com/?utm_source=vrvo&utm_medium=display&utm_campaign=duckhorn_display_2026'

/** Apr 15–30 + May 1–13 — slight over-delivery vs IO book by flight close. */
const MONTHLY_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-04-15', end: '2026-04-30', impressions: 112_597, clicks: 1_160 },
  { start: '2026-05-01', end: '2026-05-13', impressions: 91_483, clicks: 979 },
]

/** IO book — delivered total runs slightly over cap (partner make-good / rounding). */
const IMPRESSIONS_BOOKED = 200_000

const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

/** Blended CPM from spend and delivered imps: (spend / (imps/1000)). */
const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP

const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, REPORT_AS_OF)

const duckhornFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

const DUCKHORN_FORMAT_WEIGHTS = [0.12, 0.14, 0.19, 0.17, 0.15, 0.13, 0.1]

const DUCKHORN_PRIMARY_DMAS = ['San Francisco', 'New York', 'Los Angeles'] as const
const DUCKHORN_SECONDARY_DMAS = ['Seattle', 'Chicago', 'Boston', 'Denver'] as const
const DUCKHORN_GEO_PRIMARY_SHARES = [0.26, 0.24, 0.18] as const
const DUCKHORN_GEO_SECONDARY_SHARES = [0.11, 0.1, 0.07, 0.04] as const

const duckhornDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 59.8 },
  { device: 'Desktop', sharePct: 32.6 },
  { device: 'Tablet', sharePct: 7.6 },
]

const duckhornAudienceBuckets: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Premium wine & collector intent',
    description:
      'Affluent wine enthusiasts reached via endemic Wine Spectator inventory and curated Napa / luxury wine PMPs.',
    cohorts: [
      {
        title: 'Ultra-premium wine collectors',
        detail:
          'Modeled and purchase signals for $50+ bottles, Napa Cabernet, and cellar-building behavior — aligned to Duckhorn heritage positioning.',
      },
      {
        title: 'Wine Spectator endemic readers',
        detail:
          'First-party and contextual alignment on Wine Spectator editorial — ratings-driven buyers and anniversary / special-feature engagement.',
      },
      {
        title: 'Affluent food & wine lifestyle',
        detail:
          'Household income $150k+; fine dining, wine club, and gift-giving occasions — creative routes to the Wine Spectator partner feature.',
      },
    ],
  },
  {
    id: 'context',
    label: 'Brand-safe context & retargeting',
    description: 'Publisher PMPs and compliant retargeting on partner and endemic paths.',
    cohorts: [
      {
        title: 'Premium news & lifestyle PMP',
        detail: 'Curated tier-1 news, food & drink, and luxury lifestyle — daypart weekday 6am–11pm ET.',
      },
      {
        title: 'Partner site retargeting',
        detail:
          'Policy-compliant retargeting of Wine Spectator and Duckhorn partner page visitors during the Apr–May flight.',
      },
    ],
  },
]

export const duckhornWineSpectatorCampaign: CampaignReport = {
  id: 'duckhorn_wine_spectator_display_2026',
  name: 'Duckhorn — Display awareness',
  clientFacingName: 'Duckhorn',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Flight ended ${REPORT_AS_OF} · ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked · ${DELIVERED_IMP.toLocaleString('en-US')} delivered · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend (~${PCT_DELIVERED.toFixed(1)}% of book — slight over-delivery).`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media over Apr 15–May 13 flight; ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book) ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR). Creative production $${CREATIVE_PRODUCTION_USD.toLocaleString('en-US')} per client brief.`,
  },
  geo: {
    headline:
      'National premium wine footprint — Napa-adjacent and coastal DMAs weighted for Wine Spectator endemic and luxury wine buyers.',
    primaryMarkets: [...DUCKHORN_PRIMARY_DMAS],
    driveInMarkets: [...DUCKHORN_SECONDARY_DMAS],
  },
  creative: {
    environments: 'Desktop and mobile; standard display and high-impact units on Wine Spectator and premium PMP inventory.',
    sizes: [...duckhornFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-duckhorn-creative',
  },
  tracking: {
    description: `${HEADLINE} Creative routes to the Wine Spectator partner landing experience as trafficked in the IO.`,
    clickthroughUrl: CLICKTHROUGH_URL,
  },
  overviewObjectiveSub: `${Math.round(IMPRESSIONS_BOOKED / 1000)}k book, ended May 13; $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend on ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book — slight over-delivery; blended CPM from spend ÷ imps). Program start Apr 15.`,
  monthlyDelivery: [...MONTHLY_SEGMENTS],
  monthlyDeliveryNote:
    'Apr–May 2026: flight-close delivery at month boundaries (Apr 15 launch, May 13 close). Delivered volume runs slightly over IO book at flight close.',
  audienceActivationMix: [
    { name: 'Wine Spectator endemic', value: 44 },
    { name: 'Modeled premium wine', value: 26 },
    { name: 'Publisher / PMP', value: 20 },
    { name: 'Retargeting / CRM', value: 10 },
  ],
  audiences: duckhornAudienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: MONTHLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-DUCKHORN-2026-1146',
      lineItem: 'Duckhorn — Display awareness',
      dsp: 'Programmatic display (Wine Spectator endemic + luxury wine PMPs)',
      supplyPath: 'Wine Spectator direct + SSP aggregated premium inventory',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...DUCKHORN_PRIMARY_DMAS],
        [...DUCKHORN_SECONDARY_DMAS],
        {
          primary: [...DUCKHORN_GEO_PRIMARY_SHARES],
          secondary: [...DUCKHORN_GEO_SECONDARY_SHARES],
        },
      ),
      formatDelivery: buildFormatDelivery(
        [...duckhornFormats],
        DELIVERED_IMP,
        [...DUCKHORN_FORMAT_WEIGHTS],
      ),
      deviceSplit: duckhornDeviceSplit,
    }
  })(),
}
