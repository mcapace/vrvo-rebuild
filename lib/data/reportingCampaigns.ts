import type { CampaignReport } from './bigSmokeMiami'
import { arizonaOfficeOfTourismCampaign } from './arizonaOfficeOfTourism'
import { bigSmokeMiamiCampaign } from './bigSmokeMiami'
import { casaDragonesWhiskyAdvocateCampaign } from './casaDragonesWhiskyAdvocate'
import { duckhornWineSpectatorCampaign } from './duckhornWineSpectator'
import { internalRandomFixtureCampaign } from './internalRandomFixture'

export type ReportingCampaignNavItem = {
  key: string
  label: string
  href: string
}

/** Slug → fixture (aliases share one report). */
const CAMPAIGN_BY_KEY: Record<string, CampaignReport> = {
  arizona: arizonaOfficeOfTourismCampaign,
  'casa-dragones': casaDragonesWhiskyAdvocateCampaign,
  casa: casaDragonesWhiskyAdvocateCampaign,
  dragones: casaDragonesWhiskyAdvocateCampaign,
  duckhorn: duckhornWineSpectatorCampaign,
  'duckhorn-ws': duckhornWineSpectatorCampaign,
  'wine-spectator': duckhornWineSpectatorCampaign,
  random: internalRandomFixtureCampaign,
  test: internalRandomFixtureCampaign,
  qa: internalRandomFixtureCampaign,
}

export const REPORTING_CAMPAIGN_NAV: ReportingCampaignNavItem[] = [
  { key: 'big-smoke', label: 'Big Smoke Miami', href: '/reporting?campaign=big-smoke' },
  { key: 'arizona', label: 'Arizona Office of Tourism', href: '/reporting?campaign=arizona' },
  { key: 'casa-dragones', label: 'Casa Dragones — Whisky Advocate', href: '/reporting?campaign=casa-dragones' },
  { key: 'duckhorn', label: 'Duckhorn — Wine Spectator', href: '/reporting?campaign=duckhorn' },
  { key: 'random', label: 'QA random', href: '/reporting?campaign=random' },
]

export function resolveReportingCampaign(campaignParam: string | undefined): {
  campaign: CampaignReport
  activeNavKey: string
} {
  const campaignKey = typeof campaignParam === 'string' ? campaignParam.trim().toLowerCase() : ''

  if (campaignKey === 'big-smoke' || campaignKey === 'bsm') {
    return { campaign: bigSmokeMiamiCampaign, activeNavKey: 'big-smoke' }
  }
  if (campaignKey === 'arizona') {
    return { campaign: arizonaOfficeOfTourismCampaign, activeNavKey: 'arizona' }
  }
  if (campaignKey === 'casa-dragones' || campaignKey === 'casa' || campaignKey === 'dragones') {
    return { campaign: casaDragonesWhiskyAdvocateCampaign, activeNavKey: 'casa-dragones' }
  }
  if (
    campaignKey === 'duckhorn' ||
    campaignKey === 'duckhorn-ws' ||
    campaignKey === 'wine-spectator'
  ) {
    return { campaign: duckhornWineSpectatorCampaign, activeNavKey: 'duckhorn' }
  }
  if (campaignKey === 'random' || campaignKey === 'test' || campaignKey === 'qa') {
    return { campaign: internalRandomFixtureCampaign, activeNavKey: 'random' }
  }

  // Legacy default: bare `/reporting` → Big Smoke (unchanged for existing bookmarks).
  if (!campaignKey) {
    return { campaign: bigSmokeMiamiCampaign, activeNavKey: 'big-smoke' }
  }

  const fallback = CAMPAIGN_BY_KEY[campaignKey]
  if (fallback) {
    return { campaign: fallback, activeNavKey: campaignKey }
  }

  return { campaign: bigSmokeMiamiCampaign, activeNavKey: 'big-smoke' }
}
