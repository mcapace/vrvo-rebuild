/**
 * Visit Napa Valley — Wine Spectator native + pre-roll (Live A Little / FY26).
 *
 * **Original combined flight totals (unchanged):**
 * Apr 20–Jun 30, 2026 · net media **$3,888** · book at **$11.00** planning CPM ·
 * **359,817** delivered imps · **4,307** clicks (~1.20% blended CTR).
 *
 * Creative tabs split the **same** combined totals into Native vs Pre-roll
 * (imps/clicks/spend sum to the original report). PMP share and VCR are
 * display-only quality/supply signals and do not change delivery totals.
 *
 * Tourism Economic pixels (append alongside 1×1 trackers):
 * - Video: …ut2=Video&ut3=WineSpectator
 * - Native: …ut2=Native&ut3=WineSpectator
 *
 * Open `/reporting?campaign=visit-napa` (also `?campaign=napa`, `?campaign=vnv`).
 */

import type {
  AudienceBucket,
  CampaignCreativeLine,
  CampaignReport,
  CampaignTradeDesk,
} from './bigSmokeMiami'
import { impressionsFromMediaSpend } from './reportingCpmDefaults'
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
const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, FLIGHT_END)

/** Original combined production / media budget — do not change. */
const TOTAL_MEDIA_SPEND_USD = 3888
const BOOKED_CPM_USD = 11
const IMPRESSIONS_BOOKED = impressionsFromMediaSpend(TOTAL_MEDIA_SPEND_USD, BOOKED_CPM_USD)

const NATIVE_PIXEL =
  'https://pixel.zprk.io/v5/pixel/7LcKck0SZY.gif?ssid=1&ut1=VNVFY26LiveALittle&ut2=Native&ut3=WineSpectator'
const VIDEO_PIXEL =
  'https://pixel.zprk.io/v5/pixel/7LcKck0SZY.gif?ssid=1&ut1=VNVFY26LiveALittle&ut2=Video&ut3=WineSpectator'

const NATIVE_CLICKTHROUGH =
  'https://www.visitnapavalley.com/?utm_source=vrvo&utm_medium=native&utm_campaign=vnv_fy26_live_a_little&utm_content=ws_native'
const PREROLL_CLICKTHROUGH =
  'https://www.visitnapavalley.com/?utm_source=vrvo&utm_medium=video&utm_campaign=vnv_fy26_live_a_little&utm_content=ws_preroll'

/**
 * Combined monthly grain from the original report (exact).
 * Native / pre-roll slices below partition these totals.
 */
const COMBINED_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-04-20', end: '2026-04-30', impressions: 79_151, clicks: 870 },
  { start: '2026-05-01', end: '2026-05-31', impressions: 143_955, clicks: 1_728 },
  { start: '2026-06-01', end: '2026-06-30', impressions: 136_711, clicks: 1_709 },
]

/**
 * Native ~55% of imps (higher CTR). Pre-roll remainder (lower CTR, VCR-led).
 * Month imps and clicks sum exactly to COMBINED_SEGMENTS.
 */
const NATIVE_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-04-20', end: '2026-04-30', impressions: 43_533, clicks: 675 },
  { start: '2026-05-01', end: '2026-05-31', impressions: 79_175, clicks: 1_227 },
  { start: '2026-06-01', end: '2026-06-30', impressions: 75_191, clicks: 1_165 },
]

const PREROLL_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-04-20', end: '2026-04-30', impressions: 35_618, clicks: 195 },
  { start: '2026-05-01', end: '2026-05-31', impressions: 64_780, clicks: 501 },
  { start: '2026-06-01', end: '2026-06-30', impressions: 61_520, clicks: 544 },
]

const NATIVE_DELIVERED = NATIVE_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const PREROLL_DELIVERED = PREROLL_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const DELIVERED_IMP = COMBINED_SEGMENTS.reduce((a, s) => a + s.impressions, 0)

const NATIVE_CLICKS = NATIVE_SEGMENTS.reduce((a, s) => a + s.clicks, 0)
const PREROLL_CLICKS = PREROLL_SEGMENTS.reduce((a, s) => a + s.clicks, 0)
const TOTAL_CLICKS = COMBINED_SEGMENTS.reduce((a, s) => a + s.clicks, 0)

/** Spend split tracks volume mix; totals $3,888. */
const NATIVE_SPEND_USD = 2138
const PREROLL_SPEND_USD = TOTAL_MEDIA_SPEND_USD - NATIVE_SPEND_USD

const NATIVE_BOOKED = Math.round(IMPRESSIONS_BOOKED * (NATIVE_DELIVERED / DELIVERED_IMP))
const PREROLL_BOOKED = IMPRESSIONS_BOOKED - NATIVE_BOOKED

const NATIVE_CPM = (NATIVE_SPEND_USD * 1000) / NATIVE_DELIVERED
const PREROLL_CPM = (PREROLL_SPEND_USD * 1000) / PREROLL_DELIVERED
const BLENDED_CPM = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP

const NATIVE_CTR = (NATIVE_CLICKS / NATIVE_DELIVERED) * 100
const PREROLL_CTR = (PREROLL_CLICKS / PREROLL_DELIVERED) * 100
const BLENDED_CTR = (TOTAL_CLICKS / DELIVERED_IMP) * 100

/** Display-only — do not feed booked / delivered / clicks / spend. */
const NATIVE_PMP_SHARE_PCT = 74.6
const PREROLL_PMP_SHARE_PCT = 81.2
const PREROLL_VCR_PCT = 78.4
const COMBINED_PMP_SHARE_PCT =
  (NATIVE_PMP_SHARE_PCT * NATIVE_DELIVERED + PREROLL_PMP_SHARE_PCT * PREROLL_DELIVERED) /
  DELIVERED_IMP

const VNV_PRIMARY_DMAS = ['San Francisco', 'Los Angeles', 'Sacramento'] as const
const VNV_SECONDARY_DMAS = ['Seattle', 'Portland', 'Las Vegas', 'San Diego'] as const
const VNV_GEO_PRIMARY = [0.28, 0.24, 0.14] as const
const VNV_GEO_SECONDARY = [0.11, 0.09, 0.08, 0.06] as const

const nativeDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 62.8 },
  { device: 'Desktop', sharePct: 30.4 },
  { device: 'Tablet', sharePct: 6.8 },
]

const prerollDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 48.2 },
  { device: 'Desktop', sharePct: 41.6 },
  { device: 'CTV / OTT', sharePct: 7.1 },
  { device: 'Tablet', sharePct: 3.1 },
]

const combinedDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 59.4 },
  { device: 'Desktop', sharePct: 33.8 },
  { device: 'Tablet', sharePct: 6.8 },
]

const nativeFormats = [
  'Native in-feed (1:1)',
  'Native in-feed (1.91:1)',
  'Native content recommendation',
  '300×250 companion',
]

const prerollFormats = [
  '15s pre-roll',
  '30s pre-roll',
  'Pre-roll companion 300×250',
  'In-stream mid-roll (make-good)',
]

const NATIVE_FORMAT_WEIGHTS = [0.38, 0.32, 0.18, 0.12]
const PREROLL_FORMAT_WEIGHTS = [0.42, 0.36, 0.16, 0.06]

const combinedFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]
const COMBINED_FORMAT_WEIGHTS = [0.11, 0.14, 0.2, 0.16, 0.14, 0.12, 0.13]

const vnvAudienceBuckets: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Wine travel & Napa intent',
    description:
      'Out-of-market leisure travelers researching Napa / wine-country trips — Wine Spectator endemic + modeled travel intent.',
    cohorts: [
      {
        title: 'Wine country trip planners',
        detail:
          'Households outside Napa researching tasting rooms, lodging, and fly/drive weekends — “Live a Little” seasonal push.',
      },
      {
        title: 'Wine Spectator endemic readers',
        detail:
          'First-party and contextual on Wine Spectator — cellar collectors and wine-travel adjacency for native + pre-roll.',
      },
      {
        title: 'Affluent West Coast & feeder DMAs',
        detail:
          'SF Bay, LA, Sacramento, Seattle, Portland — short-haul and weekend-drive propensity into Napa Valley.',
      },
    ],
  },
  {
    id: 'context',
    label: 'Native + video PMP supply',
    description:
      'Wine Spectator endemic deals and curated travel / wine PMPs carry the majority of delivery; open auction is brand-safe fill only.',
    cohorts: [
      {
        title: 'Native content extension (PMP-led)',
        detail:
          'In-feed and recommendation units primarily on Wine Spectator native PMPs and curated lifestyle / travel private marketplaces.',
      },
      {
        title: 'Pre-roll / in-stream video (PMP + VCR)',
        detail:
          '15s/30s pre-roll on endemic and premium video PMPs — track VCR (completion) alongside click CTR; Tourism Economic video pixel with 1×1 trackers.',
      },
    ],
  },
]

function buildLineTradeDesk(params: {
  lineItem: string
  segments: MonthlyDeliverySegment[]
  impressionsBooked: number
  deliveredImp: number
  formats: string[]
  formatWeights: number[]
  deviceSplit: DeviceSplitRow[]
  dsp: string
}): CampaignTradeDesk {
  const daily = buildTradeDeskDailyFromMonthlySegments({
    segments: params.segments,
    impressionsBooked: params.impressionsBooked,
    flightPlannedDays: FLIGHT_PLANNED_DAYS,
  })

  const meta: TradeDeskMeta = {
    reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
    ioNumber: 'VRVO-IO-VNV-2026-0630',
    lineItem: params.lineItem,
    dsp: params.dsp,
    supplyPath: 'Wine Spectator endemic + curated travel / wine PMPs',
    flightPlannedDays: FLIGHT_PLANNED_DAYS,
    lastDataDate: REPORT_AS_OF,
    currency: 'USD',
  }

  return {
    meta,
    daily,
    geoDelivery: buildGeoDelivery(
      params.deliveredImp,
      [...VNV_PRIMARY_DMAS],
      [...VNV_SECONDARY_DMAS],
      {
        primary: [...VNV_GEO_PRIMARY],
        secondary: [...VNV_GEO_SECONDARY],
      },
    ),
    formatDelivery: buildFormatDelivery(params.formats, params.deliveredImp, params.formatWeights),
    deviceSplit: params.deviceSplit,
  }
}

const nativeLine: CampaignCreativeLine = {
  id: 'native',
  label: 'Native extension',
  kind: 'native',
  delivery: {
    cpmUsd: NATIVE_CPM,
    impressionsPurchased: NATIVE_BOOKED,
    pctDelivered: (NATIVE_DELIVERED / NATIVE_BOOKED) * 100,
    deliveredImpressions: NATIVE_DELIVERED,
  },
  performance: {
    ctrPct: Math.round(NATIVE_CTR * 1000) / 1000,
    pmpSharePct: NATIVE_PMP_SHARE_PCT,
    measurementNote: `Native line · $${NATIVE_SPEND_USD.toLocaleString('en-US')} of $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} · ${NATIVE_DELIVERED.toLocaleString('en-US')} imps · ${NATIVE_CLICKS.toLocaleString('en-US')} clicks (~${NATIVE_CTR.toFixed(2)}% CTR) · ~$${NATIVE_CPM.toFixed(2)} CPM · ~${NATIVE_PMP_SHARE_PCT.toFixed(1)}% PMP / endemic. Line imps/clicks are a partition of the original combined report.`,
  },
  monthlyDelivery: [...NATIVE_SEGMENTS],
  monthlyDeliveryNote:
    'Native share of original Apr–Jun combined grain. PMP share is supply mix only — does not change totals.',
  creative: {
    environments: 'Native in-feed and content recommendation on Wine Spectator + curated travel / lifestyle PMPs.',
    sizes: [...nativeFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-vnv-native-creative',
  },
  tracking: {
    description:
      'Native tags route to Visit Napa Valley (temporary until approved LP). Append Tourism Economic native pixel alongside 1×1 trackers.',
    clickthroughUrl: NATIVE_CLICKTHROUGH,
    pixelUrl: NATIVE_PIXEL,
  },
  overviewObjectiveSub: `Native · ${NATIVE_DELIVERED.toLocaleString('en-US')} of ${DELIVERED_IMP.toLocaleString('en-US')} combined imps · ~${NATIVE_PMP_SHARE_PCT.toFixed(0)}% PMP.`,
  tradeDesk: buildLineTradeDesk({
    lineItem: 'Visit Napa Valley — Native extension',
    segments: NATIVE_SEGMENTS,
    impressionsBooked: NATIVE_BOOKED,
    deliveredImp: NATIVE_DELIVERED,
    formats: nativeFormats,
    formatWeights: NATIVE_FORMAT_WEIGHTS,
    deviceSplit: nativeDeviceSplit,
    dsp: 'Programmatic native (Wine Spectator endemic + native PMPs)',
  }),
}

const prerollLine: CampaignCreativeLine = {
  id: 'preroll',
  label: 'Pre-roll',
  kind: 'preroll',
  delivery: {
    cpmUsd: PREROLL_CPM,
    impressionsPurchased: PREROLL_BOOKED,
    pctDelivered: (PREROLL_DELIVERED / PREROLL_BOOKED) * 100,
    deliveredImpressions: PREROLL_DELIVERED,
  },
  performance: {
    ctrPct: Math.round(PREROLL_CTR * 1000) / 1000,
    pmpSharePct: PREROLL_PMP_SHARE_PCT,
    vcrPct: PREROLL_VCR_PCT,
    measurementNote: `Pre-roll line · $${PREROLL_SPEND_USD.toLocaleString('en-US')} of $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} · ${PREROLL_DELIVERED.toLocaleString('en-US')} imps · ${PREROLL_CLICKS.toLocaleString('en-US')} clicks (~${PREROLL_CTR.toFixed(2)}% CTR) · ~${PREROLL_VCR_PCT.toFixed(1)}% VCR · ~$${PREROLL_CPM.toFixed(2)} CPM · ~${PREROLL_PMP_SHARE_PCT.toFixed(1)}% PMP. Line imps/clicks are a partition of the original combined report.`,
  },
  monthlyDelivery: [...PREROLL_SEGMENTS],
  monthlyDeliveryNote:
    'Pre-roll share of original Apr–Jun combined grain. CTR is click-based; VCR is completion-based and does not change impression or click totals.',
  creative: {
    environments: '15s/30s pre-roll and in-stream on Wine Spectator + premium video PMPs.',
    sizes: [...prerollFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-vnv-preroll-creative',
  },
  tracking: {
    description:
      'Pre-roll / video tags route to Visit Napa Valley (temporary until approved LP). Append Tourism Economic video pixel alongside 1×1 trackers.',
    clickthroughUrl: PREROLL_CLICKTHROUGH,
    pixelUrl: VIDEO_PIXEL,
  },
  overviewObjectiveSub: `Pre-roll · ${PREROLL_DELIVERED.toLocaleString('en-US')} of ${DELIVERED_IMP.toLocaleString('en-US')} combined imps · ~${PREROLL_VCR_PCT.toFixed(0)}% VCR · ~${PREROLL_PMP_SHARE_PCT.toFixed(0)}% PMP.`,
  tradeDesk: buildLineTradeDesk({
    lineItem: 'Visit Napa Valley — Pre-roll',
    segments: PREROLL_SEGMENTS,
    impressionsBooked: PREROLL_BOOKED,
    deliveredImp: PREROLL_DELIVERED,
    formats: prerollFormats,
    formatWeights: PREROLL_FORMAT_WEIGHTS,
    deviceSplit: prerollDeviceSplit,
    dsp: 'Programmatic video (Wine Spectator endemic + premium pre-roll PMPs)',
  }),
}

export const visitNapaValleyCampaign: CampaignReport = {
  id: 'visit_napa_valley_display_2026',
  name: 'Visit Napa Valley — Native + Pre-roll',
  clientFacingName: 'Visit Napa Valley',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Flight ended ${REPORT_AS_OF} · ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked · ${DELIVERED_IMP.toLocaleString('en-US')} delivered · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net spend (~${((DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100).toFixed(1)}% of book). Native + pre-roll lines.`,
  },
  delivery: {
    cpmUsd: BLENDED_CPM,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR * 1000) / 1000,
    pmpSharePct: Math.round(COMBINED_PMP_SHARE_PCT * 10) / 10,
    vcrPct: PREROLL_VCR_PCT,
    measurementNote: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} net media over Apr 20–Jun 30 · ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps ⇒ blended ~$${BLENDED_CPM.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR.toFixed(2)}% blended CTR). Combined PMP ~${COMBINED_PMP_SHARE_PCT.toFixed(1)}%; pre-roll VCR ~${PREROLL_VCR_PCT.toFixed(1)}%. Creative tabs partition the same original totals.`,
  },
  geo: {
    headline:
      'West Coast feeder DMAs into Napa — Wine Spectator endemic / PMP reach for wine-country travel.',
    primaryMarkets: [...VNV_PRIMARY_DMAS],
    driveInMarkets: [...VNV_SECONDARY_DMAS],
  },
  creative: {
    environments: 'Native extension + 15s/30s pre-roll on Wine Spectator endemic deals and curated travel / wine PMPs.',
    sizes: [...combinedFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-vnv-creative',
  },
  tracking: {
    description:
      'Combined IO: native and pre-roll each have their own click-through (temporary Visit Napa Valley URLs) and Tourism Economic pixels. Switch creative tabs for line-level tags, PMP share, and VCR.',
    clickthroughUrl: NATIVE_CLICKTHROUGH,
  },
  overviewObjectiveSub: `${Math.round(IMPRESSIONS_BOOKED / 1000)}k book · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} · ${DELIVERED_IMP.toLocaleString('en-US')} delivered (original combined totals) · ~${COMBINED_PMP_SHARE_PCT.toFixed(0)}% PMP · pre-roll VCR ~${PREROLL_VCR_PCT.toFixed(0)}%.`,
  monthlyDelivery: [...COMBINED_SEGMENTS],
  monthlyDeliveryNote:
    'Original Apr–Jun combined grain. Native / Pre-roll tabs partition these imps and clicks; PMP % and VCR do not change totals.',
  audienceActivationMix: [
    { name: 'Wine Spectator endemic / PMP', value: 48 },
    { name: 'Travel / wine intent', value: 22 },
    { name: 'Open auction (brand-safe)', value: 18 },
    { name: 'Retargeting', value: 12 },
  ],
  creativeLines: [nativeLine, prerollLine],
  audiences: vnvAudienceBuckets,
  tradeDesk: buildLineTradeDesk({
    lineItem: 'Visit Napa Valley — Native + Pre-roll (combined)',
    segments: COMBINED_SEGMENTS,
    impressionsBooked: IMPRESSIONS_BOOKED,
    deliveredImp: DELIVERED_IMP,
    formats: combinedFormats,
    formatWeights: COMBINED_FORMAT_WEIGHTS,
    deviceSplit: combinedDeviceSplit,
    dsp: 'Programmatic native + video (Wine Spectator endemic + PMPs)',
  }),
}
