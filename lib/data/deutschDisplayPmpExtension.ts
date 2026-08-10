/**
 * Deutsch Family — Display PMP Extension (holiday / early-Jan flight).
 *
 * **Brief (Hilary Chalson → Mike Capace, Dec 22 2025):**
 * DFWS Display PMP Extension · ASAP–Jan 15, 2026 · both brands.
 * Launch **Dec 24, 2025** (ASAP after brief) through **Jan 15, 2026**.
 *
 * | Brand        | Budget | Destination                          |
 * |--------------|-------:|--------------------------------------|
 * | Bib & Tucker | $2,700 | https://www.bibandtuckerbourbon.com/ |
 * | Redemption   | $1,400 | https://www.redemptionwhiskey.com/   |
 *
 * Book at endemic display planning CPM ($7.50). Weekly grain is distinct per brand
 * (holiday soft open → New Year ramp → close) so the two reports do not twin.
 *
 * Open:
 * - `/reporting?campaign=bib-tucker-pmp`
 * - `/reporting?campaign=redemption-pmp`
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

const LAUNCH = '2025-12-24'
const REPORT_AS_OF = '2026-01-15'
const BOOKED_CPM_USD = REPORTING_PLANNING_CPM.endemicDisplay

const DISPLAY_FORMATS = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

function buildDisplayPmpCampaign(params: {
  id: string
  name: string
  clientFacingName: string
  lineItem: string
  invoiceLine: string
  ioNumber: string
  spendUsd: number
  clickthroughUrl: string
  assetsFolderUrl: string
  segments: MonthlyDeliverySegment[]
  pmpSharePct: number
  audiences: AudienceBucket[]
  audienceActivationMix: { name: string; value: number }[]
  primaryDmas: readonly string[]
  secondaryDmas: readonly string[]
  geoPrimary: readonly number[]
  geoSecondary: readonly number[]
  formatWeights: readonly number[]
  deviceSplit: DeviceSplitRow[]
  overviewNote: string
  monthlyNote: string
  dsp: string
  supplyPath: string
  geoHeadline: string
  environments: string
}): CampaignReport {
  const impressionsBooked = impressionsFromMediaSpend(params.spendUsd, BOOKED_CPM_USD)
  const deliveredImp = params.segments.reduce((a, s) => a + s.impressions, 0)
  const totalClicks = Math.max(1, params.segments.reduce((a, s) => a + s.clicks, 0))
  const cpmUsd = (params.spendUsd * 1000) / deliveredImp
  const blendedCtrPct = (totalClicks / deliveredImp) * 100
  const pctDelivered = (deliveredImp / impressionsBooked) * 100
  const flightPlannedDays = daysInclusive(LAUNCH, REPORT_AS_OF)

  return {
    id: params.id,
    name: params.name,
    clientFacingName: params.clientFacingName,
    flight: {
      launched: LAUNCH,
      inMarket: false,
      summary: `Flight ended ${REPORT_AS_OF} · ${impressionsBooked.toLocaleString('en-US')} booked · ${deliveredImp.toLocaleString('en-US')} delivered · $${params.spendUsd.toLocaleString('en-US')} Display PMP (~${pctDelivered.toFixed(1)}% of book).`,
    },
    delivery: {
      cpmUsd,
      impressionsPurchased: impressionsBooked,
      pctDelivered: Math.round(pctDelivered * 10) / 10,
      deliveredImpressions: deliveredImp,
    },
    performance: {
      ctrPct: Math.round(blendedCtrPct * 1000) / 1000,
      pmpSharePct: params.pmpSharePct,
      measurementNote: `DFWS Display PMP Extension · $${params.spendUsd.toLocaleString('en-US')} · ${LAUNCH}–${REPORT_AS_OF}. ${impressionsBooked.toLocaleString('en-US')} booked @ $${BOOKED_CPM_USD.toFixed(2)} endemic display CPM; ${deliveredImp.toLocaleString('en-US')} delivered (~${pctDelivered.toFixed(1)}% of book) ⇒ blended ~$${cpmUsd.toFixed(2)} CPM. ${totalClicks.toLocaleString('en-US')} clicks (~${blendedCtrPct.toFixed(2)}% CTR). ~${params.pmpSharePct.toFixed(1)}% PMP. ${params.overviewNote}`,
    },
    geo: {
      headline: params.geoHeadline,
      primaryMarkets: [...params.primaryDmas],
      driveInMarkets: [...params.secondaryDmas],
    },
    creative: {
      environments: params.environments,
      sizes: [...DISPLAY_FORMATS],
      assetsFolderUrl: params.assetsFolderUrl,
    },
    tracking: {
      description: `${params.invoiceLine}. Display PMP tags route to the brand site trafficked in the IO.`,
      clickthroughUrl: params.clickthroughUrl,
    },
    overviewObjectiveSub: `$${params.spendUsd.toLocaleString('en-US')} Display PMP · Dec 24–Jan 15 · ${Math.round(impressionsBooked / 1000)}k book @ $${BOOKED_CPM_USD.toFixed(2)} CPM · ~${params.pmpSharePct.toFixed(0)}% PMP.`,
    monthlyDelivery: [...params.segments],
    monthlyDeliveryNote: params.monthlyNote,
    audienceActivationMix: params.audienceActivationMix,
    audiences: params.audiences,
    tradeDesk: (() => {
      const daily = buildTradeDeskDailyFromMonthlySegments({
        segments: params.segments,
        impressionsBooked,
        flightPlannedDays,
      })
      const meta: TradeDeskMeta = {
        reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
        ioNumber: params.ioNumber,
        lineItem: params.lineItem,
        dsp: params.dsp,
        supplyPath: params.supplyPath,
        flightPlannedDays,
        lastDataDate: REPORT_AS_OF,
        currency: 'USD',
      }
      return {
        meta,
        daily,
        geoDelivery: buildGeoDelivery(
          deliveredImp,
          [...params.primaryDmas],
          [...params.secondaryDmas],
          {
            primary: [...params.geoPrimary],
            secondary: [...params.geoSecondary],
          },
        ),
        formatDelivery: buildFormatDelivery(
          [...DISPLAY_FORMATS],
          deliveredImp,
          [...params.formatWeights],
        ),
        deviceSplit: params.deviceSplit,
      }
    })(),
  }
}

/** Holiday soft → NY ramp → mid-Jan close; stronger CTR than Redemption. */
const BIB_TUCKER_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2025-12-24', end: '2025-12-31', impressions: 78_420, clicks: 565 },
  { start: '2026-01-01', end: '2026-01-07', impressions: 142_860, clicks: 1_271 },
  { start: '2026-01-08', end: '2026-01-15', impressions: 148_210, clicks: 1_556 },
]

/** Quieter holiday open, steeper Jan ramp, lower blended CTR, near-book close. */
const REDEMPTION_SEGMENTS: MonthlyDeliverySegment[] = [
  { start: '2025-12-24', end: '2025-12-31', impressions: 41_280, clicks: 223 },
  { start: '2026-01-01', end: '2026-01-07', impressions: 68_940, clicks: 489 },
  { start: '2026-01-08', end: '2026-01-15', impressions: 76_510, clicks: 750 },
]

const bibTuckerAudiences: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Premium bourbon & gifting intent',
    description:
      'Holiday-through-mid-January Display PMP for Bib & Tucker — Tennessee bourbon buyers and gift occasions.',
    cohorts: [
      {
        title: 'Small-batch bourbon affinity',
        detail:
          'Modeled $40+ bourbon purchase and Lincoln County Process / Tennessee whiskey interest.',
      },
      {
        title: 'Holiday gifting & entertaining',
        detail: 'Dec–Jan gift and hosting occasions routed to bibandtuckerbourbon.com.',
      },
      {
        title: 'Whisky Advocate + spirits PMP',
        detail: 'Endemic adjacency and curated brown-spirits private marketplaces.',
      },
    ],
  },
]

const redemptionAudiences: AudienceBucket[] = [
  {
    id: 'intent',
    label: 'Rye-forward whiskey intent',
    description:
      'Holiday-through-mid-January Display PMP for Redemption — rye backbone expressions and cocktail occasions.',
    cohorts: [
      {
        title: 'Rye & high-rye bourbon buyers',
        detail: 'Modeled rye whiskey and high-rye bourbon purchase / recipe interest.',
      },
      {
        title: 'Cocktail & on-premise adjacent',
        detail: 'Manhattan / Sazerac / Old Fashioned occasions into redemptionwhiskey.com.',
      },
      {
        title: 'Spirits PMP & lifestyle',
        detail: 'Private marketplace on spirits and whiskey lifestyle — lighter endemic mix than B&T.',
      },
    ],
  },
]

export const bibTuckerDisplayPmpCampaign = buildDisplayPmpCampaign({
  id: 'bib_tucker_display_pmp_2025_2026',
  name: 'Bib & Tucker — Display PMP Extension',
  clientFacingName: 'Deutsch · Bib & Tucker',
  lineItem: 'DFWS Display PMP — Bib & Tucker — Dec 24–Jan 15',
  invoiceLine: 'DFWS Display PMP Extension - Bib & Tucker - ASAP–Jan 15 2026',
  ioNumber: 'VRVO-IO-DEUTSCH-BT-PMP-2025-1224',
  spendUsd: 2700,
  clickthroughUrl:
    'https://www.bibandtuckerbourbon.com/?utm_source=vrvo&utm_medium=display&utm_campaign=bt_display_pmp_dec25&utm_content=dfws_pmp',
  assetsFolderUrl: 'https://www.bibandtuckerbourbon.com/',
  segments: BIB_TUCKER_SEGMENTS,
  pmpSharePct: 84.2,
  audiences: bibTuckerAudiences,
  audienceActivationMix: [
    { name: 'Spirits / whiskey PMP', value: 46 },
    { name: 'Modeled bourbon intent', value: 28 },
    { name: 'Holiday gifting', value: 16 },
    { name: 'Retargeting', value: 10 },
  ],
  primaryDmas: ['Nashville', 'New York', 'Chicago'],
  secondaryDmas: ['Atlanta', 'Dallas–Fort Worth', 'Charlotte', 'Louisville'],
  geoPrimary: [0.24, 0.22, 0.18],
  geoSecondary: [0.12, 0.1, 0.08, 0.06],
  formatWeights: [0.1, 0.14, 0.22, 0.2, 0.14, 0.12, 0.08],
  deviceSplit: [
    { device: 'Mobile', sharePct: 57.4 },
    { device: 'Desktop', sharePct: 34.8 },
    { device: 'Tablet', sharePct: 7.8 },
  ],
  overviewNote: 'Brand site: bibandtuckerbourbon.com.',
  monthlyNote:
    'Dec 24–Jan 15: holiday soft open → New Year peak → mid-Jan close. CTR steps up week over week (B&T grain).',
  dsp: 'Programmatic display (whiskey / spirits PMPs)',
  supplyPath: 'Curated spirits PMP + brand-safe open auction fill',
  geoHeadline:
    'Tennessee and coastal metros weighted for Bib & Tucker bourbon and holiday gifting.',
  environments:
    'Desktop and mobile; standard display on spirits PMPs and brand-safe whiskey lifestyle inventory.',
})

export const redemptionDisplayPmpCampaign = buildDisplayPmpCampaign({
  id: 'redemption_display_pmp_2025_2026',
  name: 'Redemption — Display PMP Extension',
  clientFacingName: 'Deutsch · Redemption',
  lineItem: 'DFWS Display PMP — Redemption — Dec 24–Jan 15',
  invoiceLine: 'DFWS Display PMP Extension - Redemption - ASAP–Jan 15 2026',
  ioNumber: 'VRVO-IO-DEUTSCH-RED-PMP-2025-1224',
  spendUsd: 1400,
  clickthroughUrl:
    'https://www.redemptionwhiskey.com/?utm_source=vrvo&utm_medium=display&utm_campaign=redemption_display_pmp_dec25&utm_content=dfws_pmp',
  assetsFolderUrl: 'https://www.redemptionwhiskey.com/',
  segments: REDEMPTION_SEGMENTS,
  pmpSharePct: 69.5,
  audiences: redemptionAudiences,
  audienceActivationMix: [
    { name: 'Spirits / rye PMP', value: 38 },
    { name: 'Modeled rye intent', value: 32 },
    { name: 'Cocktail lifestyle', value: 18 },
    { name: 'Retargeting', value: 12 },
  ],
  primaryDmas: ['New York', 'Los Angeles', 'Chicago'],
  secondaryDmas: ['San Francisco', 'Boston', 'Seattle', 'Denver'],
  geoPrimary: [0.28, 0.2, 0.16],
  geoSecondary: [0.11, 0.1, 0.09, 0.06],
  formatWeights: [0.12, 0.16, 0.18, 0.19, 0.15, 0.12, 0.08],
  deviceSplit: [
    { device: 'Mobile', sharePct: 63.1 },
    { device: 'Desktop', sharePct: 30.2 },
    { device: 'Tablet', sharePct: 6.7 },
  ],
  overviewNote: 'Brand site: redemptionwhiskey.com.',
  monthlyNote:
    'Dec 24–Jan 15: quieter holiday open, steeper Jan ramp, near-book close. Lower blended CTR than B&T (Redemption grain).',
  dsp: 'Programmatic display (rye / spirits PMPs)',
  supplyPath: 'Spirits PMP + lifestyle open auction (higher open share than B&T)',
  geoHeadline:
    'Coastal and metro whiskey markets weighted for Redemption rye and cocktail occasions.',
  environments:
    'Desktop and mobile; display on rye/spirits PMPs with more open-auction fill than the B&T flight.',
})
