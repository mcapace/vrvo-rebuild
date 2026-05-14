import type { CampaignReport } from '@/lib/data/bigSmokeMiami'
import {
  buildDeviceSplit,
  buildFormatDelivery,
  buildGeoDelivery,
  buildTradeDeskDaily,
  daysInclusive,
} from '@/lib/data/tradeDeskSeries'

/** Default IAB mix for scenario previews (matches Big Smoke fixture set). */
export const SCENARIO_DEFAULT_FORMATS = [
  '970×250 billboard',
  '728×90 leaderboard',
  '300×600 half-page',
  '300×250 medium rectangle',
  '300×300 mobile square',
  '320×100 large mobile banner',
  '320×50 mobile banner',
  '160×600 wide skyscraper',
] as const

export type ScenarioPlannerInput = {
  /** Advertiser / account label (Trade Desk–style). */
  accountName: string
  ioNumber: string
  lineItemName: string
  impressionsBooked: number
  cpmUsd: number
  flightStart: string
  flightEnd: string
  /** Last day included in the synthetic daily grain (inclusive). Defaults to `flightEnd`. */
  asOfDate?: string
  /** Target blended CTR for the simulated flight (percent, e.g. 1.05). */
  targetCtrPct: number
  targetingNotes: string
  /** Optional supply / inventory note (PMP, open auction, etc.). */
  supplyPath?: string
  /**
   * Override % of booked impressions treated as delivered by `asOfDate`.
   * When omitted, delivery follows calendar progress: elapsed days ÷ full flight days (capped at 100%).
   */
  pctDeliveredOverride?: number | null
}

export type ScenarioValidationIssue = { field: string; message: string }

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function parseUtcDate(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

export function validateScenarioInput(raw: ScenarioPlannerInput): ScenarioValidationIssue[] {
  const issues: ScenarioValidationIssue[] = []
  const acc = raw.accountName?.trim() ?? ''
  if (!acc) issues.push({ field: 'accountName', message: 'Enter an account or advertiser name.' })
  if (!raw.lineItemName?.trim()) issues.push({ field: 'lineItemName', message: 'Enter a line item name.' })

  if (!ISO_DATE.test(raw.flightStart)) issues.push({ field: 'flightStart', message: 'Flight start must be YYYY-MM-DD.' })
  if (!ISO_DATE.test(raw.flightEnd)) issues.push({ field: 'flightEnd', message: 'Flight end must be YYYY-MM-DD.' })

  if (ISO_DATE.test(raw.flightStart) && ISO_DATE.test(raw.flightEnd)) {
    if (parseUtcDate(raw.flightEnd) < parseUtcDate(raw.flightStart)) {
      issues.push({ field: 'flightEnd', message: 'Flight end must be on or after flight start.' })
    }
  }

  const asOf = raw.asOfDate?.trim() || raw.flightEnd
  if (raw.asOfDate?.trim() && !ISO_DATE.test(asOf)) {
    issues.push({ field: 'asOfDate', message: 'As-of date must be YYYY-MM-DD.' })
  } else if (ISO_DATE.test(raw.flightStart) && ISO_DATE.test(asOf)) {
    if (parseUtcDate(asOf) < parseUtcDate(raw.flightStart)) {
      issues.push({ field: 'asOfDate', message: 'As-of date cannot be before flight start.' })
    }
    if (ISO_DATE.test(raw.flightEnd) && parseUtcDate(asOf) > parseUtcDate(raw.flightEnd)) {
      issues.push({ field: 'asOfDate', message: 'As-of date cannot be after flight end.' })
    }
  }

  if (!Number.isFinite(raw.impressionsBooked) || raw.impressionsBooked < 1_000) {
    issues.push({ field: 'impressionsBooked', message: 'Booked impressions must be at least 1,000.' })
  }
  if (raw.impressionsBooked > 500_000_000) {
    issues.push({ field: 'impressionsBooked', message: 'Booked impressions cap (500M) for this lab preview.' })
  }

  if (!Number.isFinite(raw.cpmUsd) || raw.cpmUsd < 0.5 || raw.cpmUsd > 250) {
    issues.push({ field: 'cpmUsd', message: 'CPM must be between $0.50 and $250.' })
  }

  if (!Number.isFinite(raw.targetCtrPct) || raw.targetCtrPct < 0.05 || raw.targetCtrPct > 15) {
    issues.push({ field: 'targetCtrPct', message: 'Target CTR must be between 0.05% and 15%.' })
  }

  const o = raw.pctDeliveredOverride
  if (o != null && o !== undefined && Number.isFinite(o) && (o < 1 || o > 100)) {
    issues.push({ field: 'pctDeliveredOverride', message: 'Delivery override must be between 1 and 100%.' })
  }

  return issues
}

/**
 * Builds a full `CampaignReport` compatible with `CampaignDashboard` + CSV export.
 * Synthetic daily grain uses the same mechanics as the Big Smoke fixture (weekend weighting, pacing vs linear plan).
 */
export function buildScenarioCampaignReport(input: ScenarioPlannerInput): CampaignReport {
  const issues = validateScenarioInput(input)
  if (issues.length) {
    throw new Error(issues.map((i) => i.message).join(' '))
  }

  const flightStart = input.flightStart.trim()
  const flightEnd = input.flightEnd.trim()
  const asOfRaw = input.asOfDate?.trim() || flightEnd
  const asOfDate =
    parseUtcDate(asOfRaw) > parseUtcDate(flightEnd)
      ? flightEnd
      : parseUtcDate(asOfRaw) < parseUtcDate(flightStart)
        ? flightStart
        : asOfRaw

  const flightPlannedDays = Math.max(1, daysInclusive(flightStart, flightEnd))
  const elapsedDays = Math.max(1, daysInclusive(flightStart, asOfDate))

  let pctDelivered: number
  if (input.pctDeliveredOverride != null && Number.isFinite(input.pctDeliveredOverride)) {
    pctDelivered = Math.min(100, Math.max(1, Math.round(input.pctDeliveredOverride * 10) / 10))
  } else {
    pctDelivered = Math.min(100, Math.round((elapsedDays / flightPlannedDays) * 1000) / 10)
    if (pctDelivered < 1) pctDelivered = 1
  }

  const impressionsBooked = Math.round(input.impressionsBooked)
  const deliveredImp = Math.round((impressionsBooked * pctDelivered) / 100)
  const cpmUsd = Math.round(input.cpmUsd * 100) / 100
  const targetCtr = Math.round(input.targetCtrPct * 1000) / 1000

  const slug = input.accountName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 40)
  const id = `scenario_${slug || 'account'}_${Date.now()}`

  const nowIso = new Date().toISOString()
  const inMarket = parseUtcDate(asOfDate) < parseUtcDate(flightEnd)

  const supply =
    input.supplyPath?.trim() ||
    'Open auction + curated PMP (scenario preview — replace with live supply path).'

  const daily = buildTradeDeskDaily({
    launchDate: flightStart,
    lastDate: asOfDate,
    impressionsBooked,
    pctDelivered,
    overallCtrPct: targetCtr,
    flightPlannedDays,
  })

  const primaryGeo = ['Core DMA — A', 'Core DMA — B', 'Core DMA — C']
  const secondaryGeo = ['Extended geo — East', 'Extended geo — Central', 'Extended geo — West', 'Long-tail']

  return {
    id,
    name: `${input.lineItemName.trim()} — Scenario`,
    clientFacingName: input.accountName.trim(),
    flight: {
      launched: flightStart,
      inMarket,
      summary: `Scenario lab · ${flightPlannedDays}-day book · data through ${asOfDate} (${pctDelivered}% of booked imps). Not live delivery data.`,
    },
    delivery: {
      cpmUsd,
      impressionsPurchased: impressionsBooked,
      pctDelivered,
    },
    performance: {
      ctrPct: targetCtr,
      measurementNote: `Synthetic run: target CTR ${targetCtr}%. Daily CTR varies slightly around target (fixture noise). No conversion modeling.`,
    },
    geo: {
      headline: 'Scenario geo split — illustrative DMA-style buckets for planning.',
      primaryMarkets: primaryGeo,
      driveInMarkets: secondaryGeo,
    },
    creative: {
      environments: 'Scenario preview — desktop + mobile mix assumed from format set.',
      sizes: [...SCENARIO_DEFAULT_FORMATS],
      assetsFolderUrl: 'https://example.com/scenario-creative-placeholder',
    },
    tracking: {
      description:
        'Click-through URL not set in scenario mode — wire your landing page when you export a live brief.',
      clickthroughUrl: 'https://example.com/?utm_source=scenario_lab',
    },
    audiences: [
      {
        id: 'scenario-targeting',
        label: 'Targeting (from planner)',
        description: 'What you entered in the scenario form is summarized below for stakeholder decks.',
        cohorts: [
          {
            title: 'Audience & tactic notes',
            detail: input.targetingNotes.trim() || 'No targeting notes provided.',
          },
        ],
      },
    ],
    tradeDesk: {
      meta: {
        reportGeneratedAt: nowIso,
        ioNumber: input.ioNumber?.trim() || 'SCENARIO-IO',
        lineItem: input.lineItemName.trim(),
        dsp: 'Scenario lab (synthetic pacing)',
        supplyPath: supply,
        flightPlannedDays,
        lastDataDate: asOfDate,
        currency: 'USD',
      },
      daily,
      geoDelivery: buildGeoDelivery(deliveredImp, primaryGeo, secondaryGeo),
      formatDelivery: buildFormatDelivery([...SCENARIO_DEFAULT_FORMATS], deliveredImp),
      deviceSplit: buildDeviceSplit(),
    },
  }
}

/** Default form values for quick tests (short flight, round numbers). */
export function defaultScenarioFormValues(): Record<string, string | number> {
  const end = new Date()
  const start = new Date(end)
  start.setDate(start.getDate() - 27)
  const pad = (n: number) => String(n).padStart(2, '0')
  const iso = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

  return {
    accountName: 'Test Advertiser — Scenario Co.',
    ioNumber: 'VRVO-IO-SCENARIO-TEST',
    lineItemName: 'Display awareness — test flight',
    impressionsBooked: 2_500_000,
    cpmUsd: 8.5,
    flightStart: iso(start),
    flightEnd: iso(end),
    asOfDate: iso(end),
    targetCtrPct: 0.95,
    targetingNotes:
      'Household income $100k+; in-market for luxury spirits; exclude competitors; daypart weekday 6am–11pm ET; frequency cap 5/7 days.',
    supplyPath: 'Open auction + PG PMP with tier-1 news & sports.',
    pctDeliveredOverride: '',
  }
}
