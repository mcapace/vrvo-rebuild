/**
 * Sample campaign: Big Smoke Miami digital extension — benchmark for dashboard development & QA.
 * Source: internal campaign brief / stakeholder email (May 2026).
 */

import {
  buildDeviceSplit,
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDaily,
  type DeviceSplitRow,
  type FormatDeliveryRow,
  type GeoDeliveryRow,
  type MonthlyDeliverySegment,
  type TradeDeskDailyRow,
  type TradeDeskMeta,
} from './tradeDeskSeries'

export interface AudienceCohort {
  title: string
  detail: string
}

export interface AudienceBucket {
  id: string
  label: string
  description: string
  cohorts: AudienceCohort[]
}

export interface CampaignTradeDesk {
  meta: TradeDeskMeta
  daily: TradeDeskDailyRow[]
  geoDelivery: GeoDeliveryRow[]
  formatDelivery: FormatDeliveryRow[]
  deviceSplit: DeviceSplitRow[]
}

/**
 * Optional creative / product line within one IO (e.g. Native vs Pre-roll).
 * When present, the dashboard shows tabs so each line’s delivery can be reviewed separately.
 */
export interface CampaignCreativeLine {
  id: string
  label: string
  kind: 'native' | 'preroll' | 'display' | 'video' | 'other'
  delivery: CampaignReport['delivery']
  performance: CampaignReport['performance']
  monthlyDelivery?: MonthlyDeliverySegment[]
  monthlyDeliveryNote?: string
  creative: CampaignReport['creative']
  tracking: CampaignReport['tracking'] & {
    /** Optional 1×1 / tourism pixel URL for this line. */
    pixelUrl?: string
  }
  tradeDesk: CampaignTradeDesk
  overviewObjectiveSub?: string
}

export interface CampaignReport {
  id: string
  name: string
  clientFacingName: string
  flight: {
    launched: string
    inMarket: boolean
    summary: string
    /** IO booked but trafficking / flight dates not set — delivery has not started. */
    prebookedPending?: boolean
    /** Invoice or planning window while exact flight dates are TBD (e.g. “May/June 2026”). */
    scheduledWindow?: string
  }
  delivery: {
    cpmUsd: number
    impressionsPurchased: number
    pctDelivered: number
    /**
     * When set, dashboards and CSV exports use this exact delivered count instead of
     * `impressionsPurchased × pctDelivered / 100` (avoids rounding drift vs monthly grain).
     */
    deliveredImpressions?: number
  }
  performance: {
    ctrPct: number
    measurementNote: string
    /**
     * Optional video completion rate % (pre-roll / video). Display-only — does not
     * change delivered impressions, clicks, or spend.
     */
    vcrPct?: number
    /**
     * Optional share of delivered impressions on PMP / private marketplace.
     * Display-only quality / supply signal.
     */
    pmpSharePct?: number
  }
  geo: {
    headline: string
    primaryMarkets: string[]
    driveInMarkets: string[]
  }
  creative: {
    environments: string
    sizes: string[]
    assetsFolderUrl: string
  }
  tracking: {
    description: string
    clickthroughUrl: string
  }
  /** Subcopy under the Objectives overview card (per-campaign voice; dashboard default is generic). */
  overviewObjectiveSub?: string
  /**
   * Optional “data activation” pie for the Audience overview card.
   * When omitted, the dashboard uses the default modeled / purchase / contextual split.
   */
  audienceActivationMix?: { name: string; value: number }[]
  /**
   * Optional calendar-month delivery (partner or reconciled grain). When present, the
   * dashboard renders a “Monthly delivery” section and the CSV includes a matching block.
   */
  monthlyDelivery?: MonthlyDeliverySegment[]
  /** Footnote for the monthly table (e.g. which months are actuals vs estimate). */
  monthlyDeliveryNote?: string
  /**
   * When set, dashboard shows Combined / per-line tabs (e.g. Native vs Pre-roll).
   * Parent `delivery` / `tradeDesk` remain the combined roll-up.
   */
  creativeLines?: CampaignCreativeLine[]
  audiences: AudienceBucket[]
  tradeDesk: CampaignTradeDesk
}

/**
 * Reference audience cohorts (Big Smoke Miami brief) — optional depth when building planning orders;
 * the benchmark campaign below uses the same structure.
 */
export const bigSmokeReferenceAudienceBuckets: AudienceBucket[] = [
    {
      id: 'core',
      label: 'Core cigar enthusiast cohorts',
      description: 'Bulk of delivery — modeled, purchase, and interest layers.',
      cohorts: [
        {
          title: 'Epsilon — Cigar & Pipe Enthusiasts',
          detail:
            'Highly Likely and Likely modeled audiences; weekly cigar/pipe use. Strong scale (100M+ combined potential impressions). Baseline reach.',
        },
        {
          title: 'Attain — Cigar & Pipe Enthusiasts & Cigar Smokers',
          detail:
            'Highly Likely, Likely, and Cigar Smokers purchase-based intent; complements Epsilon modeled data.',
        },
        {
          title: 'Skydeo & Asterisks.com — Cigar Smokers',
          detail: 'Interest-based cohorts; broaden top of funnel with limited overlap with modeled sets.',
        },
        {
          title: 'Data Alliance — Cigar Smokers & Tobacco User',
          detail:
            'Tobacco User segment is location-validated (visits to tobacco/cigar shops) — strong signal at smaller scale.',
        },
        {
          title: 'Semasio — Cigars cluster',
          detail:
            'Contextual/keyword: cigar smoking & lounges, Cuban cigars, hand-rolled, cutters & lighters, humidors, ashtrays — accessory and lifestyle intent.',
        },
      ],
    },
    {
      id: 'lifestyle',
      label: 'Lifestyle & collector cohorts',
      description: 'Quality and retargetable depth; premium and deterministic signals.',
      cohorts: [
        {
          title: 'Adttribution — Cigar Aficionados',
          detail: 'Upscale skew; fine cigars and lounges — aligns with Big Smoke audience profile.',
        },
        {
          title: '4-Eyes.ai — Colibri & Imperial Brands PLC',
          detail:
            'AI-modeled brand-intent (lighters, cutters, accessories; Davidoff parent). Indexes toward premium buyers.',
        },
        {
          title: 'Verisk Connex clusters',
          detail: 'Geo/demo clusters with cigar habits in household profiles — regional footprint outside major metros.',
        },
        {
          title: 'Moneris — Top Tier Buyers, Cigar Stores and Stands',
          detail: 'Small scale, high quality — deterministic POS cigar shop buyers.',
        },
        {
          title: 'Alesco CPG — Cigar City hard seltzer buyers',
          detail: 'Brand overlap; indexes toward cigar-curious lifestyle buyers.',
        },
        {
          title: 'Gravy — Tobacco User',
          detail: 'Location-based visits to tobacco/cigar shops — complements Moneris foot traffic.',
        },
      ],
    },
  ]

const LAUNCH = '2026-03-27'
/** As-of date for daily grain (matches stakeholder “still in market” snapshot). */
const REPORT_AS_OF = '2026-05-01'
const FLIGHT_PLANNED_DAYS = 41

export const bigSmokeMiamiCampaign: CampaignReport = {
  id: 'big_smoke_miami_2026',
  name: 'Big Smoke Miami — Digital Extension',
  clientFacingName: 'Big Smoke Miami digital extension',
  flight: {
    launched: LAUNCH,
    inMarket: true,
    summary: 'Launched March 27; still in market.',
  },
  delivery: {
    cpmUsd: 7,
    impressionsPurchased: 357_000,
    pctDelivered: 89,
  },
  performance: {
    ctrPct: 1.024,
    measurementNote:
      'Campaign measures clickthrough, not on-site conversion — no post-click conversion data.',
  },
  geo: {
    headline: 'South Florida core + historical Big Smoke drive-in markets',
    primaryMarkets: ['Miami-Dade', 'Broward', 'Palm Beach'],
    driveInMarkets: ['Tampa', 'Orlando', 'Naples / Fort Myers', 'Jacksonville'],
  },
  creative: {
    environments: 'Desktop and mobile; full IAB size coverage.',
    sizes: [
      '970×250 billboard',
      '728×90 leaderboard',
      '300×600 half-page',
      '300×250 medium rectangle',
      '300×300 mobile square',
      '320×100 large mobile banner',
      '320×50 mobile banner',
      '160×600 wide skyscraper',
    ],
    assetsFolderUrl:
      'https://drive.google.com/drive/folders/1x3DaJGM0RWAVpus5Qz-dsi6lbnpGO8Xr?usp=sharing',
  },
  tracking: {
    description:
      'All creative routes to the Tixr event page so users land on ticket purchase, not the marketing site.',
    clickthroughUrl:
      'https://www.tixr.com/groups/cabigsmoke/events/big-smoke-florida-175821?utm_source=vrvo&utm_medium=display&utm_campaign=big_smoke_miami_2026&utm_content=digital_extension',
  },
  overviewObjectiveSub: 'Awareness + ticket-path display extension.',
  audiences: bigSmokeReferenceAudienceBuckets,
  tradeDesk: (() => {
    const deliveredImp = Math.round((357_000 * 89) / 100)
    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T23:59:00.000Z`,
      ioNumber: 'VRVO-IO-BSM-2026-Q2',
      lineItem: 'Big Smoke Miami — Display Extension',
      dsp: 'Programmatic (open auction + PMP)',
      supplyPath: 'Direct publisher / SSP aggregated',
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
      lastDataDate: REPORT_AS_OF,
      currency: 'USD',
    }
    return {
      meta,
      daily: buildTradeDeskDaily({
        launchDate: LAUNCH,
        lastDate: REPORT_AS_OF,
        impressionsBooked: 357_000,
        pctDelivered: 89,
        overallCtrPct: 1.024,
        flightPlannedDays: FLIGHT_PLANNED_DAYS,
      }),
      geoDelivery: buildGeoDelivery(
        deliveredImp,
        ['Miami-Dade', 'Broward', 'Palm Beach'],
        ['Tampa', 'Orlando', 'Naples / Fort Myers', 'Jacksonville'],
      ),
      formatDelivery: buildFormatDelivery(
        [
          '970×250 billboard',
          '728×90 leaderboard',
          '300×600 half-page',
          '300×250 medium rectangle',
          '300×300 mobile square',
          '320×100 large mobile banner',
          '320×50 mobile banner',
          '160×600 wide skyscraper',
        ],
        deliveredImp,
      ),
      deviceSplit: buildDeviceSplit(),
    }
  })(),
}
