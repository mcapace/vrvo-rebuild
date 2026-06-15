/**
 * Builds native-extension reporting fixtures from M Shanken / Vrvo invoice lines.
 * Booked impressions = invoice amount × 1,000 ÷ planning CPM (`reportingCpmDefaults`).
 */

import type { AudienceBucket, CampaignReport, CampaignTradeDesk } from './bigSmokeMiami'
import {
  impressionsFromMediaSpend,
  REPORTING_DEFAULT_CTR_PCT,
  REPORTING_PLANNING_CPM,
} from './reportingCpmDefaults'
import {
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDaily,
  buildTradeDeskDailyFromMonthlySegments,
  daysInclusive,
  type DeviceSplitRow,
  type GeoDeliveryShareTemplate,
  type MonthlyDeliverySegment,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const NATIVE_FORMATS = [
  'Article feed native card',
  'Mobile web article native',
  'Desktop article embed',
  'Newsletter native block',
  'Homepage native unit',
]

const PODCAST_FORMATS = [
  'Podcast feed native (mid-roll adjacency)',
  'Episode page native unit',
  'Mobile web article native',
  'Newsletter native block',
]

const DEFAULT_PRIMARY = ['New York', 'Los Angeles', 'Miami'] as const
const DEFAULT_SECONDARY = ['Chicago', 'Dallas', 'San Francisco', 'Houston'] as const
const DEFAULT_GEO_SHARES: GeoDeliveryShareTemplate = {
  primary: [0.24, 0.22, 0.16],
  secondary: [0.12, 0.11, 0.09, 0.06],
}

const displayDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 61.2 },
  { device: 'Desktop', sharePct: 31.4 },
  { device: 'Tablet', sharePct: 7.6 },
]

const podcastDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 71.5 },
  { device: 'Desktop', sharePct: 24.3 },
  { device: 'Tablet', sharePct: 4.2 },
]

export type MShankenPublisher = 'ca.com' | 'wa.com' | 'ws.com' | '90-club' | 'podcast'

export type NativeInvoiceSpec = {
  orderId: string
  id: string
  name: string
  clientFacingName: string
  lineItem: string
  invoiceLine: string
  spendUsd: number
  launch: string
  flightEnd: string
  reportAsOf: string
  publisher: MShankenPublisher
  clickthroughUrl: string
  assetsFolderUrl: string
  audiences: AudienceBucket[]
  audienceActivationMix?: { name: string; value: number }[]
  /** Planning CPM for book math; defaults by publisher from `REPORTING_PLANNING_CPM`. */
  bookedCpmUsd?: number
  /** Blended CTR target for daily grain (default scenario lab CTR). */
  targetCtrPct?: number
  impressionsBookedOverride?: number
  /** When flight is complete, delivered runs ~2% over book (partner grain). */
  flightCompleteOverdeliveryPct?: number
}

function publisherBookedCpm(publisher: MShankenPublisher): number {
  switch (publisher) {
    case '90-club':
      return REPORTING_PLANNING_CPM.premiumNative
    case 'podcast':
      return REPORTING_PLANNING_CPM.podcastNative
    default:
      return REPORTING_PLANNING_CPM.endemicNative
  }
}

function monthKey(iso: string): string {
  return iso.slice(0, 7)
}

function splitDeliveredAcrossMonths(
  launch: string,
  asOf: string,
  totalImp: number,
  totalClicks: number,
): MonthlyDeliverySegment[] {
  const n = daysInclusive(launch, asOf)
  if (n < 1 || totalImp <= 0) return []

  const dayImps: { date: string; imp: number }[] = []
  const weights: number[] = []
  for (let i = 0; i < n; i++) {
    const iso = addDaysUtc(launch, i)
    const [y, m, d] = iso.split('-').map(Number)
    const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
    const weekend = wd === 0 || wd === 6 ? 0.68 : 1.02
    weights.push(weekend)
  }
  const sumW = weights.reduce((a, b) => a + b, 0)
  let imps = weights.map((w) => Math.round((totalImp * w) / sumW))
  let diff = totalImp - imps.reduce((a, b) => a + b, 0)
  let ix = imps.length - 1
  while (diff !== 0 && ix >= 0) {
    const adj = diff > 0 ? 1 : -1
    if (imps[ix] + adj >= 0) {
      imps[ix] += adj
      diff -= adj
    }
    ix -= 1
  }

  for (let i = 0; i < n; i++) {
    dayImps.push({ date: addDaysUtc(launch, i), imp: imps[i] })
  }

  const byMonth = new Map<string, { start: string; end: string; impressions: number }>()
  for (const { date, imp } of dayImps) {
    const key = monthKey(date)
    const cur = byMonth.get(key)
    if (!cur) {
      byMonth.set(key, { start: date, end: date, impressions: imp })
    } else {
      cur.end = date
      cur.impressions += imp
    }
  }

  const segments: MonthlyDeliverySegment[] = []
  for (const seg of byMonth.values()) {
    const clicks = Math.max(0, Math.round((totalClicks * seg.impressions) / totalImp))
    segments.push({
      start: seg.start,
      end: seg.end,
      impressions: seg.impressions,
      clicks,
    })
  }

  const clickSum = segments.reduce((a, s) => a + s.clicks, 0)
  if (segments.length && clickSum !== totalClicks) {
    segments[segments.length - 1].clicks += totalClicks - clickSum
  }

  return segments
}

function addDaysUtc(iso: string, delta: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const x = new Date(Date.UTC(y, m - 1, d + delta))
  return x.toISOString().slice(0, 10)
}

function publisherEnvironments(publisher: MShankenPublisher): string {
  switch (publisher) {
    case 'ca.com':
      return 'CigarAficionado.com endemic — native units on article, homepage, and newsletter (no display banners).'
    case 'wa.com':
      return 'WhiskyAdvocate.com endemic — native units on article, homepage, and newsletter.'
    case 'ws.com':
      return 'WineSpectator.com endemic — native units on article, homepage, and newsletter.'
    case '90-club':
      return 'Whisky Advocate 90 Club — native extension across WA.com endemic and member-facing surfaces.'
    case 'podcast':
      return 'Cigar Aficionado podcast in-house extension — feed native, episode pages, and digital adjacency.'
    default:
      return 'Publisher endemic native inventory.'
  }
}

function publisherGeoHeadline(publisher: MShankenPublisher): string {
  switch (publisher) {
    case 'ca.com':
    case 'podcast':
      return 'National cigar enthusiast footprint — priority luxury metro listeners and collectors.'
    case 'wa.com':
    case '90-club':
      return 'National whisky enthusiast footprint — endemic Whisky Advocate readers and 90 Club members.'
    case 'ws.com':
      return 'National wine enthusiast footprint — Wine Spectator endemic and luxury wine buyers.'
    default:
      return 'National endemic audience footprint.'
  }
}

export function buildNativeInvoiceCampaign(spec: NativeInvoiceSpec): CampaignReport {
  const {
    orderId,
    id,
    name,
    clientFacingName,
    lineItem,
    invoiceLine,
    spendUsd,
    launch,
    flightEnd,
    reportAsOf,
    publisher,
    clickthroughUrl,
    assetsFolderUrl,
    audiences,
    audienceActivationMix,
    bookedCpmUsd: bookedCpmInput,
    targetCtrPct: targetCtrInput,
    impressionsBookedOverride,
    flightCompleteOverdeliveryPct = 102,
  } = spec

  const bookedCpmUsd = bookedCpmInput ?? publisherBookedCpm(publisher)
  const targetCtrPct = targetCtrInput ?? REPORTING_DEFAULT_CTR_PCT
  const impressionsBooked =
    impressionsBookedOverride ?? impressionsFromMediaSpend(spendUsd, bookedCpmUsd)
  const flightPlannedDays = daysInclusive(launch, flightEnd)
  const inMarket = reportAsOf < flightEnd

  let deliveredImp: number
  let pctDelivered: number

  if (inMarket) {
    const elapsed = daysInclusive(launch, reportAsOf)
    const linearPct = (elapsed / flightPlannedDays) * 100
    pctDelivered = Math.min(99.5, Math.round(linearPct * 1.01 * 10) / 10)
    deliveredImp = Math.round((impressionsBooked * pctDelivered) / 100)
  } else {
    deliveredImp = Math.round((impressionsBooked * flightCompleteOverdeliveryPct) / 100)
    pctDelivered = Math.round((deliveredImp / impressionsBooked) * 1000) / 10
  }

  const totalClicks = Math.max(1, Math.round((deliveredImp * targetCtrPct) / 100))
  const blendedCtrPct =
    deliveredImp > 0 ? (totalClicks / deliveredImp) * 100 : targetCtrPct
  const deliveredSpendUsd = Math.round(((deliveredImp / 1000) * bookedCpmUsd) * 100) / 100

  const monthlyDelivery = splitDeliveredAcrossMonths(launch, reportAsOf, deliveredImp, totalClicks)
  const formats = publisher === 'podcast' ? PODCAST_FORMATS : NATIVE_FORMATS
  const deviceSplit = publisher === 'podcast' ? podcastDeviceSplit : displayDeviceSplit

  const meta: TradeDeskMeta = {
    reportGeneratedAt: `${reportAsOf}T12:00:00.000Z`,
    ioNumber: orderId,
    lineItem,
    dsp: 'Direct publisher (prebooked native)',
    supplyPath: publisherEnvironments(publisher),
    flightPlannedDays,
    lastDataDate: reportAsOf,
    currency: 'USD',
  }

  const daily =
    monthlyDelivery.length > 0
      ? buildTradeDeskDailyFromMonthlySegments({
          segments: monthlyDelivery,
          impressionsBooked,
          flightPlannedDays,
        })
      : buildTradeDeskDaily({
          launchDate: launch,
          lastDate: reportAsOf,
          impressionsBooked,
          pctDelivered,
          overallCtrPct: targetCtrPct,
          flightPlannedDays,
        })

  const tradeDesk: CampaignTradeDesk = {
    meta,
    daily,
    geoDelivery: buildGeoDelivery(
      deliveredImp,
      [...DEFAULT_PRIMARY],
      [...DEFAULT_SECONDARY],
      DEFAULT_GEO_SHARES,
    ),
    formatDelivery: buildFormatDelivery(formats, deliveredImp),
    deviceSplit,
  }

  const flightStatus = inMarket
    ? `In market through ${flightEnd} — snapshot ${reportAsOf}.`
    : `Flight ended ${reportAsOf} · ~${pctDelivered.toFixed(1)}% of book delivered.`

  return {
    id,
    name,
    clientFacingName,
    flight: {
      launched: launch,
      inMarket,
      summary: `${invoiceLine} · ${flightStatus}`,
    },
    delivery: {
      cpmUsd: Math.round(bookedCpmUsd * 100) / 100,
      impressionsPurchased: impressionsBooked,
      pctDelivered: Math.round(pctDelivered * 10) / 10,
      deliveredImpressions: deliveredImp,
    },
    performance: {
      ctrPct: Math.round(blendedCtrPct * 1000) / 1000,
      measurementNote: `$${spendUsd.toLocaleString('en-US')} invoice (${orderId}); ${impressionsBooked.toLocaleString('en-US')} booked imps at $${bookedCpmUsd.toFixed(2)} planning CPM; ${deliveredImp.toLocaleString('en-US')} delivered (~$${deliveredSpendUsd.toLocaleString('en-US')} media). ${totalClicks.toLocaleString('en-US')} clicks (~${blendedCtrPct.toFixed(2)}% CTR). Native extension — clickthrough only.`,
    },
    geo: {
      headline: publisherGeoHeadline(publisher),
      primaryMarkets: [...DEFAULT_PRIMARY],
      driveInMarkets: [...DEFAULT_SECONDARY],
    },
    creative: {
      environments: publisherEnvironments(publisher),
      sizes: formats,
      assetsFolderUrl,
    },
    tracking: {
      description: `Invoice line: ${invoiceLine}. Native units route to the trafficked sponsor destination.`,
      clickthroughUrl,
    },
    overviewObjectiveSub: `$${spendUsd.toLocaleString('en-US')} invoice · order ${orderId} · ${launch}–${flightEnd} · ${Math.round(impressionsBooked / 1000)}k book @ $${bookedCpmUsd.toFixed(2)} CPM.`,
    monthlyDelivery,
    monthlyDeliveryNote: inMarket
      ? `Delivery through ${reportAsOf}; flight still in market. Booked imps = invoice ÷ $${bookedCpmUsd.toFixed(2)} planning CPM (shared reporting defaults).`
      : `Flight-close delivery through ${reportAsOf}. Booked imps = invoice ÷ $${bookedCpmUsd.toFixed(2)} planning CPM (shared reporting defaults).`,
    audienceActivationMix:
      audienceActivationMix ??
      (publisher === 'podcast'
        ? [
            { name: 'Podcast native', value: 48 },
            { name: 'Digital site native', value: 32 },
            { name: 'Newsletter native', value: 20 },
          ]
        : [
            { name: 'Endemic site native', value: 46 },
            { name: 'Newsletter native', value: 24 },
            { name: 'Modeled extension', value: 18 },
            { name: 'Retargeting', value: 12 },
          ]),
    audiences,
    tradeDesk,
  }
}

const REPORT_AS_OF = '2026-06-15'

const sharedCigarAudiences: AudienceBucket[] = [
  {
    id: 'endemic',
    label: 'Cigar Aficionado endemic',
    description: 'Prebooked native on CA.com and newsletter surfaces.',
    cohorts: [
      { title: 'CA.com article native', detail: 'Contextual native on editorial cigar lifestyle content.' },
      { title: 'Newsletter native block', detail: 'Dedicated native in subscriber newsletter during flight.' },
      { title: 'Homepage / section native', detail: 'High-viewability endemic placements on priority site paths.' },
    ],
  },
]

const sharedWaAudiences: AudienceBucket[] = [
  {
    id: 'endemic',
    label: 'Whisky Advocate endemic',
    description: 'Native extension on WA.com and member newsletters.',
    cohorts: [
      { title: 'WA.com article native', detail: 'Editorial alignment on whisky reviews and lifestyle content.' },
      { title: 'Newsletter native', detail: 'Subscriber newsletter native block during flight window.' },
      { title: 'Premium spirits intent', detail: 'Modeled ultra-premium brown spirits and luxury buyer layers.' },
    ],
  },
]

const sharedWsAudiences: AudienceBucket[] = [
  {
    id: 'endemic',
    label: 'Wine Spectator endemic',
    description: 'Native extension on WS.com and newsletter.',
    cohorts: [
      { title: 'WS.com article native', detail: 'Editorial wine lifestyle and review adjacency.' },
      { title: 'Newsletter native', detail: 'Subscriber native placement during June flight.' },
      { title: 'Luxury wine buyers', detail: 'Affluent wine collector and premium buyer modeled layers.' },
    ],
  },
]

export const pernod90ClubNativeCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7278',
  id: 'pernod_90_club_native_2026',
  name: 'Pernod Ricard — 90 Club Native Extension',
  clientFacingName: 'Pernod Ricard · 90 Club',
  lineItem: 'Pernod Ricard — 90 Club Native Extension (May & June 2026)',
  invoiceLine: 'Pernod Richard - Native Extension - 90 Club (May & June) 2026',
  spendUsd: 4000,
  launch: '2026-05-01',
  flightEnd: '2026-06-30',
  reportAsOf: REPORT_AS_OF,
  publisher: '90-club',
  clickthroughUrl:
    'https://www.whiskyadvocate.com/?utm_source=vrvo&utm_medium=native&utm_campaign=pernod_90_club_native&utm_content=invoice_7278',
  assetsFolderUrl: 'https://www.whiskyadvocate.com/',
  audiences: [
    {
      id: '90-club',
      label: '90 Club member native',
      description: 'Whisky Advocate 90 Club endemic and member newsletter native.',
      cohorts: [
        { title: '90 Club member newsletter', detail: 'Native extension to engaged WA member cohort.' },
        { title: 'WA.com endemic native', detail: 'Article and homepage native units during May–June flight.' },
        { title: 'Premium spirits collectors', detail: 'Modeled luxury spirits buyers aligned to Pernod portfolio.' },
      ],
    },
  ],
})

export const glenmorangieNativeCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7279',
  id: 'glenmorangie_wa_native_2026',
  name: 'Glenmorangie — Whisky Advocate Native Extension',
  clientFacingName: 'Glenmorangie · Whisky Advocate',
  lineItem: 'Glenmorangie Native Extension — Whisky Advocate May/June 2026',
  invoiceLine: 'Glenmorangie Native Extension - Whisky Advocate May/June 2026',
  spendUsd: 1875,
  launch: '2026-05-01',
  flightEnd: '2026-06-30',
  reportAsOf: REPORT_AS_OF,
  publisher: 'wa.com',
  clickthroughUrl:
    'https://www.whiskyadvocate.com/?utm_source=vrvo&utm_medium=native&utm_campaign=glenmorangie_native&utm_content=invoice_7279',
  assetsFolderUrl: 'https://www.whiskyadvocate.com/',
  audiences: sharedWaAudiences,
})

export const davidoffCaNativeCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7280',
  id: 'davidoff_ca_native_2026',
  name: 'Davidoff — Cigar Aficionado Native Extension',
  clientFacingName: 'Davidoff · CA.com',
  lineItem: 'Davidoff Native Extension — CA.com May 2026',
  invoiceLine: 'Davidoff Native Extension - CA.com - May 2026',
  spendUsd: 2000,
  launch: '2026-05-01',
  flightEnd: '2026-05-31',
  reportAsOf: '2026-05-31',
  publisher: 'ca.com',
  clickthroughUrl:
    'https://www.cigaraficionado.com/?utm_source=vrvo&utm_medium=native&utm_campaign=davidoff_ca_native&utm_content=invoice_7280',
  assetsFolderUrl: 'https://www.cigaraficionado.com/',
  audiences: sharedCigarAudiences,
})

export const laAuroraCaNativeCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7281',
  id: 'la_aurora_ca_native_2026',
  name: 'La Aurora — Cigar Aficionado Native Extension',
  clientFacingName: 'La Aurora · CA.com',
  lineItem: 'La Aurora Native Extension — CA.com May 2026',
  invoiceLine: 'La Aurora Native Extension - CA.com - May 2026',
  spendUsd: 3450,
  launch: '2026-05-01',
  flightEnd: '2026-05-31',
  reportAsOf: '2026-05-31',
  publisher: 'ca.com',
  clickthroughUrl:
    'https://www.cigaraficionado.com/?utm_source=vrvo&utm_medium=native&utm_campaign=la_aurora_ca_native&utm_content=invoice_7281',
  assetsFolderUrl: 'https://www.cigaraficionado.com/',
  audiences: sharedCigarAudiences,
})

export const bibTuckerWaNativeCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7282',
  id: 'bib_tucker_wa_native_2026',
  name: 'Bib & Tucker — Whisky Advocate Native Extension',
  clientFacingName: 'Deutsch · Bib & Tucker · WA.com',
  lineItem: 'Deutsch Native Extension — Bib & Tucker — WA.com May 2026',
  invoiceLine: 'Deutsch Native Extension - Bib & Tucker - WA.com - May 2026',
  spendUsd: 1528,
  launch: '2026-05-01',
  flightEnd: '2026-05-31',
  reportAsOf: '2026-05-31',
  publisher: 'wa.com',
  clickthroughUrl:
    'https://www.whiskyadvocate.com/?utm_source=vrvo&utm_medium=native&utm_campaign=bib_tucker_wa_native&utm_content=invoice_7282',
  assetsFolderUrl: 'https://www.whiskyadvocate.com/',
  audiences: sharedWaAudiences,
})

export const pereladaWsNativeCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7283',
  id: 'perelada_ws_native_2026',
  name: 'Perelada — Wine Spectator Native Extension',
  clientFacingName: 'Perelada · WS.com',
  lineItem: 'Perelada Native Extension — WS.com June 2026',
  invoiceLine: 'Perelada - Native Extension - WS.com - June 2026',
  spendUsd: 1900,
  launch: '2026-06-01',
  flightEnd: '2026-06-30',
  reportAsOf: REPORT_AS_OF,
  publisher: 'ws.com',
  clickthroughUrl:
    'https://www.winespectator.com/?utm_source=vrvo&utm_medium=native&utm_campaign=perelada_ws_native&utm_content=invoice_7283',
  assetsFolderUrl: 'https://www.winespectator.com/',
  audiences: sharedWsAudiences,
})

export const cigarAficionadoPodcastCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7284',
  id: 'cigar_aficionado_podcast_native_2026',
  name: 'Cigar Aficionado Podcast — In-house Extension',
  clientFacingName: 'CA Podcast · Laura Zandi in-house extension',
  lineItem: 'CA Podcast — In-house Extension (Laura Zandi) May/June 2026',
  invoiceLine: 'CA Podcast - In-house Extension (Laura Zandi) - May/June 2026',
  spendUsd: 5000,
  launch: '2026-05-01',
  flightEnd: '2026-06-30',
  reportAsOf: REPORT_AS_OF,
  publisher: 'podcast',
  clickthroughUrl:
    'https://www.cigaraficionado.com/?utm_source=vrvo&utm_medium=native&utm_campaign=ca_podcast_laura_zandi&utm_content=invoice_7284',
  assetsFolderUrl: 'https://www.cigaraficionado.com/',
  audiences: [
    {
      id: 'podcast',
      label: 'Laura Zandi in-house podcast extension',
      description: 'Prebooked podcast and digital native — May & June 2026 flight.',
      cohorts: [
        { title: 'In-house episode native', detail: 'Laura Zandi host-read adjacency and feed-native cards.' },
        { title: 'Episode archive listeners', detail: 'Back-catalog delivery on prebooked podcast inventory.' },
        { title: 'CA.com sequential native', detail: 'Digital retargeting from podcast CTAs on CA.com.' },
      ],
    },
  ],
})

/** All June 2026 M Shanken invoice dashboards (7278–7284). */
export const M_SHANKEN_INVOICE_CAMPAIGNS: CampaignReport[] = [
  pernod90ClubNativeCampaign,
  glenmorangieNativeCampaign,
  davidoffCaNativeCampaign,
  laAuroraCaNativeCampaign,
  bibTuckerWaNativeCampaign,
  pereladaWsNativeCampaign,
  cigarAficionadoPodcastCampaign,
]
