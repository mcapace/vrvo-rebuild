/**
 * Fixture: Big Smoke Miami digital extension — for dashboard development & QA.
 * Source: internal campaign brief / stakeholder email (May 2026).
 */

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

export interface CampaignReport {
  id: string
  name: string
  clientFacingName: string
  flight: {
    launched: string
    inMarket: boolean
    summary: string
  }
  delivery: {
    cpmUsd: number
    impressionsPurchased: number
    pctDelivered: number
  }
  performance: {
    ctrPct: number
    measurementNote: string
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
  audiences: AudienceBucket[]
}

export const bigSmokeMiamiCampaign: CampaignReport = {
  id: 'big_smoke_miami_2026',
  name: 'Big Smoke Miami — Digital Extension',
  clientFacingName: 'Big Smoke Miami digital extension',
  flight: {
    launched: '2026-03-27',
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
  audiences: [
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
  ],
}
