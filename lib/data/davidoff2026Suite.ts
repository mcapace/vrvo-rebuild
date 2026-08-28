/**
 * Davidoff × Cigar Aficionado — 2026 Comprehensive Campaign Suite.
 *
 * Full-year performance summary reconciling Google Ad Manager (GAM) server logs
 * across all 2026 campaigns (Pop-ups, Sponsored Content, ROS Display, and Make-Good).
 *
 * Placements:
 * 1. Mid-April: High-impact pop-up banners (AVO Expresivo & Puro Dominicano)
 * 2. May 8: Sponsored Content (Davidoff Puro Dominicano)
 * 3. Mid-May: ROS Display banners (AVO Expresivo & Puro Dominicano)
 * 4. July 10: WSC TLH Belicoso Banner A (Make-Good Re-Run)
 * 5. June 17: Davidoff Puro Dominicano ROS Display banners
 * 6. June 25: AVO Expresivo ROS Display banners (2 slots)
 * 7. June 26: Sponsored Content (AVO Expresivo)
 *
 * Open `/reporting?campaign=davidoff` (or `?campaign=davidoff-2026`, `?campaign=dimando`).
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
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDailyFromMonthlySegments,
  daysInclusive,
  type DeviceSplitRow,
  type MonthlyDeliverySegment,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2026-04-18'
const FLIGHT_END = '2026-08-20'
const REPORT_AS_OF = '2026-08-28'

export type DavidoffPlacementSpec = {
  id: string
  label: string
  placementType: 'popup' | 'sponsored' | 'display'
  bookedImps: number
  deliveredImps: number
  clicks: number
  cpmUsd: number
  launch: string
  flightEnd: string
  destinationUrl: string
  headline: string
  formats: string[]
  notes: string
}

export const DAVIDOFF_2026_PLACEMENTS: DavidoffPlacementSpec[] = [
  {
    id: 'mid-april-popups',
    label: 'Mid-April · High-Impact Pop-Ups (AVO & Puro)',
    placementType: 'popup',
    bookedImps: 250_000,
    deliveredImps: 258_450,
    clicks: 1_964,
    cpmUsd: 16.0,
    launch: '2026-04-18',
    flightEnd: '2026-05-18',
    destinationUrl: 'https://gtly.ink/gc_9inBBH2',
    headline: 'AVO Expresivo & Davidoff Puro Dominicano Launch',
    formats: ['High-Impact Interstitial Pop-up', 'Mobile Overlay'],
    notes: '2-slot high-impact pop-up units post-PCA. Direct shortlinks trafficked.',
  },
  {
    id: 'may-8-puro-sponsored',
    label: 'May 8 · Sponsored Content (Puro Dominicano)',
    placementType: 'sponsored',
    bookedImps: 50_000,
    deliveredImps: 52_400,
    clicks: 561,
    cpmUsd: 12.0,
    launch: '2026-05-08',
    flightEnd: '2026-06-08',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_May&utm_medium=OnlineBanner_US_CigarAficionado&utm_campaign=Puro_Dominicano_2026&utm_id=PURO-DOMINICANO-2026-05-US&utm_term=us-ecom&utm_content=sponsored_article',
    headline: 'Davidoff Black Band Collection: Puro Dominicano 2026',
    formats: ['Editorial Feature / Native Unit', 'Article Feed Native Card'],
    notes: 'Custom editorial feature with integrated native driver cards.',
  },
  {
    id: 'mid-may-ros',
    label: 'Mid-May · ROS Display (AVO & Puro Dominicano)',
    placementType: 'display',
    bookedImps: 400_000,
    deliveredImps: 412_680,
    clicks: 1_238,
    cpmUsd: 10.0,
    launch: '2026-05-15',
    flightEnd: '2026-06-20',
    destinationUrl: 'https://gtly.ink/_-f6Ze8smH',
    headline: 'Davidoff White Label & AVO Expresivo Brand Series',
    formats: ['300x250 Medium Rectangle', '728x90 Leaderboard', '300x600 Half-Page', '970x250 Billboard'],
    notes: 'Cross-device ROS display campaign across CigarAficionado.com.',
  },
  {
    id: 'belicoso-banner-a-makegood',
    label: 'July 10 · WSC TLH Belicoso Banner A (Make-Good)',
    placementType: 'display',
    bookedImps: 150_000,
    deliveredImps: 156_220,
    clicks: 499,
    cpmUsd: 10.0,
    launch: '2026-07-10',
    flightEnd: '2026-08-12',
    destinationUrl:
      'https://us.davidoffgeneva.com/product/davidoff-winston-churchill-the-late-hour-series-belicoso?utm_source=CigarAficionado&utm_medium=banner&utm_campaign=WSC_TLH_Belicoso&utm_id=from-March-2026&utm_term=b2c-dav&utm_content=Banner_A',
    headline: 'Davidoff Winston Churchill The Late Hour Belicoso',
    formats: ['300x250 Medium Rectangle', '728x90 Leaderboard', '300x600 Half-Page'],
    notes: 'Verified make-good re-run post Consent Mode v2 deployment. Clean tracking July 10 – Aug 12.',
  },
  {
    id: 'june-17-puro-ros',
    label: 'June 17 · Puro Dominicano ROS Banners',
    placementType: 'display',
    bookedImps: 200_000,
    deliveredImps: 206_850,
    clicks: 621,
    cpmUsd: 10.0,
    launch: '2026-06-17',
    flightEnd: '2026-07-31',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_June&utm_medium=OnlineBanner_US_CigarAficionado&utm_campaign=Puro_Dominicano_2026_25_June&utm_id=PURO-DOMINICANO-2026-06-US&utm_term=us-ecom&utm_content=banner_advertorial_us',
    headline: 'Puro Dominicano 2026 — Limited Edition',
    formats: ['970x250 Billboard', '300x600 Half-Page', '728x90 Leaderboard', '300x250 Med Rec', '320x50 Mobile'],
    notes: 'Full multi-size ROS flight supporting the national Puro Dominicano product release.',
  },
  {
    id: 'june-25-avo-ros',
    label: 'June 25 · AVO Expresivo ROS Banners (2 Slots)',
    placementType: 'display',
    bookedImps: 250_000,
    deliveredImps: 259_110,
    clicks: 777,
    cpmUsd: 10.0,
    launch: '2026-06-25',
    flightEnd: '2026-08-20',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/AVO/AVO-EXPRESIVO?utm_source=CigarAficionado_June&utm_medium=OnlineBanner_AVO_EXPRESIVO_US_CigarAficionado&utm_campaign=AVO_Expresivo_2026_25_June&utm_id=AVO-EXPRESIVO-2026-06-US&utm_term=us-ecom&utm_content=banner_advertorial_us',
    headline: 'AVO Expresivo — Burn Brighter Celebration',
    formats: ['300x600 Half-Page', '300x250 Medium Rectangle', '728x90 Leaderboard', '320x50 Mobile'],
    notes: 'Dual-slot ROS flight driving e-commerce landing page discoverability.',
  },
  {
    id: 'june-26-avo-sponsored',
    label: 'June 26 · Sponsored Content (AVO Expresivo)',
    placementType: 'sponsored',
    bookedImps: 50_000,
    deliveredImps: 53_100,
    clicks: 584,
    cpmUsd: 12.0,
    launch: '2026-06-26',
    flightEnd: '2026-07-31',
    destinationUrl:
      'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line',
    headline: 'AVO Continues Burn Brighter Celebration with New EXPRESIVO Line',
    formats: ['Editorial Feature / Native Unit', 'Newsletter Native Block', 'Homepage Native Card'],
    notes: 'High-engagement editorial feature and native driver distribution across CA channels.',
  },
]

const TOTAL_BOOKED_IMPS = DAVIDOFF_2026_PLACEMENTS.reduce((sum, p) => sum + p.bookedImps, 0)
const TOTAL_DELIVERED_IMPS = DAVIDOFF_2026_PLACEMENTS.reduce((sum, p) => sum + p.deliveredImps, 0)
const TOTAL_CLICKS = DAVIDOFF_2026_PLACEMENTS.reduce((sum, p) => sum + p.clicks, 0)
const OVERALL_DELIVERY_PCT = (TOTAL_DELIVERED_IMPS / TOTAL_BOOKED_IMPS) * 100
const BLENDED_CTR_PCT = (TOTAL_CLICKS / TOTAL_DELIVERED_IMPS) * 100

const BILLING_PERIOD_ROWS: BillingPeriodRow[] = DAVIDOFF_2026_PLACEMENTS.map((p) => ({
  period: `${p.label.split('·')[0].trim()} Flight`,
  start: p.launch,
  end: p.flightEnd,
  spendUsd: (p.deliveredImps * p.cpmUsd) / 1000,
  impressions: p.deliveredImps,
  clicks: p.clicks,
  creativeLabel: p.label,
  placements: p.formats.join(' · '),
}))

const CREATIVE_TRAFFICKING_LOG: CreativeTraffickingEvent[] = [
  {
    date: '2026-04-18',
    action: 'launch',
    creativeName: 'Mid-April Pop-Ups (AVO & Puro)',
    headline: 'AVO Expresivo & Puro Dominicano Post-PCA Launch',
    destinationUrl: 'https://gtly.ink/gc_9inBBH2',
    placementsUpdated: 'High-impact interstitial overlay · Mobile overlay',
    notes: 'Trafficked 2-slot pop-up units post-PCA convention.',
  },
  {
    date: '2026-05-08',
    action: 'launch',
    creativeName: 'May 8 Sponsored Content (Puro Dominicano)',
    headline: 'Davidoff Black Band Collection: Puro Dominicano 2026',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_May...',
    placementsUpdated: 'Editorial feature native drivers · Newsletter module',
    notes: 'Editorial feature live with integrated native click-through drivers.',
  },
  {
    date: '2026-05-15',
    action: 'launch',
    creativeName: 'Mid-May ROS Display (AVO & Puro)',
    headline: 'Davidoff White Label & AVO Expresivo Brand Series',
    destinationUrl: 'https://gtly.ink/_-f6Ze8smH',
    placementsUpdated: 'ROS 300x250, 728x90, 300x600, 970x250',
    notes: 'Standard display ROS multi-unit flight.',
  },
  {
    date: '2026-06-01',
    action: 'refresh',
    creativeName: 'Publisher Tracking Architecture Update',
    headline: 'Cookiebot Consent Mode v2 & GTM Early Initialization',
    destinationUrl: 'https://www.cigaraficionado.com',
    placementsUpdated: 'Global cigaraficionado.com ad tag & redirect handlers',
    notes: 'Resolved script deferral to ensure complete query parameter pass-through.',
  },
  {
    date: '2026-06-17',
    action: 'launch',
    creativeName: 'June 17 Puro Dominicano ROS Banners',
    headline: 'Puro Dominicano 2026 — Limited Edition',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_June...',
    placementsUpdated: 'ROS 970x250, 300x600, 728x90, 300x250, 320x50',
    notes: 'Full banner suite launched supporting national release.',
  },
  {
    date: '2026-06-25',
    action: 'launch',
    creativeName: 'June 25 AVO Expresivo ROS Banners',
    headline: 'AVO Expresivo — Burn Brighter Celebration',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/AVO/AVO-EXPRESIVO?utm_source=CigarAficionado_June...',
    placementsUpdated: 'ROS 300x600, 300x250, 728x90, 320x50 (2 slots)',
    notes: 'Dual-slot ROS flight launched across desktop and mobile.',
  },
  {
    date: '2026-06-26',
    action: 'launch',
    creativeName: 'June 26 Sponsored Content (AVO Expresivo)',
    headline: 'AVO Continues Burn Brighter Celebration with New EXPRESIVO Line',
    destinationUrl:
      'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line',
    placementsUpdated: 'Editorial feature · Feed native card · Newsletter block',
    notes: 'Sponsored story live on CigarAficionado.com with full syndication.',
  },
  {
    date: '2026-07-10',
    action: 'launch',
    creativeName: 'July 10 WSC TLH Belicoso Banner A (Make-Good)',
    headline: 'Davidoff Winston Churchill The Late Hour Belicoso',
    destinationUrl:
      'https://us.davidoffgeneva.com/product/davidoff-winston-churchill-the-late-hour-series-belicoso?utm_source=CigarAficionado&utm_medium=banner&utm_campaign=WSC_TLH_Belicoso&utm_id=from-March-2026&utm_term=b2c-dav&utm_content=Banner_A',
    placementsUpdated: 'ROS 300x250, 728x90, 300x600 (Banner A creative)',
    notes: 'Verified make-good re-run live through August 12, 2026.',
  },
]

const LANDING_PAGE_INSIGHT: LandingPageInsight = {
  url: 'https://us.davidoffgeneva.com / cigaraficionado.com',
  headline: 'High qualified engagement across 2026 Davidoff & AVO destinations',
  pageViews: 418_520,
  uniqueVisitors: 284_900,
  avgTimeOnPageSec: 94,
  bounceRatePct: 41.2,
  pagesPerSession: 2.7,
  scrollDepth50Pct: 78.4,
  summary:
    'Full-portfolio cross-device traffic demonstrated strong dwell and low bounce across e-commerce product pages and editorial features. High repeat engagement observed across the AVO Expresivo and Puro Dominicano destinations.',
  topSections: [
    {
      section: 'AVO Expresivo Product & Cigar Details',
      engagementSharePct: 34,
      avgTimeOnSectionSec: 112,
      note: 'Highest dwell — strong product exploration',
    },
    {
      section: 'Puro Dominicano 2026 Black Band Collection',
      engagementSharePct: 30,
      avgTimeOnSectionSec: 98,
      note: 'High cross-line traffic from sponsored editorial',
    },
    {
      section: 'WSC The Late Hour Belicoso Purchase Page',
      engagementSharePct: 22,
      avgTimeOnSectionSec: 86,
      note: 'Direct e-commerce conversion path from Banner A',
    },
    {
      section: 'Cigar Aficionado Sponsored Feature Read-Throughs',
      engagementSharePct: 14,
      avgTimeOnSectionSec: 145,
      note: 'Strong editorial engagement and brand depth',
    },
  ],
}

const DAV_PRIMARY = ['New York', 'Miami', 'Los Angeles', 'Chicago'] as const
const DAV_SECONDARY = ['Dallas', 'Houston', 'Atlanta', 'Las Vegas', 'Boston'] as const
const DAV_GEO_PRIMARY = [0.26, 0.22, 0.19, 0.12] as const
const DAV_GEO_SECONDARY = [0.07, 0.05, 0.04, 0.03, 0.02] as const

const davidoffDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 62.0 },
  { device: 'Desktop', sharePct: 31.2 },
  { device: 'Tablet', sharePct: 6.8 },
]

const davidoffAudiences: AudienceBucket[] = [
  {
    id: 'davidoff-2026-suite',
    label: 'Davidoff 2026 Full Portfolio Reach',
    description:
      'High-net-worth cigar connoisseurs and luxury lifestyle enthusiasts reached across all 2026 Cigar Aficionado activations.',
    cohorts: [
      {
        title: 'AVO Brand Connoisseurs',
        detail:
          'Engaged readers targeted with AVO Expresivo pop-up, display, and editorial story integrations.',
      },
      {
        title: 'Davidoff Black Band & White Label Buyers',
        detail:
          'Aficionados reached across Puro Dominicano ROS display and bespoke sponsored content placements.',
      },
      {
        title: 'Winston Churchill Late Hour Series',
        detail:
          'Dedicated Late Hour Belicoso banner make-good delivery directly routing to b2c product checkout.',
      },
    ],
  },
]

function buildCreativeLines(): CampaignCreativeLine[] {
  return DAVIDOFF_2026_PLACEMENTS.map((p) => {
    const ctr = (p.clicks / p.deliveredImps) * 100
    const pctDel = (p.deliveredImps / p.bookedImps) * 100
    const segs: MonthlyDeliverySegment[] = [
      {
        start: p.launch,
        end: p.flightEnd,
        impressions: p.deliveredImps,
        clicks: p.clicks,
      },
    ]
    const meta: TradeDeskMeta = {
      reportGeneratedAt: REPORT_AS_OF,
      ioNumber: `DAVIDOFF-2026-${p.id.toUpperCase()}`,
      lineItem: p.label,
      dsp: 'Google Ad Manager (GAM)',
      supplyPath: 'CigarAficionado.com & Mobile Web',
      flightPlannedDays: daysInclusive(p.launch, p.flightEnd),
      lastDataDate: p.flightEnd,
      currency: 'USD',
    }
    const tradeDesk = {
      meta,
      daily: buildTradeDeskDailyFromMonthlySegments({
        segments: segs,
        impressionsBooked: p.bookedImps,
        flightPlannedDays: daysInclusive(p.launch, p.flightEnd),
      }),
      geoDelivery: buildGeoDelivery(
        p.deliveredImps,
        [...DAV_PRIMARY],
        [...DAV_SECONDARY],
        { primary: [...DAV_GEO_PRIMARY], secondary: [...DAV_GEO_SECONDARY] },
      ),
      formatDelivery: buildFormatDelivery(p.formats, p.deliveredImps),
      deviceSplit: davidoffDeviceSplit,
    }

    return {
      id: p.id,
      label: p.label,
      kind: p.placementType === 'sponsored' ? 'native' : 'display',
      delivery: {
        cpmUsd: p.cpmUsd,
        impressionsPurchased: p.bookedImps,
        pctDelivered: Math.round(pctDel * 10) / 10,
        deliveredImpressions: p.deliveredImps,
      },
      performance: {
        ctrPct: Math.round(ctr * 1000) / 1000,
        measurementNote: `${p.label} · ${p.deliveredImps.toLocaleString('en-US')} impressions delivered (${pctDel.toFixed(1)}% of ${p.bookedImps.toLocaleString('en-US')} booked) · ${p.clicks.toLocaleString('en-US')} clicks (${ctr.toFixed(2)}% CTR).`,
      },
      creative: {
        environments: `CigarAficionado.com — ${p.formats.join(', ')}`,
        sizes: p.formats,
        assetsFolderUrl: p.destinationUrl,
      },
      tracking: {
        description: `Creative: ${p.headline} · Destination: ${p.destinationUrl}`,
        clickthroughUrl: p.destinationUrl,
      },
      tradeDesk,
      overviewObjectiveSub: `Delivered ${p.deliveredImps.toLocaleString('en-US')} imps (${pctDel.toFixed(1)}% delivery) · ${p.clicks.toLocaleString('en-US')} clicks (${ctr.toFixed(2)}% CTR)`,
    }
  })
}

const CREATIVE_LINES = buildCreativeLines()

const COMPREHENSIVE_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2026-04-18', end: '2026-05-18', impressions: 258_450, clicks: 1_964 },
  { start: '2026-05-08', end: '2026-06-08', impressions: 52_400, clicks: 561 },
  { start: '2026-05-15', end: '2026-06-20', impressions: 412_680, clicks: 1_238 },
  { start: '2026-06-17', end: '2026-07-31', impressions: 206_850, clicks: 621 },
  { start: '2026-06-25', end: '2026-08-20', impressions: 259_110, clicks: 777 },
  { start: '2026-06-26', end: '2026-07-31', impressions: 53_100, clicks: 584 },
  { start: '2026-07-10', end: '2026-08-12', impressions: 156_220, clicks: 499 },
]

const metaComprehensive: TradeDeskMeta = {
  reportGeneratedAt: REPORT_AS_OF,
  ioNumber: 'DAVIDOFF-2026-CA-SUITE',
  lineItem: 'Davidoff 2026 Comprehensive Cigar Aficionado Suite',
  dsp: 'Google Ad Manager (GAM)',
  supplyPath: 'CigarAficionado.com Display, Pop-ups, Native & Sponsored Content',
  flightPlannedDays: daysInclusive(LAUNCH, FLIGHT_END),
  lastDataDate: FLIGHT_END,
  currency: 'USD',
}

const tradeDeskComprehensive = {
  meta: metaComprehensive,
  daily: buildTradeDeskDailyFromMonthlySegments({
    segments: COMPREHENSIVE_SEGMENTS,
    impressionsBooked: TOTAL_BOOKED_IMPS,
    flightPlannedDays: daysInclusive(LAUNCH, FLIGHT_END),
  }),
  geoDelivery: buildGeoDelivery(
    TOTAL_DELIVERED_IMPS,
    [...DAV_PRIMARY],
    [...DAV_SECONDARY],
    { primary: [...DAV_GEO_PRIMARY], secondary: [...DAV_GEO_SECONDARY] },
  ),
  formatDelivery: buildFormatDelivery(
    [
      'High-Impact Pop-up / Interstitial',
      '300x250 Medium Rectangle',
      '728x90 Leaderboard',
      '300x600 Half-Page',
      '970x250 Billboard',
      'Editorial Sponsored Content & Native',
    ],
    TOTAL_DELIVERED_IMPS,
    [0.185, 0.28, 0.22, 0.17, 0.07, 0.075],
  ),
  deviceSplit: davidoffDeviceSplit,
}

export const davidoff2026SuiteCampaign: CampaignReport = {
  id: 'davidoff_2026_comprehensive_suite',
  name: 'Davidoff × Cigar Aficionado — 2026 Comprehensive Campaign Suite',
  clientFacingName: 'Davidoff · 2026 Cigar Aficionado Portfolio Report',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Complete 2026 Campaign Suite (${LAUNCH} → ${FLIGHT_END}) · ${TOTAL_DELIVERED_IMPS.toLocaleString('en-US')} total impressions delivered across 7 placements (${OVERALL_DELIVERY_PCT.toFixed(1)}% of ${TOTAL_BOOKED_IMPS.toLocaleString('en-US')} booked) · ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (${BLENDED_CTR_PCT.toFixed(2)}% blended CTR).`,
  },
  delivery: {
    cpmUsd: 11.2,
    impressionsPurchased: TOTAL_BOOKED_IMPS,
    pctDelivered: Math.round(OVERALL_DELIVERY_PCT * 10) / 10,
    deliveredImpressions: TOTAL_DELIVERED_IMPS,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `Verified Google Ad Manager reporting across all 2026 Davidoff placements on CigarAficionado.com. ${TOTAL_DELIVERED_IMPS.toLocaleString('en-US')} delivered impressions vs. ${TOTAL_BOOKED_IMPS.toLocaleString('en-US')} contracted (${OVERALL_DELIVERY_PCT.toFixed(1)}% full delivery). Total clicks: ${TOTAL_CLICKS.toLocaleString('en-US')} (${BLENDED_CTR_PCT.toFixed(2)}% CTR).`,
  },
  geo: {
    headline:
      'National premium cigar enthusiast footprint — high engagement across top metro luxury markets.',
    primaryMarkets: [...DAV_PRIMARY],
    driveInMarkets: [...DAV_SECONDARY],
  },
  creative: {
    environments:
      'CigarAficionado.com — High-impact pop-ups, standard display ROS (300x250, 728x90, 300x600, 970x250), editorial sponsored content, and native units.',
    sizes: [
      'High-Impact Pop-up / Interstitial',
      '300x250 Medium Rectangle',
      '728x90 Leaderboard',
      '300x600 Half-Page',
      '970x250 Billboard',
      'Editorial Sponsored Content',
    ],
    assetsFolderUrl: 'https://us.davidoffgeneva.com',
  },
  tracking: {
    description:
      'Server-side Google Ad Manager impression and click measurement with complete UTM pass-through and Google Consent Mode v2 support.',
    clickthroughUrl: 'https://us.davidoffgeneva.com',
  },
  audiences: davidoffAudiences,
  billingPeriods: BILLING_PERIOD_ROWS,
  creativeTraffickingLog: CREATIVE_TRAFFICKING_LOG,
  landingPage: LANDING_PAGE_INSIGHT,
  creativeLines: CREATIVE_LINES,
  tradeDesk: tradeDeskComprehensive,
}
