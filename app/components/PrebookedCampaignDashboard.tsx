'use client'

import type { CampaignReport } from '@/lib/data/bigSmokeMiami'
import { downloadCampaignReportCsv } from '@/lib/reportingExport'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const TTD = {
  navy: '#1E3A5F',
  teal: '#0d9488',
  orangeLight: '#fb923c',
  slate: '#64748b',
  grid: '#e2e8f0',
}

const RIBBON_ACTION =
  'rounded-sm px-2 py-1 text-left text-white/95 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50'
const RIBBON_ACTION_PRIMARY = `${RIBBON_ACTION} bg-white/15 hover:bg-white/20`

const FLIGHT_STEPS = [
  { id: 'booked', label: 'IO booked', detail: 'Invoice on file — inventory reserved on publisher.' },
  { id: 'dates', label: 'Flight dates', detail: 'Trafficking window pending confirmation.' },
  { id: 'traffic', label: 'Trafficking', detail: 'Creative routing and tags when dates are set.' },
  { id: 'live', label: 'In-market delivery', detail: 'Daily grain, pacing curves, and performance KPIs.' },
] as const

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n)
}

function formatReportTs(iso: string) {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  }).format(d)
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SnapshotCell({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div className={`bg-white px-4 py-3 sm:px-5 sm:py-4 ${accent ? 'ring-1 ring-inset ring-amber-400/30' : ''}`}>
      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p
        className={`mt-1 text-lg tabular-nums sm:text-xl ${accent ? 'font-semibold text-navy' : 'font-medium text-slate-900'}`}
      >
        {value}
      </p>
      {sub ? <p className="mt-0.5 text-[10px] text-slate-500">{sub}</p> : null}
    </div>
  )
}

export function PrebookedCampaignDashboard({
  campaign,
  generatedAt,
  onExpandReport,
}: {
  campaign: CampaignReport
  generatedAt: string
  onExpandReport?: () => void
}) {
  const { delivery, tradeDesk, performance } = campaign
  const scheduledWindow = campaign.flight.scheduledWindow ?? 'Dates pending'
  const bookedSpend = (delivery.impressionsPurchased / 1000) * delivery.cpmUsd

  const activationMix = useMemo(() => {
    if (campaign.audienceActivationMix?.length) return campaign.audienceActivationMix
    return [
      { name: 'Endemic site native', value: 46 },
      { name: 'Newsletter native', value: 24 },
      { name: 'Modeled extension', value: 18 },
      { name: 'Retargeting', value: 12 },
    ]
  }, [campaign.audienceActivationMix])

  const devicePieData = tradeDesk.deviceSplit.map((d) => ({
    name: d.device,
    value: d.sharePct,
  }))

  const handleExportReport = useCallback(() => {
    downloadCampaignReportCsv(campaign, { generatedAt })
  }, [campaign, generatedAt])

  return (
    <div
      data-reporting-dashboard="prebooked-planning"
      className="min-h-screen bg-slate-50 pb-12 font-body shadow-[0_0_0_1px_rgba(15,23,42,0.06)] sm:mx-auto sm:max-w-[1420px] sm:rounded-b-xl"
    >
      {/* Ribbon */}
      <div className="border-b border-navy/80 bg-navy">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-1 px-3 py-2 text-[11px] font-medium sm:px-5">
          <button type="button" onClick={handleExportReport} className={RIBBON_ACTION_PRIMARY}>
            Export planning report
          </button>
          <span className="text-white/40">|</span>
          <button type="button" onClick={() => scrollToSection('prebooked-order-detail')} className={RIBBON_ACTION}>
            Order detail
          </button>
          <span className="text-white/40">|</span>
          <button type="button" onClick={() => scrollToSection('reporting-creative')} className={RIBBON_ACTION}>
            Creative
          </button>
          <span className="text-white/40">|</span>
          <button
            type="button"
            onClick={() => scrollToSection('reporting-audience-strategy')}
            className={RIBBON_ACTION}
          >
            Audience
          </button>
          <span className="ml-auto flex flex-wrap items-center gap-x-3 gap-y-1 tabular-nums text-white/70">
            {onExpandReport ? (
              <>
                <button type="button" onClick={onExpandReport} className={RIBBON_ACTION}>
                  Expand report
                </button>
                <span className="text-white/40">|</span>
              </>
            ) : null}
            <Link
              href="/reporting/scenario"
              className="font-medium text-white/95 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
            >
              New order
            </Link>
            <span className="text-white/40">|</span>
            <span>IO {tradeDesk.meta.ioNumber}</span>
          </span>
        </div>
      </div>

      {/* Status hero */}
      <div className="border-b border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-slate-50">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-amber-900/80">Prebooked inventory · planning view</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">
                {campaign.name}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{campaign.clientFacingName}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-amber-300/80 bg-amber-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-950">
                  Flight dates pending
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700">
                  {scheduledWindow} on invoice
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700">
                  Not in market
                </span>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>
                Last refresh{' '}
                <span className="font-medium text-slate-800">{formatReportTs(generatedAt)}</span>
              </div>
              <div className="mt-0.5 max-w-xs text-right">{tradeDesk.meta.lineItem}</div>
            </div>
          </div>

          {/* Planning KPIs — delivery metrics omitted until live */}
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-4">
            <SnapshotCell
              label="Booked impressions"
              value={formatNumber(delivery.impressionsPurchased)}
              sub="Invoice ÷ planning CPM"
              accent
            />
            <SnapshotCell
              label="Booked media value"
              value={`$${formatNumber(Math.round(bookedSpend * 100) / 100)}`}
              sub="Invoice amount"
            />
            <SnapshotCell
              label="Planning CPM"
              value={`$${delivery.cpmUsd.toFixed(2)}`}
              sub="Shared reporting default"
            />
            <SnapshotCell label="Scheduled window" value={scheduledWindow} sub="Flight dates TBD" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        {/* Flight readiness timeline */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Flight readiness</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            This dashboard shows booked inventory and package detail. Performance reporting activates once flight dates
            are confirmed and delivery begins.
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLIGHT_STEPS.map((step, index) => {
              const isComplete = index === 0
              const isCurrent = index === 1
              return (
                <li
                  key={step.id}
                  className={`relative rounded-lg border p-4 ${
                    isCurrent
                      ? 'border-amber-300 bg-amber-50/70 ring-1 ring-amber-200/80'
                      : isComplete
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-slate-200 bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        isCurrent
                          ? 'bg-amber-500 text-white'
                          : isComplete
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isComplete ? '✓' : index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{step.label}</span>
                  </div>
                  <p className="mt-2 text-[12px] leading-snug text-slate-600">{step.detail}</p>
                  {isCurrent ? (
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                      Current step
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Order & book math */}
          <section
            id="prebooked-order-detail"
            className="scroll-mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Order & inventory</h2>
            <p className="mt-2 text-sm text-slate-600">{campaign.flight.summary}</p>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">IO number</dt>
                <dd className="mt-1 font-medium tabular-nums text-slate-900">{tradeDesk.meta.ioNumber}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Status</dt>
                <dd className="mt-1 font-medium text-amber-900">Prebooked · pending flight</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Line item</dt>
                <dd className="mt-1 font-medium text-slate-900">{tradeDesk.meta.lineItem}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Supply path</dt>
                <dd className="mt-1 text-slate-800">{tradeDesk.meta.supplyPath}</dd>
              </div>
            </dl>
            <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Book math</p>
              <p className="mt-2 text-sm text-slate-700">
                {formatNumber(delivery.impressionsPurchased)} booked imps = invoice media ÷ ${delivery.cpmUsd.toFixed(
                  2,
                )}{' '}
                planning CPM
              </p>
              {campaign.monthlyDeliveryNote ? (
                <p className="mt-2 text-[11px] leading-snug text-slate-500">{campaign.monthlyDeliveryNote}</p>
              ) : null}
            </div>
            <p className="mt-4 text-[11px] leading-snug text-slate-500">{performance.measurementNote}</p>
          </section>

          {/* Planned package */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Planned package</h2>
            <p className="mt-2 text-sm text-slate-600">{campaign.creative.environments}</p>

            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Native units</p>
              <ul className="mt-3 space-y-2">
                {campaign.creative.sizes.map((format) => (
                  <li key={format} className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-navy/15">
                      <div className="h-2 w-full rounded-full bg-navy/40" />
                    </div>
                    <span className="shrink-0 text-[11px] font-medium text-slate-700">{format}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Typical device mix</p>
                <p className="mt-1 text-[10px] text-slate-500">Illustrative — updates with delivery</p>
                <div className="mt-3 h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={devicePieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={36}
                        outerRadius={58}
                        paddingAngle={2}
                      >
                        {[TTD.teal, TTD.navy, TTD.orangeLight].map((c, i) => (
                          <Cell key={i} fill={c} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          fontSize: 11,
                          border: '1px solid #e2e8f0',
                          borderRadius: 8,
                          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.09)',
                        }}
                        formatter={(v: number) => `${v.toFixed(1)}%`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Activation mix</p>
                <p className="mt-1 text-[10px] text-slate-500">Planning split for overview</p>
                <div className="mt-3 h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activationMix}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={36}
                        outerRadius={58}
                        paddingAngle={2}
                      >
                        {[TTD.teal, TTD.navy, TTD.orangeLight, '#94a3b8'].map((c, i) => (
                          <Cell key={i} fill={c} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          fontSize: 11,
                          border: '1px solid #e2e8f0',
                          borderRadius: 8,
                          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.09)',
                        }}
                        formatter={(v: number) => `${v}%`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Geo footprint — markets, not delivery mix */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Audience footprint</h2>
          <p className="mt-2 text-sm text-slate-600">{campaign.geo.headline}</p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Primary markets</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {campaign.geo.primaryMarkets.map((m) => (
                  <span
                    key={m}
                    className="rounded-md border border-navy/15 bg-navy/5 px-2.5 py-1 text-xs font-medium text-navy"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Secondary markets</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {campaign.geo.driveInMarkets.map((m) => (
                  <span
                    key={m}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What appears when live */}
        <section className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">When delivery starts</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            This view switches to the full performance dashboard — same campaign, live reporting grain.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Cumulative pacing curves',
              'Daily impression grain & CSV export',
              'Delivered impressions & flight completion %',
              'CTR, clicks, CPC KPIs',
              'Geo and format delivery mix',
              'Monthly delivery table (if applicable)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="reporting-creative"
          className="mt-8 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Click-through & assets</h3>
          <p className="mt-2 text-sm text-slate-600">{campaign.tracking.description}</p>
          <p className="mt-3 break-all rounded-lg bg-slate-50 p-3 text-xs text-navy underline">
            <a href={campaign.tracking.clickthroughUrl} target="_blank" rel="noreferrer">
              {campaign.tracking.clickthroughUrl}
            </a>
          </p>
          <p className="mt-4 text-sm font-medium text-navy">
            <a href={campaign.creative.assetsFolderUrl} target="_blank" rel="noreferrer">
              Creative assets folder →
            </a>
          </p>
        </section>

        <section id="reporting-audience-strategy" className="mt-8 scroll-mt-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Audience strategy</h3>
          <div className="mt-4 space-y-4">
            {campaign.audiences.map((bucket) => (
              <article key={bucket.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="text-base font-semibold text-slate-900">{bucket.label}</h4>
                <p className="mt-1 text-sm text-slate-600">{bucket.description}</p>
                <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
                  {bucket.cohorts.map((c) => (
                    <li key={c.title} className="flex gap-3 py-3 first:pt-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{c.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="reporting-schedule-report"
          className="mt-8 scroll-mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 shadow-sm"
        >
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Schedule report delivery</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Ask for recurring CSV exports or summary emails once the flight is live. We confirm cadence and recipients
            with your team.
          </p>
          <a
            href={`mailto:hello@vrvo.co?subject=${encodeURIComponent(`Report schedule: ${campaign.name}`)}&body=${encodeURIComponent(
              `Campaign: ${campaign.name} (${campaign.id})\nStatus: Prebooked — flight dates pending\n\nPreferred cadence:\nRecipients:\nNotes:\n`,
            )}`}
            className="mt-4 inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy/90"
          >
            Email hello@vrvo.co to schedule
          </a>
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-[10px] text-slate-500">
          Campaign ID {campaign.id} · Prebooked planning view — performance reporting pending flight start.
        </footer>
      </div>
    </div>
  )
}
