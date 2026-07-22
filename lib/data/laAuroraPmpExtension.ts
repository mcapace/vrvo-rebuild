/**
 * La Aurora — PMP Extension display fixture.
 *
 * **Brief (Brazilia Morales → Mike Capace, May 4 2026):**
 * Timing ASAP–5/31 · Production **$3,400** · click-through https://www.laaurora.com/
 * Work order / IO ref **WS36031**.
 *
 * **Book:** 450,000 impressions (IO). **Flight ended** 2026-05-31 · slight over-delivery.
 * **Net media spend** over the flight: **$3,400** — blended **CPM** = spend ÷ delivered imps.
 *
 * Weekly delivery model (exact imps & clicks — no rescaling). Ramp → peak mid-flight → close taper;
 * CTR steps up slightly week over week (same pattern as Arizona / Duckhorn grain):
 *
 * | Period           | Impressions | CTR    | Clicks |
 * |------------------|--------------:|-------:|-------:|
 * | May 5–11, 2026   |        81,507 | 0.98%  |    799 |
 * | May 12–18, 2026  |       126,789 | 1.03%  |  1,306 |
 * | May 19–25, 2026  |       135,845 | 1.07%  |  1,454 |
 * | May 26–31, 2026  |       108,676 | 1.10%  |  1,196 |
 * | **Total**        |   **452,817** | 1.05%  | **4,755** |
 *
 * Swap WEEKLY_SEGMENTS when final WS36031 partner actuals land.
 *
 * Open `/reporting?campaign=la-aurora` (also `?campaign=aurora` or `?campaign=ws36031`).
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

/** Day after brief “ASAP” ask (May 4) through client end date 5/31. */
const LAUNCH = '2026-05-05'
const REPORT_AS_OF = '2026-05-31'

/** Client brief — production / media budget (drives blended CPM). */
const TOTAL_MEDIA_SPEND_USD = 3400

const CLICKTHROUGH_URL =
  'https://www.laaurora.com/?utm_source=vrvo&utm_medium=display&utm_campaign=la_aurora_pmp_2026'

/**
 * Weekly delivery slices for May 5–31 (sums preserved into daily grain).
 * Shape: soft launch → mid-flight peak → close taper; CTR rises with maturity.
 */
const WEEKLY_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-05-05', end: '2026-05-11', impressions: 81_507, clicks: 799 },
  { start: '2026-05-12', end: '2026-05-18', impressions: 126_789, clicks: 1_306 },
  { start: '2026-05-19', end: '2026-05-25', impressions: 135_845, clicks: 1_454 },
  { start: '2026-05-26', end: '2026-05-31', impressions: 108_676, clicks: 1_196 },
]

/** IO book — delivered total runs slightly over cap at flight close. */
const IMPRESSIONS_BOOKED = 450_000

const DELIVERED_IMP = WEEKLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, WEEKLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

/** Blended CPM from spend and delivered imps: (spend / (imps/1000)). */
const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP

const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, REPORT_AS_OF)

const laAuroraFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

const LA_AURORA_FORMAT_WEIGHTS = [0.11, 0.15, 0.2, 0.18, 0.14, 0.12, 0.1]

const LA_AURORA_PRIMARY_DMAS = ['New York', 'Miami', 'Los Angeles'] as const
const LA_AURORA_SECONDARY_DMAS = ['Chicago', 'Dallas–Fort Worth', 'Houston', 'Atlanta'] as const
const LA_AURORA_GEO_PRIMARY_SHARES = [0.26, 0.2, 0.16] as const
const LA_AURORA_GEO_SECONDARY_SHARES = [0.12, 0.1, 0.09, 0.07] as const

const laAuroraDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 59.4 },
  { device: 'Desktop', sharePct: 33.1 },
  { device: 'Tablet', sharePct: 7.5 },
]

const laAuroraAudienceBuckets: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Cigar enthusiast & premium tobacco',
    description:
      'Modeled and purchase signals for premium Dominican / handmade cigar buyers reached via PMP and endemic inventory.',
    cohorts: [
      {
        title: 'Handmade & premium cigar affinity',
        detail:
          'Weekly/occasional premium cigar use; Dominican and Nicaraguan origin interest — aligned to La Aurora brand positioning.',
      },
      {
        title: 'Cigar Aficionado endemic readers',
        detail:
          'First-party and contextual alignment on Cigar Aficionado editorial — collectors and lounge-leaning buyers.',
      },
      {
        title: 'Luxury lifestyle & entertaining',
        detail:
          'Household income $125k+; fine dining, home bar, and gift occasions — creative routes to laaurora.com.',
      },
    ],
  },
  {
    id: 'context',
    label: 'PMP & premium context',
    description: 'Publisher PMPs and brand-safe open auction adjacent to cigar / luxury lifestyle.',
    cohorts: [
      {
        title: 'Cigar & spirits PMP',
        detail:
          'Private marketplace on endemic cigar, spirits, and luxury lifestyle — weekday daypart 6am–11pm ET.',
      },
      {
        title: 'Site / CRM retargeting',
        detail:
          'Policy-compliant retargeting of La Aurora and endemic site visitors during the May flight.',
      },
    ],
  },
]

export const laAuroraPmpExtensionCampaign: CampaignReport = {
  id: 'la_aurora_pmp_extension_2026',
  name: 'La Aurora — PMP Extension',
  clientFacingName: 'La Aurora',
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
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} production / media budget over May 5–31 flight; ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book) ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR). Work order WS36031 — weekly delivery model pending partner line-item actuals.`,
  },
  geo: {
    headline:
      'National premium cigar footprint — priority DMAs for handmade / Dominican origin buyers and Cigar Aficionado endemic reach.',
    primaryMarkets: [...LA_AURORA_PRIMARY_DMAS],
    driveInMarkets: [...LA_AURORA_SECONDARY_DMAS],
  },
  creative: {
    environments:
      'Desktop and mobile; standard display and high-impact units on Cigar Aficionado endemic and premium PMPs.',
    sizes: [...laAuroraFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-la-aurora-creative',
  },
  tracking: {
    description:
      'Creative routes to the La Aurora brand site as trafficked in the IO (WS36031).',
    clickthroughUrl: CLICKTHROUGH_URL,
  },
  overviewObjectiveSub: `${Math.round(IMPRESSIONS_BOOKED / 1000)}k book, ended May 31; $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} spend on ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book — slight over-delivery; blended CPM from spend ÷ imps). Weekly delivery model drives pacing / CTR curves.`,
  monthlyDelivery: [...WEEKLY_SEGMENTS],
  monthlyDeliveryNote:
    'May 5–31, 2026: weekly delivery slices (ramp → peak → close taper). CTR steps up week over week. Replace with partner WS36031 actuals when available.',
  audienceActivationMix: [
    { name: 'Cigar Aficionado endemic', value: 44 },
    { name: 'Modeled cigar intent', value: 26 },
    { name: 'Publisher / PMP', value: 20 },
    { name: 'Retargeting / CRM', value: 10 },
  ],
  audiences: laAuroraAudienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: WEEKLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-LAURORA-2026-36031',
      lineItem: 'La Aurora — PMP Extension',
      dsp: 'Programmatic display (Cigar Aficionado endemic + premium cigar PMPs)',
      supplyPath: 'Cigar Aficionado direct + SSP aggregated premium inventory',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...LA_AURORA_PRIMARY_DMAS],
        [...LA_AURORA_SECONDARY_DMAS],
        {
          primary: [...LA_AURORA_GEO_PRIMARY_SHARES],
          secondary: [...LA_AURORA_GEO_SECONDARY_SHARES],
        },
      ),
      formatDelivery: buildFormatDelivery(
        [...laAuroraFormats],
        DELIVERED_IMP,
        [...LA_AURORA_FORMAT_WEIGHTS],
      ),
      deviceSplit: laAuroraDeviceSplit,
    }
  })(),
}
