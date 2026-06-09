/**
 * Internal QA fixture — synthetic campaign with non-round numbers for dashboard smoke tests.
 * Same shape and builders as Big Smoke Miami; not tied to a live client brief.
 *
 * Open `/reporting?campaign=random` (also `test` or `qa`).
 */

import type { AudienceBucket, CampaignReport } from './bigSmokeMiami'
import {
  buildDeviceSplit,
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDaily,
  daysInclusive,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2026-04-18'
const FLIGHT_END = '2026-06-30'
/** Snapshot date for daily grain — mid-flight internal test view. */
const REPORT_AS_OF = '2026-06-09'
const FLIGHT_PLANNED_DAYS = daysInclusive(LAUNCH, FLIGHT_END)

const IMPRESSIONS_BOOKED = 412_750
const PCT_DELIVERED = 73.6
const CPM_USD = 8.15
const CTR_PCT = 0.987

const qaFormats = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '300×300 mobile square',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
]

const qaAudienceBuckets: AudienceBucket[] = [
  {
    id: 'modeled',
    label: 'Modeled reach (QA)',
    description: 'Placeholder cohorts for internal dashboard QA — swap copy when testing layout changes.',
    cohorts: [
      {
        title: 'Segment A — Likely buyers',
        detail: 'Synthetic modeled audience; non-round scale weights for chart QA.',
      },
      {
        title: 'Segment B — Category intenders',
        detail: 'Secondary modeled layer with overlap controls enabled in the fixture only.',
      },
      {
        title: 'Segment C — Lookalike expansion',
        detail: 'Broadened reach tier for pacing and bubble-matrix stress tests.',
      },
    ],
  },
  {
    id: 'context',
    label: 'Context & retargeting (QA)',
    description: 'Fixture contextual and site-retargeting buckets.',
    cohorts: [
      {
        title: 'Publisher PMP — tier 1',
        detail: 'Brand-safe news and lifestyle inventory placeholder.',
      },
      {
        title: 'Open auction — long tail',
        detail: 'Fill and frequency-cap validation rows in export CSV.',
      },
      {
        title: 'Site retargeting — 30 day',
        detail: 'Policy-compliant retargeting stub for audience table layout.',
      },
    ],
  },
]

export const internalRandomFixtureCampaign: CampaignReport = {
  id: 'internal_random_qa_2026',
  name: 'Northlake Audio — Spring launch (QA fixture)',
  clientFacingName: 'Internal random test flight',
  flight: {
    launched: LAUNCH,
    inMarket: true,
    summary: `Synthetic ${FLIGHT_PLANNED_DAYS}-day book · snapshot through ${REPORT_AS_OF} · ${PCT_DELIVERED}% delivered.`,
  },
  delivery: {
    cpmUsd: CPM_USD,
    impressionsPurchased: IMPRESSIONS_BOOKED,
    pctDelivered: PCT_DELIVERED,
  },
  performance: {
    ctrPct: CTR_PCT,
    measurementNote:
      'Internal QA fixture only — numbers are simulated for dashboard, CSV export, and pacing chart tests. Not client-facing.',
  },
  geo: {
    headline: 'Synthetic DMA mix for geo table and map-style breakdown QA.',
    primaryMarkets: ['Boston', 'Philadelphia', 'Washington DC'],
    driveInMarkets: ['Providence', 'Baltimore', 'Richmond', 'Hartford'],
  },
  creative: {
    environments: 'Desktop and mobile; full standard IAB mix (fixture).',
    sizes: [...qaFormats],
    assetsFolderUrl: 'https://drive.google.com/drive/folders/placeholder-internal-qa-creative',
  },
  tracking: {
    description:
      'Fixture click path — routes to example.com with UTM stubs for trafficking QA.',
    clickthroughUrl:
      'https://example.com/northlake-audio-qa?utm_source=vrvo&utm_medium=display&utm_campaign=internal_random_qa_2026',
  },
  overviewObjectiveSub: 'Internal smoke test — awareness display with non-round book, CPM, and CTR.',
  audienceActivationMix: [
    { name: 'Modeled / scale', value: 47 },
    { name: 'Purchase / POS', value: 29 },
    { name: 'Contextual', value: 16 },
    { name: 'Retargeting', value: 8 },
  ],
  audiences: qaAudienceBuckets,
  tradeDesk: (() => {
    const deliveredImp = Math.round((IMPRESSIONS_BOOKED * PCT_DELIVERED) / 100)
    const meta: TradeDeskMeta = {
      reportGeneratedAt: `${REPORT_AS_OF}T18:42:00.000Z`,
      ioNumber: 'VRVO-IO-QA-RANDOM-2026',
      lineItem: 'Northlake Audio — Display QA fixture',
      dsp: 'Programmatic (fixture — open auction + PMP)',
      supplyPath: 'Synthetic SSP / publisher stack for internal testing',
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
        overallCtrPct: CTR_PCT,
        flightPlannedDays: FLIGHT_PLANNED_DAYS,
      }),
      geoDelivery: buildGeoDelivery(
        deliveredImp,
        ['Boston', 'Philadelphia', 'Washington DC'],
        ['Providence', 'Baltimore', 'Richmond', 'Hartford'],
      ),
      formatDelivery: buildFormatDelivery([...qaFormats], deliveredImp),
      deviceSplit: buildDeviceSplit(),
    }
  })(),
}
