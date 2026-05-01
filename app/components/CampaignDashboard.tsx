'use client'

import type { CampaignReport } from '@/lib/data/bigSmokeMiami'
import { useMemo, type ReactNode } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  LineChart,
  Area,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from 'recharts'

/** Palette inspired by DSP overview UIs (clean whites + navy + semantic chart hues). */
const TTD = {
  navy: '#1E3A5F',
  navyMuted: '#2C4F7C',
  teal: '#0d9488',
  orange: '#ea580c',
  orangeLight: '#fb923c',
  purple: '#7c3aed',
  slate: '#64748b',
  plan: '#94a3b8',
  grid: '#e2e8f0',
  qGood: 'rgba(16, 185, 129, 0.12)',
  qWarn: 'rgba(234, 179, 8, 0.12)',
  qBad: 'rgba(239, 68, 68, 0.1)',
  qInfo: 'rgba(59, 130, 246, 0.1)',
}

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n)
}

function formatPercent(n: number, fractionDigits = 1) {
  return `${n.toFixed(fractionDigits)}%`
}

function formatShortDate(iso: string) {
  const [, m, day] = iso.split('-')
  return `${m}/${day}`
}

function formatReportTs(iso: string) {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  }).format(d)
}

function bubbleFill(goal: number, pace: number): string {
  const gx = goal >= 90
  const py = pace >= 90
  if (gx && py) return '#10b981'
  if (!gx && py) return '#eab308'
  if (!gx && !py) return '#ef4444'
  return '#3b82f6'
}

export function CampaignDashboard({ campaign }: { campaign: CampaignReport }) {
  const { delivery, tradeDesk, performance } = campaign
  const deliveredImp = Math.round((delivery.impressionsPurchased * delivery.pctDelivered) / 100)
  const mediaCost = (deliveredImp / 1000) * delivery.cpmUsd
  const bookedSpend = (delivery.impressionsPurchased / 1000) * delivery.cpmUsd

  const totalClicks = useMemo(
    () => tradeDesk.daily.reduce((a, r) => a + r.clicks, 0),
    [tradeDesk.daily],
  )
  const blendedCtr =
    deliveredImp > 0 ? (totalClicks / deliveredImp) * 100 : performance.ctrPct
  const cpc = totalClicks > 0 ? mediaCost / totalClicks : 0

  const last7 = useMemo(() => tradeDesk.daily.slice(-7), [tradeDesk.daily])
  const prev7 = useMemo(() => tradeDesk.daily.slice(-14, -7), [tradeDesk.daily])

  const avgDailyLast7 =
    last7.length > 0 ? last7.reduce((a, r) => a + r.actualImp, 0) / last7.length : 0
  const avgDailyPrior7 =
    prev7.length > 0 ? prev7.reduce((a, r) => a + r.actualImp, 0) / prev7.length : 0
  const pacingWoW =
    avgDailyPrior7 > 0 ? ((avgDailyLast7 - avgDailyPrior7) / avgDailyPrior7) * 100 : 0

  const cumulativeChartData = useMemo(
    () =>
      tradeDesk.daily.map((d) => ({
        ...d,
        shortDate: formatShortDate(d.date),
        pacePct: d.paceIndex * 100 - 100,
      })),
    [tradeDesk.daily],
  )

  const spendAreaData = useMemo(
    () =>
      cumulativeChartData.map((d) => ({
        ...d,
        spendK: Math.round(d.cumulativeActual / 1000),
        forecastK: Math.round(d.cumulativePlanned / 1000),
      })),
    [cumulativeChartData],
  )

  const devicePieData = tradeDesk.deviceSplit.map((d) => ({
    name: d.device,
    value: d.sharePct,
  }))

  /** Modeled vs deterministic vs contextual — illustrative split for Big Smoke fixture. */
  const dataActivationPie = [
    { name: 'Modeled / scale', value: 52 },
    { name: 'Purchase / POS', value: 31 },
    { name: 'Contextual / lifestyle', value: 17 },
  ]

  const channelBars = useMemo(() => {
    const rows = [...tradeDesk.geoDelivery]
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 7)
      .map((g) => ({
        label: g.region.length > 18 ? `${g.region.slice(0, 16)}…` : g.region,
        imps: g.impressions,
      }))
    const max = Math.max(...rows.map((r) => r.imps), 1)
    return rows.map((r) => ({ ...r, pct: Math.round((r.imps / max) * 100) }))
  }, [tradeDesk.geoDelivery])

  const funnelTiers = useMemo(() => {
    const booked = delivery.impressionsPurchased
    const delivered = deliveredImp
    return [
      { label: 'Booked reach', value: booked, widthPct: 100 },
      { label: 'Delivered imps', value: delivered, widthPct: 72 },
      { label: 'Clicks', value: totalClicks, widthPct: 48 },
    ]
  }, [delivery.impressionsPurchased, deliveredImp, totalClicks])

  const bubbleData = useMemo(() => {
    const maxImp = Math.max(...tradeDesk.formatDelivery.map((f) => f.impressions), 1)
    return tradeDesk.formatDelivery.map((f, i) => {
      const goalOnTrack = Math.min(
        99,
        62 + (f.sharePct * 0.75 + (f.impressions / maxImp) * 28 + ((i * 13) % 9)),
      )
      const pacing = Math.min(99, 58 + (f.impressions / maxImp) * 38 + ((i * 7) % 12))
      return {
        name: f.format.replace(/×/g, '×'),
        goalOnTrack: Math.round(goalOnTrack * 10) / 10,
        pacing: Math.round(pacing * 10) / 10,
        spend: f.impressions,
        fill: bubbleFill(goalOnTrack, pacing),
      }
    })
  }, [tradeDesk.formatDelivery])

  const lastDay = tradeDesk.daily[tradeDesk.daily.length - 1]
  const varianceAhead = lastDay ? lastDay.cumulativeActual > lastDay.cumulativePlanned : false

  return (
    <div
      data-reporting-dashboard="v3-dsp-overview"
      className="min-h-screen bg-white pb-12 font-body shadow-[0_0_0_1px_rgba(15,23,42,0.06)] sm:mx-auto sm:max-w-[1420px] sm:rounded-b-xl"
    >
      {/* Build marker — remove after confirming CDN/clients pick up new chunks */}
      <div
        className="bg-gradient-to-r from-teal-500 via-navy to-amber-500 px-4 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-inner"
        role="status"
      >
        Reporting overview v3 · Missing this stripe = stale cache — hard refresh or Incognito
      </div>
      {/* Utility ribbon — DSP-style shortcuts */}
      <div className="border-b border-navy/80 bg-navy">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-1 px-3 py-2 text-[11px] font-medium text-white/95 sm:px-5">
          <span className="rounded-sm px-2 py-1 hover:bg-white/10">Export</span>
          <span className="text-white/40">|</span>
          <span className="rounded-sm px-2 py-1 hover:bg-white/10">Schedule report</span>
          <span className="text-white/40">|</span>
          <span className="rounded-sm px-2 py-1 hover:bg-white/10">Line items</span>
          <span className="text-white/40">|</span>
          <span className="rounded-sm px-2 py-1 hover:bg-white/10">Creative</span>
          <span className="ml-auto tabular-nums text-white/70">
            IO {tradeDesk.meta.ioNumber}
          </span>
        </div>
      </div>

      {/* Welcome row */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6">
          <p className="text-sm text-slate-600">Welcome back — partner overview</p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[26px]">
                {campaign.name}
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600">{campaign.flight.summary}</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>
                Last refresh{' '}
                <span className="font-medium text-slate-800">
                  {formatReportTs(tradeDesk.meta.reportGeneratedAt)}
                </span>
              </div>
              <div className="mt-0.5">{tradeDesk.meta.lineItem}</div>
            </div>
          </div>

          {/* KPI strip */}
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-4 lg:grid-cols-8">
            <SnapshotCell label="Booked imps" value={formatNumber(delivery.impressionsPurchased)} />
            <SnapshotCell label="Delivered imps" value={formatNumber(deliveredImp)} accent />
            <SnapshotCell label="Flight completion" value={formatPercent(delivery.pctDelivered, 0)} />
            <SnapshotCell label="Est. spend (del.)" value={`$${formatNumber(Math.round(mediaCost * 100) / 100)}`} />
            <SnapshotCell label="Booked value" value={`$${formatNumber(Math.round(bookedSpend * 100) / 100)}`} />
            <SnapshotCell label="CTR" value={formatPercent(blendedCtr, 3)} />
            <SnapshotCell label="Clicks" value={formatNumber(totalClicks)} />
            <SnapshotCell label="CPC" value={`$${cpc.toFixed(3)}`} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          Live campaign overview
        </h2>

        {/* Four overview cards — Trade Desk–style */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            eyebrow="Objectives"
            headline={`${delivery.pctDelivered}% of booked impressions delivered.`}
            sub="Awareness + ticket-path display extension."
            footer="View flight detail"
          >
            <div className="flex flex-col items-center gap-2 pt-1">
              {funnelTiers.map((t, i) => (
                <div key={t.label} className="flex w-full flex-col items-center">
                  <div
                    className="flex h-10 items-center justify-center rounded-sm text-center text-[11px] font-semibold text-white shadow-inner transition-all"
                    style={{
                      width: `${t.widthPct}%`,
                      background: i === 0 ? TTD.orange : i === 1 ? TTD.orangeLight : '#fdba74',
                    }}
                  >
                    {formatNumber(t.value)}
                  </div>
                  <span className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">{t.label}</span>
                </div>
              ))}
            </div>
          </OverviewCard>

          <OverviewCard
            eyebrow="Spend & pacing"
            headline={`${formatPercent(delivery.pctDelivered, 0)} of booked volume delivered.`}
            sub={`Booked media ~ $${formatNumber(Math.round(bookedSpend))} · Actual spend ~ $${formatNumber(Math.round(mediaCost))}`}
            footer="View pacing curve"
          >
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={spendAreaData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={TTD.teal} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={TTD.teal} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="spendK"
                    stroke={TTD.teal}
                    fill="url(#spendFill)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecastK"
                    stroke="#dc2626"
                    strokeDasharray="5 5"
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <XAxis dataKey="shortDate" tick={{ fontSize: 9 }} stroke={TTD.slate} hide />
                  <YAxis tick={{ fontSize: 9 }} stroke={TTD.slate} width={28} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1 text-center text-[10px] text-slate-400">
              Teal = cumulative delivered (000s) · Red dashed = planned cumulative
            </p>
          </OverviewCard>

          <OverviewCard
            eyebrow="Delivery by region"
            headline={`${channelBars[0]?.label ?? 'Geo'} leads impression mix.`}
            sub={campaign.geo.headline}
            footer="View geo breakdown"
          >
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={channelBars}
                  layout="vertical"
                  margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="label" width={78} tick={{ fontSize: 9 }} stroke={TTD.slate} />
                  <Bar dataKey="imps" fill={TTD.teal} radius={[0, 3, 3, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </OverviewCard>

          <OverviewCard
            eyebrow="Audience data"
            headline="Layered cohorts across modeled, purchase, and contextual signals."
            sub="Fixture split illustrative of activation paths."
            footer="View audience deals"
          >
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataActivationPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={62}
                    paddingAngle={2}
                  >
                    {[TTD.purple, TTD.navy, TTD.orangeLight].map((c, i) => (
                      <Cell key={i} fill={c} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </OverviewCard>
        </div>

        {/* Quadrant performance — creative “lines” as bubbles */}
        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Live campaign performance
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Creative sizes plotted by pacing health vs delivery-to-goal proxy (fixture). Bubble area ∝
                impressions. Reference lines at 90%.
              </p>
            </div>
            <p className="text-[11px] text-slate-400">Click markers in live DSP — here, hover for detail</p>
          </div>

          <div className="relative mt-4 h-[380px] w-full">
            <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-2 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              <div className="flex items-start justify-start p-2">Goal at risk · Pacing ok</div>
              <div className="flex items-start justify-end p-2">Goal on track · Pacing ok</div>
              <div className="flex items-end justify-start p-2">Goal at risk · Pacing risk</div>
              <div className="flex items-end justify-end p-2">Goal on track · Pacing risk</div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
                <CartesianGrid stroke={TTD.grid} strokeDasharray="4 4" />
                <ReferenceArea x1={0} x2={90} y1={90} y2={100} fill={TTD.qWarn} />
                <ReferenceArea x1={90} x2={100} y1={90} y2={100} fill={TTD.qGood} />
                <ReferenceArea x1={0} x2={90} y1={0} y2={90} fill={TTD.qBad} />
                <ReferenceArea x1={90} x2={100} y1={0} y2={90} fill={TTD.qInfo} />
                <XAxis
                  type="number"
                  dataKey="goalOnTrack"
                  name="Goal proxy"
                  domain={[40, 100]}
                  tick={{ fontSize: 10, fill: TTD.slate }}
                  stroke={TTD.slate}
                  label={{ value: 'Delivery / goal health →', position: 'bottom', offset: 0, fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="pacing"
                  name="Pacing"
                  domain={[40, 100]}
                  tick={{ fontSize: 10, fill: TTD.slate }}
                  stroke={TTD.slate}
                  label={{ value: 'Pacing health', angle: -90, position: 'insideLeft', fontSize: 11 }}
                />
                <ZAxis type="number" dataKey="spend" range={[60, 320]} />
                <ReferenceLine
                  x={90}
                  stroke="#64748b"
                  strokeDasharray="4 4"
                  label={{ value: '90% goal', position: 'top', fontSize: 10, fill: TTD.slate }}
                />
                <ReferenceLine
                  y={90}
                  stroke="#64748b"
                  strokeDasharray="4 4"
                  label={{ value: '90% pace', position: 'right', fontSize: 10, fill: TTD.slate }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ fontSize: 11 }}
                  formatter={(value: number, name: string, props: { payload?: { name?: string } }) => {
                    if (name === 'spend') return [formatNumber(Math.round(value)), 'Impressions']
                    return [value, name]
                  }}
                  labelFormatter={() => ''}
                  labelStyle={{ display: 'none' }}
                />
                <Scatter name="Creatives" data={bubbleData} fill={TTD.teal}>
                  {bubbleData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} stroke="#fff" strokeWidth={1} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Secondary metrics */}
        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Trailing 7-day pace</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-900">
              {formatNumber(Math.round(avgDailyLast7))}
              <span className="ml-2 text-sm font-normal text-slate-500">imps / day</span>
            </p>
            <p className="mt-2 text-xs text-slate-600">
              vs prior 7d{' '}
              <span className={pacingWoW >= 0 ? 'font-semibold text-emerald-600' : 'font-semibold text-rose-600'}>
                {pacingWoW >= 0 ? '+' : ''}
                {pacingWoW.toFixed(1)}%
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Linear flight pacing</p>
            <p className="mt-2 text-sm leading-snug text-slate-700">
              {tradeDesk.meta.flightPlannedDays}-day linear plan ·{' '}
              <span className={varianceAhead ? 'font-semibold text-emerald-700' : 'font-semibold text-amber-700'}>
                {varianceAhead ? 'Ahead of curve' : 'Monitor'}
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Measurement</p>
            <p className="mt-2 text-sm leading-snug text-slate-600">{performance.measurementNote}</p>
          </div>
        </section>

        {/* Detailed charts — full width */}
        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Cumulative impression pacing
          </h3>
          <div className="mt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={cumulativeChartData} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={TTD.grid} vertical={false} />
                <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke={TTD.slate} />
                <YAxis
                  tick={{ fontSize: 10 }}
                  stroke={TTD.slate}
                  tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`)}
                />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="cumulativePlanned"
                  name="Planned cumulative"
                  stroke={TTD.plan}
                  fill={TTD.grid}
                  fillOpacity={0.45}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeActual"
                  name="Actual cumulative"
                  stroke={TTD.navy}
                  strokeWidth={2}
                  dot={false}
                />
                <ReferenceLine
                  y={delivery.impressionsPurchased}
                  stroke="#dc2626"
                  strokeDasharray="4 4"
                  label={{ value: 'Booked cap', fontSize: 10, fill: '#991b1b' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Daily delivery vs plan
          </h3>
          <div className="mt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={cumulativeChartData.map((d) => ({ ...d, variance: d.actualImp - d.plannedImp }))}
                margin={{ top: 8, right: 16, left: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={TTD.grid} vertical={false} />
                <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke={TTD.slate} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke={TTD.slate} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="actualImp" name="Actual imps" fill={TTD.navy} radius={[2, 2, 0, 0]} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="plannedImp"
                  name="Planned daily slice"
                  stroke={TTD.slate}
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">CTR trend</h3>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulativeChartData} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={TTD.grid} vertical={false} />
                  <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke={TTD.slate} />
                  <YAxis tick={{ fontSize: 10 }} stroke={TTD.slate} tickFormatter={(v) => `${v.toFixed(2)}%`} />
                  <Tooltip contentStyle={{ fontSize: 11 }} formatter={(v: number) => [`${v.toFixed(3)}%`, 'CTR']} />
                  <ReferenceLine y={performance.ctrPct} stroke="#059669" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="ctr" name="CTR" stroke={TTD.navyMuted} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Pace index vs plan</h3>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulativeChartData} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={TTD.grid} vertical={false} />
                  <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke={TTD.slate} />
                  <YAxis tick={{ fontSize: 10 }} stroke={TTD.slate} tickFormatter={(v) => `${v.toFixed(0)}%`} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <ReferenceLine y={0} stroke={TTD.slate} />
                  <Line type="monotone" dataKey="pacePct" name="Δ vs plan" stroke="#b45309" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Geo mix
            </h3>
            <p className="mt-2 text-[11px] text-slate-500">{campaign.geo.headline}</p>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tradeDesk.geoDelivery.map((g) => ({
                    ...g,
                    label: g.region.length > 14 ? `${g.region.slice(0, 12)}…` : g.region,
                  }))}
                  layout="vertical"
                  margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={TTD.grid} horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke={TTD.slate} />
                  <YAxis type="category" dataKey="label" width={96} tick={{ fontSize: 10 }} stroke={TTD.slate} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Bar dataKey="impressions" fill={TTD.navy} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Format mix
            </h3>
            <p className="mt-2 text-[11px] text-slate-500">{campaign.creative.environments}</p>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tradeDesk.formatDelivery} margin={{ top: 4, right: 8, left: 8, bottom: 48 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={TTD.grid} vertical={false} />
                  <XAxis dataKey="format" tick={{ fontSize: 9 }} stroke={TTD.slate} angle={-35} textAnchor="end" height={56} />
                  <YAxis tick={{ fontSize: 10 }} stroke={TTD.slate} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Bar dataKey="impressions" fill={TTD.navyMuted} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Device share
            </h3>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={devicePieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={78}
                    paddingAngle={2}
                  >
                    {[TTD.navy, TTD.navyMuted, TTD.grid].map((c, i) => (
                      <Cell key={i} fill={c} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Daily table */}
        <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">Daily grain · export</h3>
            <p className="mt-1 text-[11px] text-slate-500">Fixture series — swap for warehouse / DSP pulls.</p>
          </div>
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-xs">
              <thead className="sticky top-0 z-10 bg-slate-100 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-2">Date</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">Planned</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">Actual</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">Δ</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">Clicks</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">CTR</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">Cum act.</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">Cum plan</th>
                  <th className="border-b border-slate-200 px-2 py-2 text-right">Pace %</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {tradeDesk.daily.map((row) => {
                  const delta = row.actualImp - row.plannedImp
                  return (
                    <tr key={row.date} className="border-b border-slate-100 hover:bg-slate-50/90">
                      <td className="whitespace-nowrap px-3 py-1.5 text-slate-600">{row.date}</td>
                      <td className="px-2 py-1.5 text-right tabular-nums">{formatNumber(row.plannedImp)}</td>
                      <td className="px-2 py-1.5 text-right tabular-nums font-medium">{formatNumber(row.actualImp)}</td>
                      <td
                        className={`px-2 py-1.5 text-right tabular-nums ${
                          delta >= 0 ? 'text-emerald-800' : 'text-rose-800'
                        }`}
                      >
                        {delta >= 0 ? '+' : ''}
                        {formatNumber(delta)}
                      </td>
                      <td className="px-2 py-1.5 text-right tabular-nums">{formatNumber(row.clicks)}</td>
                      <td className="px-2 py-1.5 text-right tabular-nums">{row.ctr.toFixed(3)}%</td>
                      <td className="px-2 py-1.5 text-right tabular-nums text-slate-600">
                        {formatNumber(row.cumulativeActual)}
                      </td>
                      <td className="px-2 py-1.5 text-right tabular-nums text-slate-600">
                        {formatNumber(row.cumulativePlanned)}
                      </td>
                      <td className="px-2 py-1.5 text-right tabular-nums">
                        {(row.paceIndex * 100).toFixed(1)}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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

        <section className="mt-8">
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

        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-[10px] text-slate-500">
          Fixture campaign ID {campaign.id} · UI aligned to common DSP overview patterns — not affiliated with The Trade Desk.
        </footer>
      </div>
    </div>
  )
}

function SnapshotCell({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className={`bg-white px-3 py-3 sm:px-4 ${accent ? 'ring-1 ring-inset ring-teal-600/20' : ''}`}>
      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p
        className={`mt-1 text-base tabular-nums sm:text-lg ${accent ? 'font-semibold text-navy' : 'font-medium text-slate-900'}`}
      >
        {value}
      </p>
    </div>
  )
}

function OverviewCard({
  eyebrow,
  headline,
  sub,
  footer,
  children,
}: {
  eyebrow: string
  headline: string
  sub?: string
  footer: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-[280px] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{eyebrow}</p>
      <p className="mt-2 text-[15px] font-semibold leading-snug text-slate-900">{headline}</p>
      {sub ? <p className="mt-2 text-[11px] leading-snug text-slate-500">{sub}</p> : null}
      <div className="mt-3 flex flex-1 flex-col">{children}</div>
      <button
        type="button"
        className="mt-3 text-left text-[11px] font-semibold uppercase tracking-wide text-navy hover:underline"
      >
        {footer}
      </button>
    </div>
  )
}
