'use client'

import type { CampaignReport } from '@/lib/data/bigSmokeMiami'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CampaignDashboard } from './CampaignDashboard'
import {
  buildScenarioCampaignReport,
  defaultScenarioFormValues,
  validateScenarioInput,
  type ScenarioPlannerInput,
} from '@/lib/reportingScenario'
import type { ReportingOrderRecord } from '@/lib/reportingOrdersStorage'
import {
  deleteReportingOrder,
  loadReportingOrders,
  newReportingOrderId,
  orderLabelFromInput,
  saveReportingOrder,
} from '@/lib/reportingOrdersStorage'

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
  }))

  const [issues, setIssues] = useState<{ field: string; message: string }[]>([])
  const [runError, setRunError] = useState<string | null>(null)
  const [scenario, setScenario] = useState<CampaignReport | null>(null)
  const [generatedAt, setGeneratedAt] = useState<string | null>(null)
  const [savedOrders, setSavedOrders] = useState<ReportingOrderRecord[]>([])
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)

  useEffect(() => {
    setSavedOrders(loadReportingOrders())
  }, [])

  const refreshOrders = useCallback(() => {
    setSavedOrders(loadReportingOrders())
  }, [])

  const applyValidatedInput = useCallback(
    (input: ScenarioPlannerInput, opts: { persistNewOrder: boolean; orderId?: string | null }) => {
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
          setActiveOrderId(orderId)
          refreshOrders()
        } else if (opts.orderId) {
          setActiveOrderId(opts.orderId)
        } else {
          setActiveOrderId(null)
        }
      } catch (e) {
        setScenario(null)
        setGeneratedAt(null)
        setRunError(e instanceof Error ? e.message : 'Could not build scenario.')
      }
    },
    [refreshOrders],
  )

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
    applyValidatedInput(input, { persistNewOrder: true })
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
    applyValidatedInput(input, { persistNewOrder: false, orderId: activeOrderId })
  }, [form, activeOrderId, applyValidatedInput])

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
      const v = validateScenarioInput(order.input)
      if (v.length) {
        setIssues(v)
        setScenario(null)
        setGeneratedAt(null)
        return
      }
      applyValidatedInput(order.input, { persistNewOrder: false, orderId: order.orderId })
    },
    [applyValidatedInput],
  )

  const removeSavedOrder = useCallback(
    (orderId: string) => {
      deleteReportingOrder(orderId)
      refreshOrders()
      if (activeOrderId === orderId) {
        setActiveOrderId(null)
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
            saves the order in this browser (localStorage) and opens the dashboard so you can export CSV. Use{' '}
            <span className="font-medium text-slate-800">Pull reporting</span> on a saved order to reopen the same book, or{' '}
            <span className="font-medium text-slate-800">Refresh</span> after editing the form while an order is active.
          </p>
        </div>
        <Link
          href="/reporting"
          className="shrink-0 rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy shadow-sm transition-colors hover:bg-slate-50"
        >
          ← Fixture dashboard
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <section className="space-y-5 lg:col-span-5">
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
                  })
                  setIssues([])
                  setRunError(null)
                  setScenario(null)
                  setGeneratedAt(null)
                  setActiveOrderId(null)
                }}
                className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Start new order (sample values)
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Saved orders — pull reporting</h2>
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
