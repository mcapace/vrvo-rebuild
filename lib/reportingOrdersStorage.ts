import type { ScenarioPlannerInput } from '@/lib/reportingScenario'

/** Browser-only persistence for draft reporting orders (no server). */
export const REPORTING_ORDERS_STORAGE_KEY = 'vrvo_reporting_orders_v1'

/** Last order that should auto-run when reopening `/reporting/scenario` (if enabled). */
export const REPORTING_LAST_ACTIVE_ORDER_ID_KEY = 'vrvo_reporting_last_active_order_id'

/** `"1"` / `"0"` — when `"1"`, load last active order and run reporting on page open. */
export const REPORTING_AUTO_RUN_ON_LOAD_KEY = 'vrvo_reporting_auto_run_on_load_v1'

/** Milliseconds between automatic re-runs while the page stays open (`0` = off). */
export const REPORTING_AUTO_REFRESH_MS_KEY = 'vrvo_reporting_auto_refresh_ms_v1'

const MAX_ORDERS = 30

export function persistLastActiveOrderId(orderId: string | null): void {
  if (typeof window === 'undefined') return
  if (orderId) window.localStorage.setItem(REPORTING_LAST_ACTIVE_ORDER_ID_KEY, orderId)
  else window.localStorage.removeItem(REPORTING_LAST_ACTIVE_ORDER_ID_KEY)
}

export function loadLastActiveOrderId(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(REPORTING_LAST_ACTIVE_ORDER_ID_KEY)
}

export function loadAutoRunOnLoad(): boolean {
  if (typeof window === 'undefined') return true
  const v = window.localStorage.getItem(REPORTING_AUTO_RUN_ON_LOAD_KEY)
  if (v === null) return true
  return v === '1' || v === 'true'
}

export function saveAutoRunOnLoad(on: boolean): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(REPORTING_AUTO_RUN_ON_LOAD_KEY, on ? '1' : '0')
}

const ALLOWED_REFRESH_MS = new Set([0, 60_000, 300_000, 900_000])

export function loadAutoRefreshIntervalMs(): number {
  if (typeof window === 'undefined') return 0
  const v = Number(window.localStorage.getItem(REPORTING_AUTO_REFRESH_MS_KEY))
  return ALLOWED_REFRESH_MS.has(v) ? v : 0
}

export function saveAutoRefreshIntervalMs(ms: number): void {
  if (typeof window === 'undefined') return
  const v = ALLOWED_REFRESH_MS.has(ms) ? ms : 0
  window.localStorage.setItem(REPORTING_AUTO_REFRESH_MS_KEY, String(v))
}

/** Overwrite stored line item input for an order (e.g. after “Refresh reporting”). */
export function updateReportingOrderInput(orderId: string, input: ScenarioPlannerInput): void {
  if (typeof window === 'undefined') return
  const orders = loadReportingOrders()
  const ix = orders.findIndex((o) => o.orderId === orderId)
  if (ix < 0) return
  const next = [...orders]
  next[ix] = {
    ...orders[ix],
    input,
    label: orderLabelFromInput(input),
  }
  window.localStorage.setItem(REPORTING_ORDERS_STORAGE_KEY, JSON.stringify(next))
}

export type ReportingOrderRecord = {
  orderId: string
  createdAt: string
  label: string
  input: ScenarioPlannerInput
}

function safeParse(raw: string | null): ReportingOrderRecord[] {
  if (!raw) return []
  try {
    const data = JSON.parse(raw) as unknown
    if (!Array.isArray(data)) return []
    return data.filter(
      (o): o is ReportingOrderRecord =>
        o &&
        typeof o === 'object' &&
        typeof (o as ReportingOrderRecord).orderId === 'string' &&
        typeof (o as ReportingOrderRecord).createdAt === 'string' &&
        typeof (o as ReportingOrderRecord).label === 'string' &&
        typeof (o as ReportingOrderRecord).input === 'object',
    )
  } catch {
    return []
  }
}

export function loadReportingOrders(): ReportingOrderRecord[] {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(REPORTING_ORDERS_STORAGE_KEY))
}

export function saveReportingOrder(record: ReportingOrderRecord): void {
  if (typeof window === 'undefined') return
  const prev = loadReportingOrders()
  const next = [record, ...prev.filter((o) => o.orderId !== record.orderId)].slice(0, MAX_ORDERS)
  window.localStorage.setItem(REPORTING_ORDERS_STORAGE_KEY, JSON.stringify(next))
}

export function deleteReportingOrder(orderId: string): void {
  if (typeof window === 'undefined') return
  const next = loadReportingOrders().filter((o) => o.orderId !== orderId)
  window.localStorage.setItem(REPORTING_ORDERS_STORAGE_KEY, JSON.stringify(next))
  if (loadLastActiveOrderId() === orderId) {
    persistLastActiveOrderId(null)
  }
}

export function newReportingOrderId(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `VRVO-ORD-${y}${m}${day}-${rand}`
}

export function orderLabelFromInput(input: ScenarioPlannerInput): string {
  const acct = input.accountName.trim().slice(0, 48)
  const li = input.lineItemName.trim().slice(0, 40)
  return li ? `${acct} — ${li}` : acct
}
