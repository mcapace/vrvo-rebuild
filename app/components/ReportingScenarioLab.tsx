'use client'

import type { CampaignReport } from '@/lib/data/bigSmokeMiami'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { CampaignDashboard } from './CampaignDashboard'
import {
  buildScenarioCampaignReport,
  defaultScenarioFormValues,
  validateScenarioInput,
  type ScenarioPlannerInput,
} from '@/lib/reportingScenario'

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

  const update = useCallback((key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
  }, [])

  const runScenario = useCallback(() => {
    setRunError(null)
    const input = toInput(form)
    const v = validateScenarioInput(input)
    if (v.length) {
      setIssues(v)
      setScenario(null)
      setGeneratedAt(null)
      return
    }
    setIssues([])
    try {
      const report = buildScenarioCampaignReport(input)
      setScenario(report)
      setGeneratedAt(new Date().toISOString())
    } catch (e) {
      setScenario(null)
      setGeneratedAt(null)
      setRunError(e instanceof Error ? e.message : 'Could not build scenario.')
    }
  }, [form])

  const fieldError = useCallback((field: string) => issues.find((i) => i.field === field)?.message, [issues])

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Reporting · test harness</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Scenario lab</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Enter Trade Desk–style line item inputs. We generate synthetic daily delivery, pacing vs plan, clicks from your
            target CTR, and geo / format splits — same dashboard as the live fixture, for stakeholder tests.
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
        <section className="lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Planner inputs</h2>
            <p className="mt-2 text-xs text-slate-500">
              Delivery % defaults to calendar progress (as-of ÷ full flight) unless you override it.
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
                onClick={runScenario}
                className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy/90"
              >
                Run scenario
              </button>
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
                }}
                className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Reset sample values
              </button>
            </div>
          </div>
        </section>

        <div className="lg:col-span-7">
          {!scenario || !generatedAt ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center">
              <p className="text-sm font-medium text-slate-700">No scenario loaded yet</p>
              <p className="mt-2 max-w-md text-xs text-slate-500">
                Fill the planner and click <span className="font-semibold text-slate-700">Run scenario</span>. The full
                reporting dashboard renders here with synthetic pacing driven by your flight dates and CTR target.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Preview below uses the same components as the password-protected fixture report. CSV export in the ribbon
                reflects this run.
              </p>
              <CampaignDashboard campaign={scenario} generatedAt={generatedAt} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
