import type { CampaignReport } from './bigSmokeMiami'
import { arizonaOfficeOfTourismCampaign } from './arizonaOfficeOfTourism'
import { bigSmokeMiamiCampaign } from './bigSmokeMiami'
import { casaDragonesWhiskyAdvocateCampaign } from './casaDragonesWhiskyAdvocate'
import { duckhornWineSpectatorCampaign } from './duckhornWineSpectator'
import { internalRandomFixtureCampaign } from './internalRandomFixture'
import {
  bibTuckerWaNativeCampaign,
  cigarAficionadoPodcastCampaign,
  davidoffCaNativeCampaign,
  glenmorangieNativeCampaign,
  laAuroraCaNativeCampaign,
  pereladaWsNativeCampaign,
  pernod90ClubNativeCampaign,
} from './mShankenNativeInvoices'

export type ReportingCampaignNavItem = {
  key: string
  label: string
  href: string
}

type CampaignRoute = {
  campaign: CampaignReport
  navKey: string
}

/** Query-param keys and invoice order aliases → campaign. */
const M_SHANKEN_ROUTES: Record<string, CampaignRoute> = {
  'pernod-90-club': { campaign: pernod90ClubNativeCampaign, navKey: 'pernod-90-club' },
  pernod: { campaign: pernod90ClubNativeCampaign, navKey: 'pernod-90-club' },
  '3g7viwill-7278': { campaign: pernod90ClubNativeCampaign, navKey: 'pernod-90-club' },
  glenmorangie: { campaign: glenmorangieNativeCampaign, navKey: 'glenmorangie-native' },
  'glenmorangie-native': { campaign: glenmorangieNativeCampaign, navKey: 'glenmorangie-native' },
  '3g7viwill-7279': { campaign: glenmorangieNativeCampaign, navKey: 'glenmorangie-native' },
  davidoff: { campaign: davidoffCaNativeCampaign, navKey: 'davidoff-ca' },
  'davidoff-ca': { campaign: davidoffCaNativeCampaign, navKey: 'davidoff-ca' },
  '3g7viwill-7280': { campaign: davidoffCaNativeCampaign, navKey: 'davidoff-ca' },
  'la-aurora': { campaign: laAuroraCaNativeCampaign, navKey: 'la-aurora-ca' },
  'la-aurora-ca': { campaign: laAuroraCaNativeCampaign, navKey: 'la-aurora-ca' },
  '3g7viwill-7281': { campaign: laAuroraCaNativeCampaign, navKey: 'la-aurora-ca' },
  'bib-tucker': { campaign: bibTuckerWaNativeCampaign, navKey: 'bib-tucker-wa' },
  'bib-tucker-wa': { campaign: bibTuckerWaNativeCampaign, navKey: 'bib-tucker-wa' },
  '3g7viwill-7282': { campaign: bibTuckerWaNativeCampaign, navKey: 'bib-tucker-wa' },
  perelada: { campaign: pereladaWsNativeCampaign, navKey: 'perelada-ws' },
  'perelada-ws': { campaign: pereladaWsNativeCampaign, navKey: 'perelada-ws' },
  '3g7viwill-7283': { campaign: pereladaWsNativeCampaign, navKey: 'perelada-ws' },
  'cigar-aficionado': { campaign: cigarAficionadoPodcastCampaign, navKey: 'ca-podcast' },
  cigar: { campaign: cigarAficionadoPodcastCampaign, navKey: 'ca-podcast' },
  'ca-podcast': { campaign: cigarAficionadoPodcastCampaign, navKey: 'ca-podcast' },
  '3g7viwill-7284': { campaign: cigarAficionadoPodcastCampaign, navKey: 'ca-podcast' },
}

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
  ...Object.fromEntries(
    Object.entries(M_SHANKEN_ROUTES).map(([k, v]) => [k, v.campaign]),
  ),
}

export const M_SHANKEN_CAMPAIGN_NAV: ReportingCampaignNavItem[] = [
  { key: 'pernod-90-club', label: 'Pernod · 90 Club', href: '/reporting?campaign=pernod-90-club' },
  { key: 'glenmorangie-native', label: 'Glenmorangie WA · prebooked', href: '/reporting?campaign=glenmorangie-native' },
  { key: 'davidoff-ca', label: 'Davidoff CA', href: '/reporting?campaign=davidoff-ca' },
  { key: 'la-aurora-ca', label: 'La Aurora CA', href: '/reporting?campaign=la-aurora-ca' },
  { key: 'bib-tucker-wa', label: 'Bib & Tucker WA', href: '/reporting?campaign=bib-tucker-wa' },
  { key: 'perelada-ws', label: 'Perelada WS · prebooked', href: '/reporting?campaign=perelada-ws' },
  { key: 'ca-podcast', label: 'CA Podcast', href: '/reporting?campaign=ca-podcast' },
]

export const REPORTING_CAMPAIGN_NAV: ReportingCampaignNavItem[] = [
  { key: 'big-smoke', label: 'Big Smoke Miami', href: '/reporting?campaign=big-smoke' },
  ...M_SHANKEN_CAMPAIGN_NAV,
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

  const mShanken = M_SHANKEN_ROUTES[campaignKey]
  if (mShanken) {
    return { campaign: mShanken.campaign, activeNavKey: mShanken.navKey }
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

  if (!campaignKey) {
    return { campaign: bigSmokeMiamiCampaign, activeNavKey: 'big-smoke' }
  }

  const fallback = CAMPAIGN_BY_KEY[campaignKey]
  if (fallback) {
    const route = M_SHANKEN_ROUTES[campaignKey]
    return {
      campaign: fallback,
      activeNavKey: route?.navKey ?? campaignKey,
    }
  }

  return { campaign: bigSmokeMiamiCampaign, activeNavKey: 'big-smoke' }
}
