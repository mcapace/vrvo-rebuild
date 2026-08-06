/**
 * Deutsch Family Wine & Spirits × Whisky Advocate — native article extensions.
 *
 * Per-article briefs (Hilary → Mike). Each flight is its own report:
 *
 * | Brand        | Article                         | Production | Flight (ASAP → end) | Destination |
 * |--------------|---------------------------------|----------:|---------------------|-------------|
 * | Bib & Tucker | Coffee Bourbon                  |    $2,500 | Mar 1–31, 2026      | #story-coffee-bourbon |
 * | Redemption   | Rye Revival                     |    $2,500 | Mar 1–31, 2026      | ?story=rye-revival |
 * | Bib & Tucker | Tennessee Bourbon (2nd)         |    $2,500 | May 1–15, 2026      | #story-tennessee-bourbon-dressed-to-impress |
 * | Redemption   | Turns Up the Rye (2nd)          |    $2,500 | May 1–31, 2026      | #story-redemption-turns-up-the-rye |
 * | Bib & Tucker | Six Years in the Making (3rd)   |    $1,528 | Jun 1–13, 2026      | #story-six-years-in-the-making |
 *
 * Open:
 * - `/reporting?campaign=bib-tucker-coffee`
 * - `/reporting?campaign=redemption-rye`
 * - `/reporting?campaign=bib-tucker-tennessee`
 * - `/reporting?campaign=redemption-rye-2`
 * - `/reporting?campaign=bib-tucker` (Six Years / invoice 7282)
 */

import type { AudienceBucket } from './bigSmokeMiami'
import { buildNativeInvoiceCampaign } from './mShankenNativeInvoices'

const deutschWaAudiences: AudienceBucket[] = [
  {
    id: 'endemic',
    label: 'Whisky Advocate endemic · Deutsch microsite',
    description:
      'Native extension on WA.com and the Deutsch Family partner microsite (deutsch.whiskyadvocate.com).',
    cohorts: [
      {
        title: 'WA.com article native',
        detail: 'Editorial alignment on bourbon / rye reviews and whiskey lifestyle content.',
      },
      {
        title: 'Deutsch partner story native',
        detail: 'Traffic to the trafficked deutsch.whiskyadvocate.com story URL for each article.',
      },
      {
        title: 'Premium brown spirits intent',
        detail: 'Modeled ultra-premium bourbon and rye buyers aligned to Bib & Tucker / Redemption.',
      },
    ],
  },
]

function hashStoryUrl(hash: string, utmContent: string): string {
  const q = new URLSearchParams({
    utm_source: 'vrvo',
    utm_medium: 'native',
    utm_campaign: 'deutsch_wa_native',
    utm_content: utmContent,
  })
  return `https://deutsch.whiskyadvocate.com/?${q.toString()}${hash.startsWith('#') ? hash : `#${hash}`}`
}

function queryStoryUrl(storyParam: string, utmContent: string): string {
  const q = new URLSearchParams({
    story: storyParam,
    utm_source: 'vrvo',
    utm_medium: 'native',
    utm_campaign: 'deutsch_wa_native',
    utm_content: utmContent,
  })
  return `https://deutsch.whiskyadvocate.com/?${q.toString()}`
}

/** Article 1 — Coffee Bourbon · Mar 1–31 · $2,500 */
export const bibTuckerCoffeeBourbonCampaign = buildNativeInvoiceCampaign({
  orderId: 'VRVO-IO-DEUTSCH-BT-2026-0301',
  id: 'bib_tucker_coffee_bourbon_2026',
  name: 'Bib & Tucker — Coffee Bourbon (WA Native)',
  clientFacingName: 'Deutsch · Bib & Tucker',
  lineItem: 'Deutsch Native — Bib & Tucker — Coffee Bourbon — Mar 2026',
  invoiceLine: 'Deutsch Native Extension - Bib & Tucker - Coffee Bourbon - Mar 2026',
  spendUsd: 2500,
  launch: '2026-03-01',
  flightEnd: '2026-03-31',
  reportAsOf: '2026-03-31',
  publisher: 'wa.com',
  clickthroughUrl: hashStoryUrl('#story-coffee-bourbon', 'bt_coffee_bourbon'),
  assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/#story-coffee-bourbon',
  audiences: deutschWaAudiences,
})

/** Article 1 — Rye Revival · Mar 1–31 · $2,500 */
export const redemptionRyeRevivalCampaign = buildNativeInvoiceCampaign({
  orderId: 'VRVO-IO-DEUTSCH-RED-2026-0301',
  id: 'redemption_rye_revival_2026',
  name: 'Redemption — Rye Revival (WA Native)',
  clientFacingName: 'Deutsch · Redemption',
  lineItem: 'Deutsch Native — Redemption — Rye Revival — Mar 2026',
  invoiceLine: 'Deutsch Native Extension - Redemption - Rye Revival - Mar 2026',
  spendUsd: 2500,
  launch: '2026-03-01',
  flightEnd: '2026-03-31',
  reportAsOf: '2026-03-31',
  publisher: 'wa.com',
  clickthroughUrl: queryStoryUrl('rye-revival', 'redemption_rye_revival'),
  assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/?story=rye-revival',
  audiences: deutschWaAudiences,
})

/** Article 2 — Tennessee Bourbon · May 1–15 · $2,500 */
export const bibTuckerTennesseeCampaign = buildNativeInvoiceCampaign({
  orderId: 'VRVO-IO-DEUTSCH-BT-2026-0501',
  id: 'bib_tucker_tennessee_bourbon_2026',
  name: 'Bib & Tucker — Tennessee Bourbon (WA Native)',
  clientFacingName: 'Deutsch · Bib & Tucker',
  lineItem: 'Deutsch Native — Bib & Tucker — Tennessee Bourbon — May 2026',
  invoiceLine:
    'Deutsch Native Extension - Bib & Tucker - Tennessee Bourbon Dressed to Impress - May 2026',
  spendUsd: 2500,
  launch: '2026-05-01',
  flightEnd: '2026-05-15',
  reportAsOf: '2026-05-15',
  publisher: 'wa.com',
  clickthroughUrl: hashStoryUrl(
    '#story-tennessee-bourbon-dressed-to-impress',
    'bt_tennessee_bourbon',
  ),
  assetsFolderUrl:
    'https://deutsch.whiskyadvocate.com/#story-tennessee-bourbon-dressed-to-impress',
  audiences: deutschWaAudiences,
})

/** Article 2 — Turns Up the Rye · May 1–31 · $2,500 */
export const redemptionTurnsUpRyeCampaign = buildNativeInvoiceCampaign({
  orderId: 'VRVO-IO-DEUTSCH-RED-2026-0501',
  id: 'redemption_turns_up_the_rye_2026',
  name: 'Redemption — Turns Up the Rye (WA Native)',
  clientFacingName: 'Deutsch · Redemption',
  lineItem: 'Deutsch Native — Redemption — Turns Up the Rye — May 2026',
  invoiceLine: 'Deutsch Native Extension - Redemption - Turns Up the Rye - May 2026',
  spendUsd: 2500,
  launch: '2026-05-01',
  flightEnd: '2026-05-31',
  reportAsOf: '2026-05-31',
  publisher: 'wa.com',
  clickthroughUrl: hashStoryUrl('#story-redemption-turns-up-the-rye', 'redemption_turns_up_rye'),
  assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/#story-redemption-turns-up-the-rye',
  audiences: deutschWaAudiences,
})

/**
 * Article 3 — Six Years in the Making · Jun 1–13 · $1,528
 * (Invoice alias 3G7VIWLL-7282 — was the generic May Bib & Tucker WA line.)
 */
export const bibTuckerSixYearsCampaign = buildNativeInvoiceCampaign({
  orderId: '3G7VIWLL-7282',
  id: 'bib_tucker_six_years_2026',
  name: 'Bib & Tucker — Six Years in the Making (WA Native)',
  clientFacingName: 'Deutsch · Bib & Tucker',
  lineItem: 'Deutsch Native — Bib & Tucker — Six Years in the Making — Jun 2026',
  invoiceLine: 'Deutsch Native Extension - Bib & Tucker - Six Years in the Making - Jun 2026',
  spendUsd: 1528,
  launch: '2026-06-01',
  flightEnd: '2026-06-13',
  reportAsOf: '2026-06-13',
  publisher: 'wa.com',
  clickthroughUrl: hashStoryUrl('#story-six-years-in-the-making', 'bt_six_years'),
  assetsFolderUrl: 'https://deutsch.whiskyadvocate.com/#story-six-years-in-the-making',
  audiences: deutschWaAudiences,
})

/** @deprecated Prefer named article exports; kept for invoice / nav alias `bib-tucker-wa`. */
export const bibTuckerWaNativeCampaign = bibTuckerSixYearsCampaign

export const DEUTSCH_FAMILY_WA_CAMPAIGNS = [
  bibTuckerCoffeeBourbonCampaign,
  redemptionRyeRevivalCampaign,
  bibTuckerTennesseeCampaign,
  redemptionTurnsUpRyeCampaign,
  bibTuckerSixYearsCampaign,
] as const
