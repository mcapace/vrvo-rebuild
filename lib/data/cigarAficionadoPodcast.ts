/**
 * Cigar Aficionado podcast native extension — order **3G7VIWLL-7284**.
 *
 * **Flight:** May 13 – Jul 13, 2026 · **prebooked** native inventory on podcast + digital.
 * Open `/reporting?campaign=cigar-aficionado` (aliases: `cigar`, `ca-podcast`, `3g7viwill-7284`).
 */

import type { AudienceBucket, CampaignReport, CampaignTradeDesk } from './bigSmokeMiami'
import {
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDaily,
  daysInclusive,
  type DeviceSplitRow,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2026-05-13'
const FLIGHT_END = '2026-07-13'
const REPORT_AS_OF = '2026-06-15'
const ORDER_ID = '3G7VIWLL-7284'
const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, FLIGHT_END)

const IMPRESSIONS_BOOKED = 200_000
const PCT_DELIVERED = 57

const NATIVE_FORMATS = [
  'Podcast feed native (mid-roll adjacency)',
  'Episode page native unit',
  'Mobile web article native',
  'Desktop article embed',
  'Newsletter native placement',
]

const podcastDeviceSplit: DeviceSplitRow[] = [
  { device: 'Mobile', sharePct: 71.5 },
  { device: 'Desktop', sharePct: 24.3 },
  { device: 'Tablet', sharePct: 4.2 },
]

const podcastAudienceBuckets: AudienceBucket[] = [
  {
    id: 'podcast',
    label: 'Podcast & audio-native reach',
    description: 'Prebooked segments aligned to Cigar Aficionado podcast listeners.',
    cohorts: [
      {
        title: 'Cigar Aficionado podcast subscribers',
        detail: 'Core listener base — in-app and feed-native placements on episodic content.',
      },
      {
        title: 'Mid-roll adjacency native',
        detail: 'Guaranteed native cards adjacent to host-read segments; high viewability in podcast apps.',
      },
      {
        title: 'Episode archive listeners',
        detail: 'Back-catalog episodes — extended tail on prebooked inventory.',
      },
    ],
  },
  {
    id: 'digital',
    label: 'Cigar Aficionado digital extension',
    description: 'Site and newsletter native to complement podcast flight.',
    cohorts: [
      {
        title: 'CigarAficionado.com article native',
        detail: 'Contextual native units on editorial cigar lifestyle content.',
      },
      {
        title: 'Newsletter native placement',
        detail: 'Dedicated native block in subscriber newsletter sends during flight window.',
      },
      {
        title: 'Retargeting — podcast site visitors',
        detail: 'Visitors from podcast CTAs — sequential native messaging on digital properties.',
      },
      {
        title: 'Epsilon — Cigar & Pipe Enthusiasts',
        detail: 'Modeled cigar enthusiast layer for audience extension on native inventory.',
      },
    ],
  },
]

function buildTradeDeskBundle(): CampaignTradeDesk {
  const deliveredImp = Math.round((IMPRESSIONS_BOOKED * PCT_DELIVERED) / 100)
  const meta: TradeDeskMeta = {
    reportGeneratedAt: `${REPORT_AS_OF}T12:00:00.000Z`,
    ioNumber: ORDER_ID,
    lineItem: 'Cigar Aficionado Podcast — Native Extension',
    dsp: 'Direct publisher (prebooked)',
    supplyPath: 'Cigar Aficionado podcast + digital — guaranteed native',
    flightPlannedDays: FLIGHT_PLANNED_DAYS,
    lastDataDate: REPORT_AS_OF,
    currency: 'USD',
  }
  return {
    meta,
    daily: buildTradeDeskDaily({
      launchDate: LAUNCH,
      lastDate: REPORT_AS_OF,
      impressionsBooked: IMPRESSIONS_BOOKED,
      pctDelivered: PCT_DELIVERED,
      overallCtrPct: 1.12,
      flightPlannedDays: FLIGHT_PLANNED_DAYS,
    }),
    geoDelivery: buildGeoDelivery(
      deliveredImp,
      ['New York', 'Los Angeles', 'Miami-Dade'],
      ['Chicago', 'Dallas', 'Atlanta', 'Houston'],
    ),
    formatDelivery: buildFormatDelivery(NATIVE_FORMATS, deliveredImp),
    deviceSplit: podcastDeviceSplit,
  }
}

export const cigarAficionadoPodcastCampaign: CampaignReport = {
  id: 'cigar_aficionado_podcast_native_2026',
  name: 'Cigar Aficionado Podcast — Native Extension',
  clientFacingName: 'Cigar Aficionado podcast native extension',
  flight: {
    launched: LAUNCH,
    inMarket: true,
    summary: 'Launched May 13; in market through July 13 — prebooked native inventory on podcast and digital.',
  },
  delivery: {
    cpmUsd: 18,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
  },
  performance: {
    ctrPct: 1.12,
    measurementNote:
      'Native podcast extension — clickthrough to sponsor destination; no post-click conversion or listen-through attribution in this view.',
  },
  geo: {
    headline: 'National cigar enthusiast footprint — weighted to major metro listeners',
    primaryMarkets: ['New York', 'Los Angeles', 'Miami-Dade'],
    driveInMarkets: ['Chicago', 'Dallas', 'Atlanta', 'Houston'],
  },
  creative: {
    environments:
      'Podcast app feeds, Cigar Aficionado mobile web, and newsletter — native units only (no display banners).',
    sizes: [
      'Podcast feed native card',
      'Episode page native unit',
      'Mobile article native',
      'Desktop article embed',
      'Newsletter native block',
    ],
    assetsFolderUrl: 'https://www.cigaraficionado.com/',
  },
  tracking: {
    description:
      'Native units route to the Cigar Aficionado sponsor landing experience — tracked via click-through on native placements.',
    clickthroughUrl:
      'https://www.cigaraficionado.com/?utm_source=vrvo&utm_medium=native&utm_campaign=cigar_aficionado_podcast_native&utm_content=podcast_extension',
  },
  overviewObjectiveSub:
    `${Math.round(IMPRESSIONS_BOOKED / 1000)}k prebooked native book · order ${ORDER_ID} · May 13–Jul 13 flight.`,
  audienceActivationMix: [
    { name: 'Podcast native', value: 48 },
    { name: 'Digital site native', value: 32 },
    { name: 'Newsletter native', value: 20 },
  ],
  audiences: podcastAudienceBuckets,
  tradeDesk: buildTradeDeskBundle(),
}
