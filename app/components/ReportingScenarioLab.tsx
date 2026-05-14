'use client'

import type { CampaignReport } from '@/lib/data/bigSmokeMiami'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CampaignDashboard } from './CampaignDashboard'
import {
  buildScenarioCampaignReport,
  defaultScenarioFormValues,
  normalizeScenarioPlannerInput,
  validateScenarioInput,
  type ScenarioPlannerInput,
} from '@/lib/reportingScenario'
import {
  deleteReportingOrder,
  loadAutoRefreshIntervalMs,
  loadAutoRunOnLoad,
  loadLastActiveOrderId,
  loadReportingOrders,
  newReportingOrderId,
  orderLabelFromInput,
  persistLastActiveOrderId,
  saveAutoRefreshIntervalMs,
  saveAutoRunOnLoad,
  saveReportingOrder,
  updateReportingOrderInput,
  type ReportingOrderRecord,
} from '@/lib/reportingOrdersStorage'

/** Avoids double auto-run when React Strict Mode remounts the lab in development. */
let reportingScenarioLabBootstrapped = false

type FormState = {
  accountName: string
  ioNumber: string
  lineItemName: string
  impressionsBooked: string
  cpmUsd: string
  flightStart: string
  flightEnd: string
  asOfDate: string
  targetCtrPct: string
  targetingNotes: string
  supplyPath: string
  pctDeliveredOverride: string
  clickthroughUrl: string
  creativeAssetsFolderUrl: string
  trackingDescription: string
  includeReferenceCohorts: boolean
}

function inputToFormState(input: ScenarioPlannerInput): FormState {
  const o = input.pctDeliveredOverride
  return {
    accountName: input.accountName,
    ioNumber: input.ioNumber ?? '',
    lineItemName: input.lineItemName,
    impressionsBooked: String(input.impressionsBooked),
    cpmUsd: String(input.cpmUsd),
    flightStart: input.flightStart,
    flightEnd: input.flightEnd,
    asOfDate: input.asOfDate?.trim() ?? '',
    targetCtrPct: String(input.targetCtrPct),
    targetingNotes: input.targetingNotes,
    supplyPath: input.supplyPath ?? '',
    pctDeliveredOverride:
      o != null && Number.isFinite(o) ? String(o) : '',
    clickthroughUrl: input.clickthroughUrl,
    creativeAssetsFolderUrl: input.creativeAssetsFolderUrl ?? '',
    trackingDescription: input.trackingDescription ?? '',
    includeReferenceCohorts: input.includeReferenceCohorts !== false,
  }
}

function toInput(form: FormState): ScenarioPlannerInput {
  const imp = Number(form.impressionsBooked.replace(/,/g, ''))
  const cpm = Number(form.cpmUsd)
  const ctr = Number(form.targetCtrPct)
  const overrideRaw = form.pctDeliveredOverride.trim()
  const pctOverride =
    overrideRaw === '' ? null : Math.min(100, Math.max(1, Number(overrideRaw)))

  return {
    accountName: form.accountName,
    ioNumber: form.ioNumber,
    lineItemName: form.lineItemName,
    impressionsBooked: imp,
    cpmUsd: cpm,
    flightStart: form.flightStart.trim(),
    flightEnd: form.flightEnd.trim(),
    asOfDate: form.asOfDate.trim() || undefined,
    targetCtrPct: ctr,
    targetingNotes: form.targetingNotes,
    supplyPath: form.supplyPath.trim() || undefined,
    pctDeliveredOverride: pctOverride != null && Number.isFinite(pctOverride) ? pctOverride : null,
    clickthroughUrl: form.clickthroughUrl.trim(),
    creativeAssetsFolderUrl: form.creativeAssetsFolderUrl.trim() || undefined,
    trackingDescription: form.trackingDescription.trim() || undefined,
    includeReferenceCohorts: form.includeReferenceCohorts,
  }
}

const labelClass = 'block text-[10px] font-bold uppercase tracking-wide text-slate-500'
const inputClass =
  'mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-navy/20 placeholder:text-slate-400 focus:border-navy/40 focus:ring-2'

export function ReportingScenarioLab() {
  const defaults = useMemo(() => defaultScenarioFormValues(), [])
  const [form, setForm] = useState<FormState>(() => ({
    accountName: String(defaults.accountName),
    ioNumber: String(defaults.ioNumber),
    lineItemName: String(defaults.lineItemName),
    impressionsBooked: String(defaults.impressionsBooked),
    cpmUsd: String(defaults.cpmUsd),
    flightStart: String(defaults.flightStart),
    flightEnd: String(defaults.flightEnd),
    asOfDate: String(defaults.asOfDate),
    targetCtrPct: String(defaults.targetCtrPct),
    targetingNotes: String(defaults.targetingNotes),
    supplyPath: String(defaults.supplyPath),
    pctDeliveredOverride: defaults.pctDeliveredOverride === '' ? '' : String(defaults.pctDeliveredOverride),
    clickthroughUrl: String(defaults.clickthroughUrl),
    creativeAssetsFolderUrl: String(defaults.creativeAssetsFolderUrl ?? ''),
    trackingDescription: String(defaults.trackingDescription ?? ''),
    includeReferenceCohorts: defaults.includeReferenceCohorts !== false,
  }))

  const [issues, setIssues] = useState<{ field: string; message: string }[]>([])
  const [runError, setRunError] = useState<string | null>(null)
  const [scenario, setScenario] = useState<CampaignReport | null>(null)
  const [generatedAt, setGeneratedAt] = useState<string | null>(null)
  const [savedOrders, setSavedOrders] = useState<ReportingOrderRecord[]>([])
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)
  const [autoRunOnLoad, setAutoRunOnLoad] = useState(true)
  const [autoRefreshMs, setAutoRefreshMs] = useState(0)
  const formRef = useRef(form)
  formRef.current = form

  const [saveBanner, setSaveBanner] = useState<{ orderId: string; at: string } | null>(null)

  const refreshOrders = useCallback(() => {
    setSavedOrders(loadReportingOrders())
  }, [])

  const applyValidatedInput = useCallback(
    (
      input: ScenarioPlannerInput,
      opts: { persistNewOrder: boolean; orderId?: string | null },
    ): { ok: boolean; newOrderId?: string } => {
      setIssues([])
      setRunError(null)
      try {
        const report = buildScenarioCampaignReport(input)
        const at = new Date().toISOString()
        setScenario(report)
        setGeneratedAt(at)
        setForm(inputToFormState(input))

        if (opts.persistNewOrder) {
          const orderId = opts.orderId ?? newReportingOrderId()
          const record: ReportingOrderRecord = {
            orderId,
            createdAt: at,
            label: orderLabelFromInput(input),
            input,
          }
          saveReportingOrder(record)
          persistLastActiveOrderId(orderId)
          setActiveOrderId(orderId)
          refreshOrders()
          return { ok: true, newOrderId: orderId }
        }
        if (opts.orderId) {
          persistLastActiveOrderId(opts.orderId)
          setActiveOrderId(opts.orderId)
        } else {
          setActiveOrderId(null)
        }
        return { ok: true }
      } catch (e) {
        setScenario(null)
        setGeneratedAt(null)
        setRunError(e instanceof Error ? e.message : 'Could not build scenario.')
        return { ok: false }
      }
    },
    [refreshOrders],
  )

  useEffect(() => {
    if (reportingScenarioLabBootstrapped) return
    reportingScenarioLabBootstrapped = true

    const orders = loadReportingOrders()
    setSavedOrders(orders)
    const runOnLoad = loadAutoRunOnLoad()
    const refreshMs = loadAutoRefreshIntervalMs()
    setAutoRunOnLoad(runOnLoad)
    setAutoRefreshMs(refreshMs)

    const lastId = loadLastActiveOrderId()
    if (runOnLoad && lastId) {
      const o = orders.find((x) => x.orderId === lastId)
      if (o) {
        const v = validateScenarioInput(normalizeScenarioPlannerInput(o.input))
        if (v.length) {
          setIssues(v)
        } else {
          applyValidatedInput(normalizeScenarioPlannerInput(o.input), { persistNewOrder: false, orderId: o.orderId })
        }
      }
    }
  }, [applyValidatedInput])

  useEffect(() => {
    if (autoRefreshMs <= 0 || !activeOrderId) return
    const timer = window.setInterval(() => {
      const input = toInput(formRef.current)
      if (validateScenarioInput(input).length) return
      try {
        const report = buildScenarioCampaignReport(input)
        const at = new Date().toISOString()
        setScenario(report)
        setGeneratedAt(at)
        setForm(inputToFormState(input))
        updateReportingOrderInput(activeOrderId, input)
        refreshOrders()
      } catch {
        /* keep last good chart */
      }
    }, autoRefreshMs)
    return () => window.clearInterval(timer)
  }, [autoRefreshMs, activeOrderId, refreshOrders])

  const update = useCallback((key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
  }, [])

  /** Validates current form, builds reporting, and saves a new order for later. */
  const createOrderAndPullReporting = useCallback(() => {
    setRunError(null)
    const input = toInput(form)
    const v = validateScenarioInput(input)
    if (v.length) {
      setIssues(v)
      setScenario(null)
      setGeneratedAt(null)
      return
    }
    const r = applyValidatedInput(input, { persistNewOrder: true })
    if (r.ok && r.newOrderId) {
      setSaveBanner({ orderId: r.newOrderId, at: new Date().toISOString() })
    }
  }, [form, applyValidatedInput])

  /** Re-run from form without creating a duplicate order (e.g. after edits). */
  const refreshReportingFromForm = useCallback(() => {
    setRunError(null)
    const input = toInput(form)
    const v = validateScenarioInput(input)
    if (v.length) {
      setIssues(v)
      setScenario(null)
      setGeneratedAt(null)
      return
    }
    const r = applyValidatedInput(input, { persistNewOrder: false, orderId: activeOrderId })
    if (r.ok && activeOrderId) {
      updateReportingOrderInput(activeOrderId, input)
      refreshOrders()
    }
  }, [form, activeOrderId, applyValidatedInput, refreshOrders])

  /** Preview dashboard + CSV without persisting a new order. */
  const pullReportingPreviewOnly = useCallback(() => {
    setRunError(null)
    const input = toInput(form)
    const v = validateScenarioInput(input)
    if (v.length) {
      setIssues(v)
      setScenario(null)
      setGeneratedAt(null)
      return
    }
    applyValidatedInput(input, { persistNewOrder: false })
  }, [form, applyValidatedInput])

  const openSavedOrder = useCallback(
    (order: ReportingOrderRecord) => {
      const input = normalizeScenarioPlannerInput(order.input)
      const v = validateScenarioInput(input)
      if (v.length) {
        setIssues(v)
        setScenario(null)
        setGeneratedAt(null)
        return
      }
      applyValidatedInput(input, { persistNewOrder: false, orderId: order.orderId })
    },
    [applyValidatedInput],
  )

  const removeSavedOrder = useCallback(
    (orderId: string) => {
      deleteReportingOrder(orderId)
      refreshOrders()
      if (activeOrderId === orderId) {
        setActiveOrderId(null)
        setScenario(null)
        setGeneratedAt(null)
      }
    },
    [activeOrderId, refreshOrders],
  )

  const fieldError = useCallback((field: string) => issues.find((i) => i.field === field)?.message, [issues])

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Reporting · orders</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">New reporting order</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Enter line item details like a trade desk order. <span className="font-medium text-slate-800">Create order & pull reporting</span>{' '}
            saves the order in this browser, marks it as your active book, and opens the dashboard (CSV from the ribbon).
            Turn on <span className="font-medium text-slate-800">auto-run</span> below to reopen this page and have that order
            report immediately, or <span className="font-medium text-slate-800">auto-refresh</span> to re-run on a timer while
            you keep the tab open.
          </p>
        </div>
        <Link
          href="/reporting"
          className="shrink-0 rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy shadow-sm transition-colors hover:bg-slate-50"
        >
          ← Fixture dashboard
        </Link>
      </div>

      {saveBanner ? (
        <div
          className="mb-6 flex flex-wrap items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 shadow-sm"
          role="status"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-emerald-950">Order saved in this browser</p>
            <p className="mt-1 font-mono text-xs font-medium text-emerald-900">{saveBanner.orderId}</p>
            <p className="mt-2 text-xs leading-relaxed text-emerald-900/90">
              Saved to <span className="font-medium">Saved orders</span> below — use <span className="font-medium">Pull reporting</span>{' '}
              anytime. Dashboard ribbon <span className="font-medium">Export report</span> downloads CSV including URLs and
              cohorts.
            </p>
            <p className="mt-1 text-[10px] text-emerald-800/80">
              {new Date(saveBanner.at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSaveBanner(null)}
            className="shrink-0 rounded-md border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100/80"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-12">
        <section className="space-y-5 lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Run on its own</h2>
            <p className="mt-2 text-xs text-slate-600">
              Saved orders and these toggles live in your browser only. Closing the tab stops auto-refresh; unattended
              schedules in the cloud would need a separate backend job.
            </p>
            <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-slate-800">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy"
                checked={autoRunOnLoad}
                onChange={(e) => {
                  const v = e.target.checked
                  setAutoRunOnLoad(v)
                  saveAutoRunOnLoad(v)
                }}
              />
              <span>
                <span className="font-medium">Auto-run last order</span> when I open this page (reloads reporting for the
                order you last saved or opened — no extra click).
              </span>
            </label>
            <div className="mt-4">
              <label className={labelClass} htmlFor="sc-auto-refresh">
                Auto-refresh reporting (active order only)
              </label>
              <select
                id="sc-auto-refresh"
                className={inputClass}
                value={autoRefreshMs}
                onChange={(e) => {
                  const ms = Number(e.target.value)
                  setAutoRefreshMs(ms)
                  saveAutoRefreshIntervalMs(ms)
                }}
              >
                <option value={0}>Off</option>
                <option value={60000}>Every 1 minute</option>
                <option value={300000}>Every 5 minutes</option>
                <option value={900000}>Every 15 minutes</option>
              </select>
              <p className="mt-2 text-[10px] leading-snug text-slate-500">
                Re-runs from the current form while an order is active, updates the saved order definition, and refreshes
                “Last refresh” each tick.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Order entry</h2>
            <p className="mt-2 text-xs text-slate-500">
              Delivery % defaults to calendar progress (report as-of ÷ full flight) unless you override it. Orders are not
              sent to Vrvo servers — only this device.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className={labelClass} htmlFor="sc-account">
                  Account / advertiser
                </label>
                <input
                  id="sc-account"
                  className={inputClass}
                  value={form.accountName}
                  onChange={(e) => update('accountName', e.target.value)}
                  placeholder="e.g. Acme Spirits"
                  autoComplete="organization"
                />
                {fieldError('accountName') ? (
                  <p className="mt-1 text-xs text-rose-600">{fieldError('accountName')}</p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="sc-io">
                    IO number
                  </label>
                  <input
                    id="sc-io"
                    className={inputClass}
                    value={form.ioNumber}
                    onChange={(e) => update('ioNumber', e.target.value)}
                    placeholder="Optional — defaults if empty"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="sc-li">
                    Line item name
                  </label>
                  <input
                    id="sc-li"
                    className={inputClass}
                    value={form.lineItemName}
                    onChange={(e) => update('lineItemName', e.target.value)}
                    placeholder="Display — national awareness"
                  />
                  {fieldError('lineItemName') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('lineItemName')}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="sc-imp">
                    Booked impressions
                  </label>
                  <input
                    id="sc-imp"
                    inputMode="numeric"
                    className={inputClass}
                    value={form.impressionsBooked}
                    onChange={(e) => update('impressionsBooked', e.target.value)}
                  />
                  {fieldError('impressionsBooked') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('impressionsBooked')}</p>
                  ) : null}
                </div>
                <div>
                  <label className={labelClass} htmlFor="sc-cpm">
                    CPM (USD)
                  </label>
                  <input
                    id="sc-cpm"
                    inputMode="decimal"
                    className={inputClass}
                    value={form.cpmUsd}
                    onChange={(e) => update('cpmUsd', e.target.value)}
                  />
                  {fieldError('cpmUsd') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('cpmUsd')}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass} htmlFor="sc-fs">
                    Flight start
                  </label>
                  <input
                    id="sc-fs"
                    type="date"
                    className={inputClass}
                    value={form.flightStart}
                    onChange={(e) => update('flightStart', e.target.value)}
                  />
                  {fieldError('flightStart') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('flightStart')}</p>
                  ) : null}
                </div>
                <div>
                  <label className={labelClass} htmlFor="sc-fe">
                    Flight end
                  </label>
                  <input
                    id="sc-fe"
                    type="date"
                    className={inputClass}
                    value={form.flightEnd}
                    onChange={(e) => update('flightEnd', e.target.value)}
                  />
                  {fieldError('flightEnd') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('flightEnd')}</p>
                  ) : null}
                </div>
                <div>
                  <label className={labelClass} htmlFor="sc-asof">
                    Report as-of
                  </label>
                  <input
                    id="sc-asof"
                    type="date"
                    className={inputClass}
                    value={form.asOfDate}
                    onChange={(e) => update('asOfDate', e.target.value)}
                  />
                  {fieldError('asOfDate') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('asOfDate')}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="sc-ctr">
                    Target CTR (%)
                  </label>
                  <input
                    id="sc-ctr"
                    inputMode="decimal"
                    className={inputClass}
                    value={form.targetCtrPct}
                    onChange={(e) => update('targetCtrPct', e.target.value)}
                  />
                  {fieldError('targetCtrPct') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('targetCtrPct')}</p>
                  ) : null}
                </div>
                <div>
                  <label className={labelClass} htmlFor="sc-pct">
                    Delivery % override
                  </label>
                  <input
                    id="sc-pct"
                    inputMode="decimal"
                    className={inputClass}
                    value={form.pctDeliveredOverride}
                    onChange={(e) => update('pctDeliveredOverride', e.target.value)}
                    placeholder="Auto from dates if empty"
                  />
                  {fieldError('pctDeliveredOverride') ? (
                    <p className="mt-1 text-xs text-rose-600">{fieldError('pctDeliveredOverride')}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="sc-supply">
                  Supply path (optional)
                </label>
                <input
                  id="sc-supply"
                  className={inputClass}
                  value={form.supplyPath}
                  onChange={(e) => update('supplyPath', e.target.value)}
                  placeholder="PMP, PG, open auction…"
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="sc-cturl">
                  Click-through URL <span className="text-rose-600">*</span>
                </label>
                <input
                  id="sc-cturl"
                  type="url"
                  className={inputClass}
                  value={form.clickthroughUrl}
                  onChange={(e) => update('clickthroughUrl', e.target.value)}
                  placeholder="https://…"
                  autoComplete="url"
                />
                {fieldError('clickthroughUrl') ? (
                  <p className="mt-1 text-xs text-rose-600">{fieldError('clickthroughUrl')}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass} htmlFor="sc-assets">
                  Creative assets folder (optional)
                </label>
                <input
                  id="sc-assets"
                  type="url"
                  className={inputClass}
                  value={form.creativeAssetsFolderUrl}
                  onChange={(e) => update('creativeAssetsFolderUrl', e.target.value)}
                  placeholder="https://drive.google.com/… or DAM link"
                />
                {fieldError('creativeAssetsFolderUrl') ? (
                  <p className="mt-1 text-xs text-rose-600">{fieldError('creativeAssetsFolderUrl')}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass} htmlFor="sc-track-desc">
                  Tracking / routing note
                </label>
                <textarea
                  id="sc-track-desc"
                  rows={3}
                  className={`${inputClass} resize-y`}
                  value={form.trackingDescription}
                  onChange={(e) => update('trackingDescription', e.target.value)}
                  placeholder="How clicks are routed and what is measured (shown above the URL in reporting, like Big Smoke)."
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="sc-tgt">
                  Targeting & tactics
                </label>
                <textarea
                  id="sc-tgt"
                  rows={5}
                  className={`${inputClass} resize-y`}
                  value={form.targetingNotes}
                  onChange={(e) => update('targetingNotes', e.target.value)}
                  placeholder="Geo, demo, segments, frequency caps, daypart, brand safety…"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-800">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy"
                  checked={form.includeReferenceCohorts}
                  onChange={(e) => setForm((f) => ({ ...f, includeReferenceCohorts: e.target.checked }))}
                />
                <span>
                  <span className="font-medium">Include Big Smoke–style cohort reference</span> — adds the same core +
                  lifestyle audience buckets as the Big Smoke fixture under “Audience strategy” (for deck parity).
                </span>
              </label>
            </div>

            {runError ? <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">{runError}</p> : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={createOrderAndPullReporting}
                className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy/90"
              >
                Create order & pull reporting
              </button>
              <button
                type="button"
                onClick={pullReportingPreviewOnly}
                className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Preview only (do not save order)
              </button>
              {activeOrderId ? (
                <button
                  type="button"
                  onClick={refreshReportingFromForm}
                  className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
                >
                  Refresh reporting (same order)
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  const d = defaultScenarioFormValues()
                  setForm({
                    accountName: String(d.accountName),
                    ioNumber: String(d.ioNumber),
                    lineItemName: String(d.lineItemName),
                    impressionsBooked: String(d.impressionsBooked),
                    cpmUsd: String(d.cpmUsd),
                    flightStart: String(d.flightStart),
                    flightEnd: String(d.flightEnd),
                    asOfDate: String(d.asOfDate),
                    targetCtrPct: String(d.targetCtrPct),
                    targetingNotes: String(d.targetingNotes),
                    supplyPath: String(d.supplyPath),
                    pctDeliveredOverride: '',
                    clickthroughUrl: String(d.clickthroughUrl),
                    creativeAssetsFolderUrl: String(d.creativeAssetsFolderUrl ?? ''),
                    trackingDescription: String(d.trackingDescription ?? ''),
                    includeReferenceCohorts: d.includeReferenceCohorts !== false,
                  })
                  setIssues([])
                  setRunError(null)
                  setScenario(null)
                  setGeneratedAt(null)
                  setActiveOrderId(null)
                  setSaveBanner(null)
                }}
                className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Start new order (sample values)
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Saved orders — pull reporting ({savedOrders.length})
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Select an order to reload inputs and regenerate the dashboard and CSV for that book.
            </p>
            {savedOrders.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">No saved orders yet. Use “Create order & pull reporting” above.</p>
            ) : (
              <ul className="mt-4 max-h-[min(52vh,420px)] space-y-2 overflow-y-auto pr-1">
                {savedOrders.map((o) => (
                  <li
                    key={o.orderId}
                    className={`flex flex-col gap-2 rounded-lg border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between ${
                      activeOrderId === o.orderId ? 'border-navy/40 bg-navy/[0.04]' : 'border-slate-100 bg-slate-50/80'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] font-semibold text-navy">{o.orderId}</p>
                      <p className="truncate text-sm font-medium text-slate-900">{o.label}</p>
                      <p className="text-[10px] text-slate-500">
                        {new Date(o.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => openSavedOrder(o)}
                        className="rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy/90"
                      >
                        Pull reporting
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSavedOrder(o.orderId)}
                        className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <div className="lg:col-span-7">
          {!scenario || !generatedAt ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center">
              <p className="text-sm font-medium text-slate-700">No reporting pulled yet</p>
              <p className="mt-2 max-w-md text-xs text-slate-500">
                Complete order entry, then choose <span className="font-semibold text-slate-700">Create order & pull reporting</span>{' '}
                or open a saved order. The dashboard and CSV export use synthetic pacing from your flight and CTR inputs.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                {activeOrderId ? (
                  <>
                    Active order <span className="font-mono font-semibold text-slate-800">{activeOrderId}</span> — use the
                    ribbon <span className="font-medium">Export report</span> for CSV.
                  </>
                ) : (
                  <>Preview run — ribbon <span className="font-medium">Export report</span> downloads CSV for this preview.</>
                )}
              </p>
              <CampaignDashboard campaign={scenario} generatedAt={generatedAt} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
