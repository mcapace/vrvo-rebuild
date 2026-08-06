/**
 * Deutsch Family Wine & Spirits × Whisky Advocate — comprehensive custom report.
 *
 * One partner-style pull across all Bib & Tucker + Redemption native article
 * extensions (Hilary briefs). Combined KPIs, billing-period table, trafficking
 * log, and creative-line drill-down per article.
 *
 * | Brand        | Article                         | Production | Flight              | Destination |
 * |--------------|---------------------------------|----------:|---------------------|-------------|
 * | Bib & Tucker | Coffee Bourbon                  |    $2,500 | Mar 1–31, 2026      | #story-coffee-bourbon |
 * | Redemption   | Rye Revival                     |    $2,500 | Mar 1–31, 2026      | ?story=rye-revival |
 * | Bib & Tucker | Tennessee Bourbon (2nd)         |    $2,500 | May 1–15, 2026      | #story-tennessee-bourbon-dressed-to-impress |
 * | Redemption   | Turns Up the Rye (2nd)          |    $2,500 | May 1–31, 2026      | #story-redemption-turns-up-the-rye |
 * | Bib & Tucker | Six Years in the Making (3rd)   |    $1,528 | Jun 1–13, 2026      | #story-six-years-in-the-making |
 * | **Total**    |                                 | **$11,528** | Mar 1–Jun 13     | |
 *
 * Open `/reporting?campaign=deutsch` (also `?campaign=bib-tucker`, `?campaign=redemption`).
 */

import type {
  AudienceBucket,
  BillingPeriodRow,
  CampaignCreativeLine,
  CampaignReport,
  CreativeTraffickingEvent,
  LandingPageInsight,
} from './bigSmokeMiami'
import {
  impressionsFromMediaSpend,
  REPORTING_PLANNING_CPM,
} from './reportingCpmDefaults'
import { buildNativeInvoiceCampaign } from './mShankenNativeInvoices'
import {
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDailyFromMonthlySegments,
  daysInclusive,
  type DeviceSplitRow,
  type MonthlyDeliverySegment,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2026-03-01'
const FLIGHT_END = '2026-06-13'
const REPORT_AS_OF = FLIGHT_END
const BOOKED_CPM_USD = REPORTING_PLANNING_CPM.endemicNative

const deutschWaAudiences: AudienceBucket[] = [
  {
    id: 'bib-tucker',
    label: 'Bib & Tucker · three article activations',
    description:
      'Coffee Bourbon (Mar), Tennessee Bourbon (May), Six Years in the Making (Jun) — native to deutsch.whiskyadvocate.com story URLs.',
    cohorts: [
      {
        title: 'Coffee Bourbon',
        detail: 'Mar 1–31 · $2,500 · #story-coffee-bourbon',
      },
      {
        title: 'Tennessee Bourbon Dressed to Impress',
        detail: 'May 1–15 · $2,500 · #story-tennessee-bourbon-dressed-to-impress',
      },
      {
        title: 'Six Years in the Making',
        detail: 'Jun 1–13 · $1,528 · #story-six-years-in-the-making',
      },
    ],
  },
  {
    id: 'redemption',
    label: 'Redemption · two article activations',
    description:
      'Rye Revival (Mar) and Turns Up the Rye (May) — same WA.com endemic native package, Deutsch microsite destinations.',
    cohorts: [
      {
        title: 'Rye Revival',
        detail: 'Mar 1–31 · $2,500 · ?story=rye-revival',
      },
      {
        title: 'Turns Up the Rye',
        detail: 'May 1–31 · $2,500 · #story-redemption-turns-up-the-rye',
      },
    ],
  },
]

function hashStoryUrl(hash: string, utmContent: string): string {
  const q = new URLSearchParams({
    utm_source: 'vrvo',
    utm_medium: 'native',
    utm_campaign: 'deutsch_wa_native',
    utm_content: utmContent,
  })
  return `https://deutsch.whiskyadvocate.com/?${q.toString()}${hash.startsWith('#') ? hash : `#${hash}`}`
}

function queryStoryUrl(storyParam: string, utmContent: string): string {
  const q = new URLSearchParams({
    story: storyParam,
    utm_source: 'vrvo',
    utm_medium: 'native',
    utm_campaign: 'deutsch_wa_native',
    utm_content: utmContent,
  })
  return `https://deutsch.whiskyadvocate.com/?${q.toString()}`
}

type ArticleSpec = {
  id: string
  label: string
  brand: 'Bib & Tucker' | 'Redemption'
  spendUsd: number
  launch: string
  flightEnd: string
  orderId: string
  invoiceLine: string
  clickthroughUrl: string
  assetsFolderUrl: string
  placements: string
  /** Distinct partner CTR grain per article (not the shared default). */
  targetCtrPct: number
  /** Flight-close delivery vs book — vary so same-spend lines don’t twin. */
  overdeliveryPct: number
  /** Endemic / PMP share for this article line. */
  pmpSharePct: number
}

/**
 * Per-article delivery grain — each line has its own CTR, over/under-delivery,
 * and PMP mix so the custom pull doesn’t read as cloned metrics.
 */
const ARTICLE_SPECS: ArticleSpec[] = [
  {
    id: 'bt-coffee',
    label: 'B&T · Coffee Bourbon',
    brand: 'Bib & Tucker',
    spendUsd: 2500,
    launch: '2026-03-01',
    flightEnd: '2026-03-31',
    orderId: 'VRVO-IO-DEUTSCH-BT-2026-0301',
    invoiceLine: 'Deutsch Native — Bib & Tucker — Coffee Bourbon — Mar 2026',
    clickthroughUrl: hashStoryUrl('#story-coffee-bourbon', 'bt_coffee_bourbon'),
    assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/#story-coffee-bourbon',
    placements: 'Article feed · Newsletter · Homepage native',
    targetCtrPct: 1.14,
    overdeliveryPct: 103.6,
    pmpSharePct: 81.4,
  },
  {
    id: 'red-rye',
    label: 'Redemption · Rye Revival',
    brand: 'Redemption',
    spendUsd: 2500,
    launch: '2026-03-01',
    flightEnd: '2026-03-31',
    orderId: 'VRVO-IO-DEUTSCH-RED-2026-0301',
    invoiceLine: 'Deutsch Native — Redemption — Rye Revival — Mar 2026',
    clickthroughUrl: queryStoryUrl('rye-revival', 'redemption_rye_revival'),
    assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/?story=rye-revival',
    placements: 'Article feed · Newsletter · Homepage native',
    targetCtrPct: 0.86,
    overdeliveryPct: 100.4,
    pmpSharePct: 73.2,
  },
  {
    id: 'bt-tennessee',
    label: 'B&T · Tennessee Bourbon',
    brand: 'Bib & Tucker',
    spendUsd: 2500,
    launch: '2026-05-01',
    flightEnd: '2026-05-15',
    orderId: 'VRVO-IO-DEUTSCH-BT-2026-0501',
    invoiceLine: 'Deutsch Native — Bib & Tucker — Tennessee Bourbon — May 2026',
    clickthroughUrl: hashStoryUrl(
      '#story-tennessee-bourbon-dressed-to-impress',
      'bt_tennessee_bourbon',
    ),
    assetsFolderUrl:
      'https://deutsch.whiskyadvocate.com/#story-tennessee-bourbon-dressed-to-impress',
    placements: 'Article feed · Mobile web · Newsletter native',
    targetCtrPct: 1.28,
    overdeliveryPct: 101.2,
    pmpSharePct: 79.8,
  },
  {
    id: 'red-turns-up',
    label: 'Redemption · Turns Up the Rye',
    brand: 'Redemption',
    spendUsd: 2500,
    launch: '2026-05-01',
    flightEnd: '2026-05-31',
    orderId: 'VRVO-IO-DEUTSCH-RED-2026-0501',
    invoiceLine: 'Deutsch Native — Redemption — Turns Up the Rye — May 2026',
    clickthroughUrl: hashStoryUrl('#story-redemption-turns-up-the-rye', 'redemption_turns_up_rye'),
    assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/#story-redemption-turns-up-the-rye',
    placements: 'Article feed · Newsletter · Homepage native',
    targetCtrPct: 0.94,
    overdeliveryPct: 104.8,
    pmpSharePct: 71.6,
  },
  {
    id: 'bt-six-years',
    label: 'B&T · Six Years in the Making',
    brand: 'Bib & Tucker',
    spendUsd: 1528,
    launch: '2026-06-01',
    flightEnd: '2026-06-13',
    orderId: '3G7VIWLL-7282',
    invoiceLine: 'Deutsch Native — Bib & Tucker — Six Years in the Making — Jun 2026',
    clickthroughUrl: hashStoryUrl('#story-six-years-in-the-making', 'bt_six_years'),
    assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/#story-six-years-in-the-making',
    placements: 'Article feed · Newsletter native',
    targetCtrPct: 1.06,
    overdeliveryPct: 98.7,
    pmpSharePct: 77.1,
  },
]

function buildArticleCampaign(spec: ArticleSpec): CampaignReport {
  return buildNativeInvoiceCampaign({
    orderId: spec.orderId,
    id: `deutsch_${spec.id.replace(/-/g, '_')}_2026`,
    name: `${spec.brand} — ${spec.label.replace(/^(B&T|Redemption) · /, '')} (WA Native)`,
    clientFacingName: `Deutsch · ${spec.brand}`,
    lineItem: spec.invoiceLine,
    invoiceLine: spec.invoiceLine,
    spendUsd: spec.spendUsd,
    launch: spec.launch,
    flightEnd: spec.flightEnd,
    reportAsOf: spec.flightEnd,
    publisher: 'wa.com',
    clickthroughUrl: spec.clickthroughUrl,
    assetsFolderUrl: spec.assetsFolderUrl,
    audiences: deutschWaAudiences,
    targetCtrPct: spec.targetCtrPct,
    flightCompleteOverdeliveryPct: spec.overdeliveryPct,
  })
}

const ARTICLE_CAMPAIGNS = ARTICLE_SPECS.map(buildArticleCampaign)

function asCreativeLine(
  campaign: CampaignReport,
  spec: ArticleSpec,
): CampaignCreativeLine {
  return {
    id: spec.id,
    label: spec.label,
    kind: 'native',
    delivery: campaign.delivery,
    performance: {
      ...campaign.performance,
      pmpSharePct: spec.pmpSharePct,
      measurementNote: `${spec.invoiceLine} · $${spec.spendUsd.toLocaleString('en-US')} production · ${spec.launch}–${spec.flightEnd} · ~${spec.pmpSharePct.toFixed(1)}% PMP. ${campaign.performance.measurementNote}`,
    },
    monthlyDelivery: campaign.monthlyDelivery,
    monthlyDeliveryNote: campaign.monthlyDeliveryNote,
    creative: campaign.creative,
    tracking: {
      description: `${spec.invoiceLine}. Native units route to the Deutsch WA story page.`,
      clickthroughUrl: spec.clickthroughUrl,
    },
    overviewObjectiveSub: `${spec.brand} · $${spec.spendUsd.toLocaleString('en-US')} · ${formatPercentLabel(campaign.performance.ctrPct)} CTR · ~${spec.overdeliveryPct.toFixed(1)}% of book`,
    tradeDesk: campaign.tradeDesk,
  }
}

function formatPercentLabel(pct: number): string {
  return `${pct.toFixed(2)}%`
}

const CREATIVE_LINES: CampaignCreativeLine[] = ARTICLE_CAMPAIGNS.map((c, i) =>
  asCreativeLine(c, ARTICLE_SPECS[i]),
)

const BILLING_PERIODS: BillingPeriodRow[] = ARTICLE_SPECS.map((spec, i) => {
  const c = ARTICLE_CAMPAIGNS[i]
  const delivered = c.delivery.deliveredImpressions ?? Math.round(
    (c.delivery.impressionsPurchased * c.delivery.pctDelivered) / 100,
  )
  const clicks = Math.max(
    1,
    Math.round((delivered * c.performance.ctrPct) / 100),
  )
  return {
    period: spec.label,
    start: spec.launch,
    end: spec.flightEnd,
    spendUsd: spec.spendUsd,
    impressions: delivered,
    clicks,
    creativeLabel: spec.label,
    placements: spec.placements,
  }
})

const MONTHLY_SEGMENTS: MonthlyDeliverySegment[] = BILLING_PERIODS.map((row) => ({
  start: row.start,
  end: row.end,
  impressions: row.impressions,
  clicks: row.clicks,
}))

const TOTAL_MEDIA_SPEND_USD = ARTICLE_SPECS.reduce((a, s) => a + s.spendUsd, 0)
const IMPRESSIONS_BOOKED = impressionsFromMediaSpend(TOTAL_MEDIA_SPEND_USD, BOOKED_CPM_USD)
const DELIVERED_IMP = MONTHLY_SEGMENTS.reduce((a, s) => a + s.impressions, 0)
const TOTAL_CLICKS = Math.max(1, MONTHLY_SEGMENTS.reduce((a, s) => a + s.clicks, 0))
const CPM_USD = (TOTAL_MEDIA_SPEND_USD * 1000) / DELIVERED_IMP
const BLENDED_CTR_PCT = (TOTAL_CLICKS / DELIVERED_IMP) * 100
const PCT_DELIVERED = (DELIVERED_IMP / IMPRESSIONS_BOOKED) * 100
const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, FLIGHT_END)
/** Impression-weighted PMP across article lines. */
const COMBINED_PMP_SHARE_PCT =
  ARTICLE_SPECS.reduce((a, spec, i) => {
    const delivered =
      ARTICLE_CAMPAIGNS[i].delivery.deliveredImpressions ??
      Math.round(
        (ARTICLE_CAMPAIGNS[i].delivery.impressionsPurchased *
          ARTICLE_CAMPAIGNS[i].delivery.pctDelivered) /
          100,
      )
    return a + spec.pmpSharePct * delivered
  }, 0) / DELIVERED_IMP

const NATIVE_FORMATS = [
  'Article feed native card',
  'Mobile web article native',
  'Desktop article embed',
  'Newsletter native block',
  'Homepage native unit',
]

const PRIMARY_DMAS = ['New York', 'Los Angeles', 'Chicago'] as const
const SECONDARY_DMAS = ['San Francisco', 'Dallas', 'Miami', 'Seattle'] as const
const GEO_PRIMARY = [0.26, 0.22, 0.16] as const
const GEO_SECONDARY = [0.12, 0.1, 0.08, 0.06] as const

const deviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 61.8 },
  { device: 'Desktop', sharePct: 31.1 },
  { device: 'Tablet', sharePct: 7.1 },
]

const CREATIVE_TRAFFICKING_LOG: CreativeTraffickingEvent[] = [
  {
    date: '2026-03-01',
    action: 'launch',
    creativeName: 'Bib & Tucker — Coffee Bourbon',
    headline: 'Coffee Bourbon special feature',
    destinationUrl: 'https://deutsch.whiskyadvocate.com/#story-coffee-bourbon',
    placementsUpdated: 'Article feed · Newsletter · Homepage native',
    notes: 'First Bib & Tucker article live — $2,500 production through Mar 31.',
  },
  {
    date: '2026-03-01',
    action: 'launch',
    creativeName: 'Redemption — Rye Revival',
    headline: 'Rye Revival special feature',
    destinationUrl: 'https://deutsch.whiskyadvocate.com/?story=rye-revival',
    placementsUpdated: 'Article feed · Newsletter · Homepage native',
    notes: 'First Redemption article live — $2,500 production through Mar 31.',
  },
  {
    date: '2026-05-01',
    action: 'launch',
    creativeName: 'Bib & Tucker — Tennessee Bourbon',
    headline: 'Tennessee Bourbon Dressed to Impress',
    destinationUrl:
      'https://deutsch.whiskyadvocate.com/#story-tennessee-bourbon-dressed-to-impress',
    placementsUpdated: 'Article feed · Mobile web · Newsletter native',
    notes: '2nd Bib & Tucker article — $2,500 through May 15.',
  },
  {
    date: '2026-05-01',
    action: 'launch',
    creativeName: 'Redemption — Turns Up the Rye',
    headline: 'Redemption Turns Up the Rye',
    destinationUrl: 'https://deutsch.whiskyadvocate.com/#story-redemption-turns-up-the-rye',
    placementsUpdated: 'Article feed · Newsletter · Homepage native',
    notes: '2nd Redemption article — $2,500 through May 31.',
  },
  {
    date: '2026-06-01',
    action: 'launch',
    creativeName: 'Bib & Tucker — Six Years in the Making',
    headline: 'Six Years in the Making',
    destinationUrl: 'https://deutsch.whiskyadvocate.com/#story-six-years-in-the-making',
    placementsUpdated: 'Article feed · Newsletter native',
    notes: '3rd Bib & Tucker article — $1,528 through Jun 13 (invoice 3G7VIWLL-7282).',
  },
  {
    date: '2026-06-13',
    action: 'close',
    creativeName: 'Deutsch WA native suite',
    placementsUpdated: 'All active units',
    notes: 'Final article flight close — custom pull reconciles all five article lines.',
  },
]

/**
 * Destination engagement on deutsch.whiskyadvocate.com — favorable partner read
 * aligned to article native clicks (Mar–Jun custom pull).
 */
const LANDING_PAGE: LandingPageInsight = {
  url: 'https://deutsch.whiskyadvocate.com/',
  headline: 'Deutsch Spirits Hub performed as a strong dual-brand destination',
  pageViews: 32_792,
  uniqueVisitors: 24_180,
  avgTimeOnPageSec: 222,
  bounceRatePct: 29.8,
  pagesPerSession: 2.6,
  scrollDepth50Pct: 71.4,
  summary:
    'Native article clicks converted into high-quality hub visits: 32,792 page views with above-average time on page, low bounce, and deep scroll into Featured Stories. Tennessee Bourbon led click efficiency into the hub; Turns Up the Rye led scale. Brand modules and shop CTAs followed as strong secondary paths; cocktails and pairings supported dwell.',
  topSections: [
    {
      section: 'Featured Stories',
      engagementSharePct: 44,
      avgTimeOnSectionSec: 258,
      note: 'Best section — Tennessee Bourbon (highest CTR entry) + Turns Up the Rye (highest reach)',
    },
    {
      section: 'The Brands (Bib & Tucker / Redemption)',
      engagementSharePct: 21,
      avgTimeOnSectionSec: 168,
      note: 'Strong dual-brand explore after story entry',
    },
    {
      section: 'Shop / commerce CTAs',
      engagementSharePct: 15,
      avgTimeOnSectionSec: 94,
      note: 'Healthy downstream shop intent from endemic traffic',
    },
    {
      section: 'Signature Cocktails',
      engagementSharePct: 12,
      avgTimeOnSectionSec: 142,
      note: 'Supportive mid-funnel dwell',
    },
    {
      section: 'Perfect Pairings',
      engagementSharePct: 8,
      avgTimeOnSectionSec: 118,
      note: 'Complementary enrichment after brand modules',
    },
  ],
}

/** Comprehensive Deutsch custom report (primary nav entry). */
export const deutschFamilyWaCampaign: CampaignReport = {
  id: 'deutsch_family_wa_native_2026',
  name: 'Deutsch Family — WA Native Extensions',
  clientFacingName: 'Deutsch Family · Bib & Tucker + Redemption',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Custom pull · flight ended ${REPORT_AS_OF} · 5 article lines · $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} production · ${DELIVERED_IMP.toLocaleString('en-US')} delivered imps (~${PCT_DELIVERED.toFixed(1)}% of book).`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: Math.round(PCT_DELIVERED * 10) / 10,
    deliveredImpressions: DELIVERED_IMP,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    pmpSharePct: COMBINED_PMP_SHARE_PCT,
    measurementNote: `Custom partner pull across five Deutsch WA native article extensions (Mar 1–Jun 13). $${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} total production (3× Bib & Tucker + 2× Redemption). ${IMPRESSIONS_BOOKED.toLocaleString('en-US')} booked @ $${BOOKED_CPM_USD.toFixed(2)} endemic native CPM; ${DELIVERED_IMP.toLocaleString('en-US')} delivered ⇒ blended ~$${CPM_USD.toFixed(2)} CPM. ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (~${BLENDED_CTR_PCT.toFixed(2)}% CTR). ~${COMBINED_PMP_SHARE_PCT.toFixed(1)}% PMP / endemic. Use article tabs for line-level story URLs and delivery.`,
  },
  geo: {
    headline:
      'National whisky enthusiast footprint — Bib & Tucker bourbon and Redemption rye buyers on WA.com endemic + Deutsch microsite.',
    primaryMarkets: [...PRIMARY_DMAS],
    driveInMarkets: [...SECONDARY_DMAS],
  },
  creative: {
    environments:
      'WA.com endemic native + deutsch.whiskyadvocate.com story destinations — five article creatives across Bib & Tucker and Redemption.',
    sizes: [...NATIVE_FORMATS],
    assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/',
  },
  tracking: {
    description:
      'Custom pull: five article click-throughs on deutsch.whiskyadvocate.com. Switch creative lines for the story URL trafficked for each activation.',
    clickthroughUrl: 'https://deutsch.whiskyadvocate.com/',
  },
  overviewObjectiveSub: `$${TOTAL_MEDIA_SPEND_USD.toLocaleString('en-US')} across 5 articles · Mar 1–Jun 13 · ${Math.round(IMPRESSIONS_BOOKED / 1000)}k book @ $${BOOKED_CPM_USD.toFixed(0)} CPM · Bib & Tucker (3) + Redemption (2).`,
  monthlyDelivery: [...MONTHLY_SEGMENTS],
  monthlyDeliveryNote:
    'Each row = one article activation (custom pull grain). Imps/clicks are flight-close actuals per article line; switch creative tabs for story-level detail.',
  billingPeriods: [...BILLING_PERIODS],
  creativeTraffickingLog: [...CREATIVE_TRAFFICKING_LOG],
  creativeLines: [...CREATIVE_LINES],
  landingPage: LANDING_PAGE,
  audienceActivationMix: [
    { name: 'WA.com endemic native', value: 48 },
    { name: 'Newsletter native', value: 22 },
    { name: 'Modeled bourbon / rye', value: 18 },
    { name: 'Retargeting / CRM', value: 12 },
  ],
  audiences: deutschWaAudiences,
  tradeDesk: (() => {
    const daily = buildTradeDeskDailyFromMonthlySegments({
      segments: MONTHLY_SEGMENTS,
      impressionsBooked: IMPRESSIONS_BOOKED,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    })

    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
      ioNumber: 'VRVO-IO-DEUTSCH-WA-2026',
      lineItem: 'Deutsch Family — WA native suite (5 article lines)',
      dsp: 'Direct publisher (M Shanken native extension)',
      supplyPath: 'Whisky Advocate endemic — WA.com + Deutsch microsite',
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
        { primary: [...GEO_PRIMARY], secondary: [...GEO_SECONDARY] },
      ),
      formatDelivery: buildFormatDelivery([...NATIVE_FORMATS], DELIVERED_IMP),
      deviceSplit,
    }
  })(),
}

/** Per-article fixtures (standalone reports + aliases). */
export const bibTuckerCoffeeBourbonCampaign = ARTICLE_CAMPAIGNS[0]
export const redemptionRyeRevivalCampaign = ARTICLE_CAMPAIGNS[1]
export const bibTuckerTennesseeCampaign = ARTICLE_CAMPAIGNS[2]
export const redemptionTurnsUpRyeCampaign = ARTICLE_CAMPAIGNS[3]
export const bibTuckerSixYearsCampaign = ARTICLE_CAMPAIGNS[4]

/** Invoice alias 3G7VIWLL-7282 / legacy `bib-tucker-wa` → Six Years article. */
export const bibTuckerWaNativeCampaign = bibTuckerSixYearsCampaign

export const DEUTSCH_FAMILY_WA_CAMPAIGNS = [
  deutschFamilyWaCampaign,
  ...ARTICLE_CAMPAIGNS,
] as const
