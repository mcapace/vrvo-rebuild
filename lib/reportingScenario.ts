import type { AudienceBucket, AudienceCohort, CampaignReport } from '@/lib/data/bigSmokeMiami'
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
  /** Primary landing URL for creative (https). */
  clickthroughUrl: string
  /** Optional Drive / DAM link for creative assets. */
  creativeAssetsFolderUrl?: string
  /** How clicks are routed / what is measured (shown in reporting). */
  trackingDescription?: string
  /** Label for first audience bucket (cohorts below). */
  audiencePrimaryLabel?: string
  /** One cohort per line: `Title — Detail` or `Title | Detail`. */
  audiencePrimaryCohortsText: string
  /** Label for second audience bucket. */
  audienceSecondaryLabel?: string
  audienceSecondaryCohortsText?: string
  /**
   * Override % of booked impressions treated as delivered by `asOfDate`.
   * When omitted, delivery follows calendar progress: elapsed days ÷ full flight days (capped at 100%).
   */
  pctDeliveredOverride?: number | null
}

/** Older browser-saved orders may omit fields added later — merge so they still validate and open. */
export function normalizeScenarioPlannerInput(input: ScenarioPlannerInput): ScenarioPlannerInput {
  const d = defaultScenarioFormValues()
  const ct = input.clickthroughUrl?.trim()
  return {
    ...input,
    clickthroughUrl: ct || String(d.clickthroughUrl),
    creativeAssetsFolderUrl: input.creativeAssetsFolderUrl,
    trackingDescription: input.trackingDescription,
    audiencePrimaryLabel: input.audiencePrimaryLabel,
    audiencePrimaryCohortsText:
      (input.audiencePrimaryCohortsText != null && String(input.audiencePrimaryCohortsText).trim() !== '')
        ? String(input.audiencePrimaryCohortsText)
        : String(d.audiencePrimaryCohortsText),
    audienceSecondaryLabel: input.audienceSecondaryLabel,
    audienceSecondaryCohortsText:
      input.audienceSecondaryCohortsText != null ? String(input.audienceSecondaryCohortsText) : String(d.audienceSecondaryCohortsText ?? ''),
  }
}

function validHttpUrl(s: string): boolean {
  try {
    const u = new URL(s.trim())
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export type ScenarioValidationIssue = { field: string; message: string }

/**
 * Each non-empty line becomes one cohort. Use `Title — Detail` or `Title | Detail`.
 * If no separator, the whole line is the title and detail prompts to add more.
 */
export function parseAudienceCohortLines(text: string): AudienceCohort[] {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const out: AudienceCohort[] = []
  for (const line of lines) {
    const em = line.indexOf(' — ')
    const pipe = line.indexOf(' | ')
    let title: string
    let detail: string
    if (em >= 0) {
      title = line.slice(0, em).trim()
      detail = line.slice(em + 3).trim()
    } else if (pipe >= 0) {
      title = line.slice(0, pipe).trim()
      detail = line.slice(pipe + 3).trim()
    } else {
      title = line.slice(0, 160).trim()
      detail =
        line.length > 160
          ? line.slice(160).trim()
          : 'Add a longer description after an em dash on the same line (Title — detail).'
    }
    if (!title) continue
    if (!detail) detail = title
    out.push({ title, detail })
  }
  return out
}

function buildScenarioAudienceBuckets(input: ScenarioPlannerInput, thisOrderBucket: AudienceBucket): AudienceBucket[] {
  const primaryLabel = input.audiencePrimaryLabel?.trim() || 'Primary audience & reach'
  const primaryCohorts = parseAudienceCohortLines(input.audiencePrimaryCohortsText ?? '')
  const secondaryLabel = input.audienceSecondaryLabel?.trim() || 'Secondary audience & signals'
  const secondaryCohorts = parseAudienceCohortLines(input.audienceSecondaryCohortsText ?? '')

  const buckets: AudienceBucket[] = [thisOrderBucket]

  if (primaryCohorts.length > 0) {
    buckets.push({
      id: 'campaign-primary-audiences',
      label: primaryLabel,
      description: 'Primary audience tiers and data partners for this campaign (from your order entry).',
      cohorts: primaryCohorts,
    })
  }
  if (secondaryCohorts.length > 0) {
    buckets.push({
      id: 'campaign-secondary-audiences',
      label: secondaryLabel,
      description: 'Secondary, contextual, CRM, or niche layers for this campaign (from your order entry).',
      cohorts: secondaryCohorts,
    })
  }

  return buckets
}

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

  const ct = raw.clickthroughUrl?.trim() ?? ''
  if (!ct) issues.push({ field: 'clickthroughUrl', message: 'Enter a click-through URL (https).' })
  else if (!validHttpUrl(ct)) {
    issues.push({ field: 'clickthroughUrl', message: 'Click-through URL must start with http:// or https://' })
  }

  const assets = raw.creativeAssetsFolderUrl?.trim() ?? ''
  if (assets && !validHttpUrl(assets)) {
    issues.push({ field: 'creativeAssetsFolderUrl', message: 'Creative assets URL must be a valid http(s) link or left blank.' })
  }

  const primaryCohorts = parseAudienceCohortLines(raw.audiencePrimaryCohortsText ?? '')
  const secondaryCohorts = parseAudienceCohortLines(raw.audienceSecondaryCohortsText ?? '')
  if (primaryCohorts.length === 0 && secondaryCohorts.length === 0) {
    issues.push({
      field: 'audiencePrimaryCohortsText',
      message:
        'Add at least one campaign-specific cohort in Primary or Secondary (one per line: Partner or segment — description).',
    })
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

  const assetsUrl =
    input.creativeAssetsFolderUrl?.trim() ||
    'https://drive.google.com/drive/folders/placeholder-add-your-creative-folder'

  const trackingDescription =
    input.trackingDescription?.trim() ||
    'All display creative routes to the click-through URL below so users land on your conversion path, not a generic marketing home page.'

  const thisOrderBucket: AudienceBucket = {
    id: 'this-order',
    label: 'This order',
    description: 'Line item, destination URL, assets, and targeting captured from the order entry form.',
    cohorts: [
      {
        title: 'IO number',
        detail: input.ioNumber?.trim() || 'SCENARIO-IO',
      },
      {
        title: 'Line item',
        detail: input.lineItemName.trim(),
      },
      {
        title: 'Click-through URL',
        detail: input.clickthroughUrl.trim(),
      },
      {
        title: 'Creative assets folder',
        detail: input.creativeAssetsFolderUrl?.trim() || 'Not provided — add a Drive, Dropbox, or DAM link for trafficking.',
      },
      {
        title: 'Measurement / routing',
        detail: trackingDescription,
      },
      {
        title: 'Targeting & tactics',
        detail: input.targetingNotes.trim() || 'No targeting notes provided.',
      },
    ],
  }

  const audiences = buildScenarioAudienceBuckets(input, thisOrderBucket)

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
      environments: 'Desktop and mobile; full IAB size coverage (scenario preview).',
      sizes: [...SCENARIO_DEFAULT_FORMATS],
      assetsFolderUrl: assetsUrl,
    },
    tracking: {
      description: trackingDescription,
      clickthroughUrl: input.clickthroughUrl.trim(),
    },
    audiences,
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
export function defaultScenarioFormValues(): Record<string, string | number | boolean> {
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
    clickthroughUrl:
      'https://www.tixr.com/groups/cabigsmoke/events/big-smoke-florida-175821?utm_source=vrvo&utm_medium=display&utm_campaign=demo_scenario',
    creativeAssetsFolderUrl:
      'https://drive.google.com/drive/folders/1x3DaJGM0RWAVpus5Qz-dsi6lbnpGO8Xr?usp=sharing',
    trackingDescription:
      'Display traffic routes to your click-through URL for the next-step action you define for this campaign.',
    audiencePrimaryLabel: 'Primary audience & reach',
    audiencePrimaryCohortsText:
      'Modeled in-market luxury shoppers — Household and purchase signals aligned to target metros.\nRetail & venue proximity — Geo-focused weights around flagship and event locations.',
    audienceSecondaryLabel: 'Contextual & retention',
    audienceSecondaryCohortsText:
      'Premium editorial contextual — Brand-safe news & lifestyle adjacency.\nFirst-party retargeting — Site visitors and policy-compliant CRM match where available.',
  }
}
