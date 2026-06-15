/**
 * Planning CPM rates shared across reporting fixtures, invoice-derived campaigns,
 * and the `/reporting/scenario` order lab.
 *
 * Booked impressions: `impressions = mediaSpendUsd × 1,000 ÷ CPM`.
 * Dashboard spend KPIs use the same CPM × delivered imps (prorates in-flight).
 */

export const REPORTING_PLANNING_CPM = {
  /** Programmatic display default (`defaultScenarioFormValues`). */
  displayStandard: 8.5,
  /** Endemic display reference — Casa Dragones blended ~$7.51 on delivered imps. */
  endemicDisplay: 7.5,
  /** Native units on publisher sites (CA.com, WA.com, WS.com). */
  endemicNative: 12,
  /** Premium member / 90 Club endemic native. */
  premiumNative: 15,
  /** In-house podcast extension packages (CA Podcast in-house native). */
  podcastNative: 7,
} as const

/** Scenario lab default blended CTR target (%). */
export const REPORTING_DEFAULT_CTR_PCT = 0.95

export function impressionsFromMediaSpend(spendUsd: number, cpmUsd: number): number {
  if (!Number.isFinite(spendUsd) || spendUsd <= 0) return 0
  if (!Number.isFinite(cpmUsd) || cpmUsd <= 0) return 0
  return Math.max(1_000, Math.round((spendUsd * 1000) / cpmUsd))
}

export function mediaSpendForImpressions(impressions: number, cpmUsd: number): number {
  return Math.round((impressions / 1000) * cpmUsd * 100) / 100
}
