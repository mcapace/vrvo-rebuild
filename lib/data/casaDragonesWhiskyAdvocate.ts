/**
 * Casa Dragones × Whisky Advocate — display fixture.
 *
 * **Brief:** May 4–Jun 4 flight · creative production **$1,916** · headline below ·
 * click-through https://casadragones.whiskyadvocate.com/
 *
 * **Book:** 250,000 impressions (IO cap). **Flight ended** 2026-06-04.
 * **Net media spend** over the flight: **$1,916** — blended **CPM** = spend ÷ delivered imps
 * (same formula as Arizona: `(TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP`).
 *
 * Monthly delivery below is a flight-close estimate (May partial + June partial); update when
 * partner actuals arrive.
 *
 * Open `/reporting?campaign=casa-dragones` (also `?campaign=casa` or `?campaign=dragones`).
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

const LAUNCH = '2026-05-04'
const REPORT_AS_OF = '2026-06-04'

/** Client brief — creative production fee (shown in reporting notes). */
const CREATIVE_PRODUCTION_USD = 1916

/**
 * Net media over the flight (drives blended CPM). Brief lists $1,916 as “Production” —
 * held here as net media until IO reconciles; adjust when actualized spend is confirmed.
 */
const TOTAL_MEDIA_SPEND_USD = CREATIVE_PRODUCTION_USD

const HEADLINE = 'Explore the craft behind Casa Dragones Tequila.'
const CLICKTHROUGH_URL = 'https://casadragones.whiskyadvocate.com/'

/** May 4–31 + Jun 1–4 flight-close estimate (non-round daily grain). */
const MONTHLY_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-05-04', end: '2026-05-31', impressions: 208_650, clicks: 2_191 },
  { start: '2026-06-01', end: '2026-06-04', impressions: 29_807, clicks: 322 },
]

const IMPRESSIONS_BOOKED = 250_000

const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))

/** Blended CPM from spend and delivered imps: (spend / (imps/1000)). */
const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP

const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100

const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, REPORT_AS_OF)

const casaFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

const CASA_FORMAT_WEIGHTS = [0.12, 0.14, 0.19, 0.17, 0.15, 0.13, 0.1]

const CASA_PRIMARY_DMAS = ['New York', 'Los Angeles', 'Miami'] as const
const CASA_SECONDARY_DMAS = ['Dallas–Fort Worth', 'Chicago', 'San Francisco', 'Houston'] as const
const CASA_GEO_PRIMARY_SHARES = [0.24, 0.22, 0.16] as const
const CASA_GEO_SECONDARY_SHARES = [0.12, 0.11, 0.09, 0.06] as const

const casaDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 61.2 },
  { device: 'Desktop', sharePct: 31.4 },
  { device: 'Tablet', sharePct: 7.4 },
]

const casaAudienceBuckets: AudienceBucket[] = [
  {
    id: 'spirits',
    label: 'Luxury spirits & tequila intent',
    description:
      'Premium buyers and in-market tequila enthusiasts reached via endemic Whisky Advocate inventory and curated open auction.',
    cohorts: [
      {
        title: 'Ultra-premium tequila & agave affinity',
        detail:
          'Modeled and purchase signals for $75+ tequila, añejo/extra-añejo, and luxury agave spirits — aligned to Casa Dragones positioning.',
      },
      {
        title: 'Whisky Advocate endemic readers',
        detail:
          'First-party and contextual alignment on Whisky Advocate editorial — spirits collectors and premium brown-spirits buyers with tequila crossover.',
      },
      {
        title: 'Affluent lifestyle & entertaining',
        detail:
          'Household income $150k+; fine dining, home bar, and gift-giving occasions — creative routes to the Whisky Advocate partner experience.',
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
          'Policy-compliant retargeting of Whisky Advocate and Casa Dragones partner page visitors during the May–June flight.',
      },
    ],
  },
]

export const casaDragonesWhiskyAdvocateCampaign: CampaignReport = {
  id: 'casa_dragones_whisky_advocate_2026',
  name: 'Casa Dragones — Whisky Advocate display',
  clientFacingName: 'Casa Dragones × Whisky Advocate',
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
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media over May 4–Jun 4 flight; ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR). Creative production $${CREATIVE_PRODUCTION_USD.toLocaleString('en-US')} per client brief. Monthly rows are flight-close estimates until partner actuals post.`,
  },
  geo: {
    headline:
      'National luxury spirits footprint — priority DMAs for ultra-premium tequila and Whisky Advocate endemic reach.',
    primaryMarkets: [...CASA_PRIMARY_DMAS],
    driveInMarkets: [...CASA_SECONDARY_DMAS],
  },
  creative: {
    environments: 'Desktop and mobile; standard and high-impact display on Whisky Advocate and premium PMP inventory.',
    sizes: [...casaFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-casa-dragones-creative',
  },
  tracking: {
    description: `${HEADLINE} All units route to the Whisky Advocate partner landing experience below.`,
    clickthroughUrl: CLICKTHROUGH_URL,
  },
  overviewObjectiveSub: `${Math.round(IMPRESSIONS_BOOKED / 1000)}k book, ended Jun 4; $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend on ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (blended CPM from spend ÷ imps). Headline: “${HEADLINE}”`,
  monthlyDelivery: [...MONTHLY_SEGMENTS],
  monthlyDeliveryNote:
    'May–Jun 2026: flight-close estimate split at month boundaries (May 4 launch, Jun 4 close). Replace with partner line-item actuals when available.',
  audienceActivationMix: [
    { name: 'Whisky Advocate endemic', value: 42 },
    { name: 'Modeled luxury spirits', value: 28 },
    { name: 'Publisher / PMP', value: 20 },
    { name: 'Retargeting / CRM', value: 10 },
  ],
  audiences: casaAudienceBuckets,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: MONTHLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-CD-WA-2026-Q2',
      lineItem: 'Casa Dragones — Whisky Advocate display',
      dsp: 'Programmatic display (Whisky Advocate endemic + luxury spirits PMPs)',
      supplyPath: 'Whisky Advocate direct + SSP aggregated premium inventory',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }

    return {
      meta,
      daily,
      geoDelivery: buildGeoDelivery(
        DELIVERED_IMP,
        [...CASA_PRIMARY_DMAS],
        [...CASA_SECONDARY_DMAS],
        {
          primary: [...CASA_GEO_PRIMARY_SHARES],
          secondary: [...CASA_GEO_SECONDARY_SHARES],
        },
      ),
      formatDelivery: buildFormatDelivery([...casaFormats], DELIVERED_IMP, [...CASA_FORMAT_WEIGHTS]),
      deviceSplit: casaDeviceSplit,
    }
  })(),
}
