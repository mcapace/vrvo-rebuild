'use client'

import type { CampaignReport } from '@/lib/data/bigSmokeMiami'
import { useMemo } from 'react'
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
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const CHART_COLORS = {
  navy: '#1E3A5F',
  navyLight: '#2C4F7C',
  slate: '#64748b',
  plan: '#94a3b8',
  positive: '#059669',
  muted: '#cbd5e1',
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

  const devicePieData = tradeDesk.deviceSplit.map((d) => ({
    name: d.device,
    value: d.sharePct,
  }))

  const lastDay = tradeDesk.daily[tradeDesk.daily.length - 1]
  const varianceAhead = lastDay ? lastDay.cumulativeActual > lastDay.cumulativePlanned : false

  return (
    <div className="mx-auto max-w-[1400px] px-3 py-6 sm:px-5 lg:px-8">
      {/* Masthead */}
      <div className="border border-gray-900 bg-gray-950 px-4 py-4 text-white shadow-lg sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
              VRVO · Trade desk · Display · Performance report
            </p>
            <h1 className="mt-2 max-w-4xl font-light text-2xl tracking-tight text-white sm:text-3xl">
              {campaign.name}
            </h1>
            <p className="mt-2 font-mono text-xs text-gray-400">
              IO <span className="text-gray-200">{tradeDesk.meta.ioNumber}</span>
              <span className="mx-2 text-gray-600">|</span>
              Line item <span className="text-gray-200">{tradeDesk.meta.lineItem}</span>
            </p>
          </div>
          <dl className="text-right font-mono text-xs leading-relaxed text-gray-400">
            <div>
              Report as-of{' '}
              <span className="text-emerald-400">{formatReportTs(tradeDesk.meta.reportGeneratedAt)}</span>
            </div>
            <div className="mt-1">
              Flight Day grain · Last closed date{' '}
              <span className="text-gray-200">{formatShortDate(tradeDesk.meta.lastDataDate)}</span>
            </div>
            <div className="mt-1">
              DSP path · <span className="text-gray-300">{tradeDesk.meta.dsp}</span>
            </div>
          </dl>
        </div>
      </div>

      {/* Snapshot KPIs */}
      <section className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 lg:grid-cols-4 xl:grid-cols-8">
        <SnapshotCell label="Booked imps" value={formatNumber(delivery.impressionsPurchased)} />
        <SnapshotCell label="Delivered imps" value={formatNumber(deliveredImp)} accent />
        <SnapshotCell label="Flight completion" value={formatPercent(delivery.pctDelivered, 0)} />
        <SnapshotCell label="Est. media cost (del.)" value={`$${formatNumber(Math.round(mediaCost * 100) / 100)}`} />
        <SnapshotCell label="Booked media value" value={`$${formatNumber(Math.round(bookedSpend * 100) / 100)}`} />
        <SnapshotCell label="Blended CTR" value={formatPercent(blendedCtr, 3)} />
        <SnapshotCell label="Clicks (reported)" value={formatNumber(totalClicks)} />
        <SnapshotCell label="Net CPC" value={`$${cpc.toFixed(3)}`} />
      </section>

      <section className="mt-3 grid gap-3 lg:grid-cols-3">
        <div className="rounded-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500">Avg daily delivery</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-xl tabular-nums text-gray-900">
              {formatNumber(Math.round(avgDailyLast7))}
            </span>
            <span className="text-xs text-gray-500">imps · trailing 7d</span>
          </div>
          <p className="mt-2 font-mono text-xs text-gray-600">
            vs prior 7d{' '}
            <span className={pacingWoW >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
              {pacingWoW >= 0 ? '+' : ''}
              {pacingWoW.toFixed(1)}%
            </span>
          </p>
        </div>
        <div className="rounded-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500">Pacing vs linear flight curve</p>
          <p className="mt-1 font-mono text-sm leading-snug text-gray-800">
            Cumulative delivery vs planned cumulative curve ({tradeDesk.meta.flightPlannedDays}d assumed flight
            window).
          </p>
          <p className="mt-2 font-mono text-xs text-gray-600">
            Status:{' '}
            <span className={varianceAhead ? 'font-semibold text-emerald-700' : 'font-semibold text-amber-700'}>
              {varianceAhead ? 'Ahead of curve' : 'Behind / monitor'}
            </span>
          </p>
        </div>
        <div className="rounded-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500">Measurement scope</p>
          <p className="mt-1 text-sm leading-snug text-gray-700">{performance.measurementNote}</p>
        </div>
      </section>

      {/* Cumulative pacing */}
      <section className="mt-6 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
              Cumulative impression pacing
            </h2>
            <p className="mt-1 font-mono text-xs text-gray-500">
              Actual cumulative vs planned cumulative (linear pacing across booked volume).
            </p>
          </div>
        </div>
        <div className="mt-4 h-[300px] w-full font-mono">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cumulativeChartData} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke="#64748b" />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke="#64748b"
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`)}
              />
              <Tooltip
                contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                formatter={(value: number, name: string) => [
                  name.includes('Planned') || name.includes('Actual')
                    ? formatNumber(Math.round(value))
                    : value.toFixed(2),
                  name,
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="cumulativePlanned"
                name="Planned cumulative"
                stroke={CHART_COLORS.plan}
                fill={CHART_COLORS.muted}
                fillOpacity={0.35}
              />
              <Line
                type="monotone"
                dataKey="cumulativeActual"
                name="Actual cumulative"
                stroke={CHART_COLORS.navy}
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine
                y={delivery.impressionsPurchased}
                stroke="#dc2626"
                strokeDasharray="4 4"
                label={{ value: 'Booked cap', position: 'insideTopRight', fill: '#991b1b', fontSize: 10 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Daily delivery */}
      <section className="mt-6 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
            Daily delivery · imps & variance to daily plan
          </h2>
          <p className="mt-1 font-mono text-xs text-gray-500">
            Bars = actual delivered imps by day; line = that day&apos;s planned slice from linear flight pacing.
          </p>
        </div>
        <div className="mt-4 h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={cumulativeChartData.map((d) => ({
                ...d,
                variance: d.actualImp - d.plannedImp,
              }))}
              margin={{ top: 8, right: 16, left: 4, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke="#64748b" />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke="#64748b" />
              <Tooltip
                contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                formatter={(value: number, name: string) => [
                  formatNumber(Math.round(value)),
                  name,
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="actualImp" name="Actual imps" fill={CHART_COLORS.navy} radius={[2, 2, 0, 0]} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="plannedImp"
                name="Planned daily slice"
                stroke={CHART_COLORS.slate}
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {/* CTR trend */}
        <section className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
              CTR trend · daily
            </h2>
            <p className="mt-1 font-mono text-xs text-gray-500">
              Vendor-reported daily CTR (fixture variance around blended {formatPercent(performance.ctrPct, 3)}).
            </p>
          </div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeChartData} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 10 }}
                  stroke="#64748b"
                  tickFormatter={(v) => `${v.toFixed(2)}%`}
                />
                <Tooltip
                  contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                  formatter={(value: number) => [`${value.toFixed(3)}%`, 'CTR']}
                />
                <ReferenceLine
                  y={performance.ctrPct}
                  stroke={CHART_COLORS.positive}
                  strokeDasharray="4 4"
                  label={{ value: 'Blended avg', fontSize: 10, fill: CHART_COLORS.positive }}
                />
                <Line
                  type="monotone"
                  dataKey="ctr"
                  name="CTR"
                  stroke={CHART_COLORS.navyLight}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Pace index */}
        <section className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
              Pace index · cumulative actual ÷ cumulative planned
            </h2>
            <p className="mt-1 font-mono text-xs text-gray-500">
              {'>'}100% = ahead of straight-line flight pacing at that date.
            </p>
          </div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeChartData} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="shortDate" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748b" tickFormatter={(v) => `${v.toFixed(0)}%`} />
                <Tooltip
                  contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Δ vs plan']}
                />
                <ReferenceLine y={0} stroke="#64748b" />
                <Line
                  type="monotone"
                  dataKey="pacePct"
                  name="Pace delta"
                  stroke="#b45309"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Geo + format + device */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h2 className="border-b border-gray-100 pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
            Geo delivery · imps
          </h2>
          <p className="mt-2 font-mono text-xs text-gray-500">{campaign.geo.headline}</p>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tradeDesk.geoDelivery.map((g) => ({
                  ...g,
                  label: g.region.length > 14 ? `${g.region.slice(0, 12)}…` : g.region,
                }))}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis type="category" dataKey="label" width={100} tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                  formatter={(value: number, _name, item) => {
                    const share = (item?.payload as { sharePct?: number })?.sharePct
                    const pct = typeof share === 'number' ? share.toFixed(1) : '—'
                    return [`${formatNumber(Math.round(value))} (${pct}%)`, 'Impressions']
                  }}
                />
                <Bar dataKey="impressions" fill={CHART_COLORS.navy} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h2 className="border-b border-gray-100 pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
            Format mix · imps
          </h2>
          <p className="mt-2 font-mono text-xs text-gray-500">{campaign.creative.environments}</p>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradeDesk.formatDelivery} margin={{ top: 4, right: 8, left: 8, bottom: 48 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="format"
                  tick={{ fontSize: 9 }}
                  stroke="#64748b"
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                />
                <Bar dataKey="impressions" fill={CHART_COLORS.navyLight} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h2 className="border-b border-gray-100 pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
            Device split · impression share
          </h2>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devicePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={88}
                  paddingAngle={1}
                >
                  {[CHART_COLORS.navy, CHART_COLORS.navyLight, CHART_COLORS.muted].map((c, i) => (
                    <Cell key={i} fill={c} stroke="#fff" strokeWidth={1} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Daily grid */}
      <section className="mt-6 rounded-sm border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
            Daily grain · export view
          </h2>
          <p className="mt-1 font-mono text-xs text-gray-500">
            All figures fixture-generated for UI wiring; replace with live warehouse / DSP pulls.
          </p>
        </div>
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full min-w-[900px] border-collapse text-left font-mono text-xs">
            <thead className="sticky top-0 z-10 bg-gray-100 text-[10px] uppercase tracking-wider text-gray-600">
              <tr>
                <th className="border-b border-gray-200 px-3 py-2">Date</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">Planned</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">Actual</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">Δ</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">Clicks</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">CTR</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">Cum actual</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">Cum plan</th>
                <th className="border-b border-gray-200 px-2 py-2 text-right">Pace idx</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {tradeDesk.daily.map((row) => {
                const delta = row.actualImp - row.plannedImp
                return (
                  <tr key={row.date} className="border-b border-gray-100 hover:bg-gray-50/80">
                    <td className="whitespace-nowrap px-3 py-1.5 text-gray-600">{row.date}</td>
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
                    <td className="px-2 py-1.5 text-right tabular-nums text-gray-600">
                      {formatNumber(row.cumulativeActual)}
                    </td>
                    <td className="px-2 py-1.5 text-right tabular-nums text-gray-600">
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

      {/* Tracking + audiences */}
      <section className="mt-6 rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
          Click-through & assets
        </h2>
        <p className="mt-2 text-sm text-gray-600">{campaign.tracking.description}</p>
        <p className="mt-3 break-all rounded-sm bg-gray-50 p-3 font-mono text-xs">
          <a
            href={campaign.tracking.clickthroughUrl}
            className="text-navy underline decoration-navy/30 underline-offset-2 hover:decoration-navy"
            target="_blank"
            rel="noreferrer"
          >
            {campaign.tracking.clickthroughUrl}
          </a>
        </p>
        <p className="mt-4 text-sm">
          <a
            href={campaign.creative.assetsFolderUrl}
            className="font-medium text-navy hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Creative assets folder (Drive) →
          </a>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-900">
          Audience strategy · deal summary
        </h2>
        <div className="mt-4 space-y-6">
          {campaign.audiences.map((bucket) => (
            <article key={bucket.id} className="rounded-sm border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">{bucket.label}</h3>
              <p className="mt-1 text-sm text-gray-600">{bucket.description}</p>
              <ul className="mt-4 divide-y divide-gray-100 border-t border-gray-100">
                {bucket.cohorts.map((c) => (
                  <li key={c.title} className="flex gap-3 py-3 first:pt-4">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{c.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-gray-200 pt-6 text-center font-mono text-[10px] text-gray-500">
        Fixture campaign ID {campaign.id} · Replace series with production data pipeline when wired.
      </footer>
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
    <div className={`bg-white px-3 py-3 sm:px-4 ${accent ? 'ring-1 ring-inset ring-navy/15' : ''}`}>
      <p className="font-mono text-[9px] uppercase leading-tight tracking-wider text-gray-500">{label}</p>
      <p
        className={`mt-1.5 font-mono text-base tabular-nums sm:text-lg ${accent ? 'font-semibold text-navy' : 'text-gray-900'}`}
      >
        {value}
      </p>
    </div>
  )
}
