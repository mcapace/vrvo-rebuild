import type { ScenarioPlannerInput } from '@/lib/reportingScenario'

/** Browser-only persistence for draft reporting orders (no server). */
export const REPORTING_ORDERS_STORAGE_KEY = 'vrvo_reporting_orders_v1'

const MAX_ORDERS = 30

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
