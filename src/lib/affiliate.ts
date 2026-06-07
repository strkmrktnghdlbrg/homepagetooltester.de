/**
 * Affiliate-Deeplink-Helper.
 *
 * Verwendung in .astro-Seiten:
 *   import { getAffiliateUrl } from '../lib/affiliate';
 *   const link = getAffiliateUrl(builder.slug);
 *   <a href={link.url} rel={link.rel} target={link.target}>Zum Anbieter</a>
 *
 * Solange AWIN nicht freigeschaltet ist (SITE.affiliate.awin.enabled = false oder
 * fehlende publisherId/awinMerchantId), wird automatisch ein sauberer Direktlink
 * OHNE Tracking ausgegeben - die Seite funktioniert also schon vor der Annahme.
 */
import { SITE } from '../config/site';
import { AFFILIATE_PROGRAMS, type AffiliateProgram } from '../data/products';

const REL = 'sponsored nofollow noopener';
const TARGET = '_blank';

export interface ResolvedLink {
  url: string;
  rel: string;
  target: string;
  /** true = echter (getrackter) Affiliate-Link aktiv; false = Fallback-Direktlink. */
  isAffiliate: boolean;
  /** 'awin' | 'direct' | 'awin-pending' | 'direct-pending' | 'none' */
  network: string;
}

/**
 * Baut einen AWIN-Deeplink:
 *   https://www.awin1.com/cread.php?awinmid=<mid>&awinaffid=<pub>&clickref=<ref>&ued=<ziel>
 */
export function awinDeeplink(
  merchantId: string,
  destinationUrl: string,
  clickref?: string,
): string {
  const { creadBase, publisherId } = SITE.affiliate.awin;
  const params = new URLSearchParams({
    awinmid: merchantId,
    awinaffid: publisherId,
    ued: destinationUrl,
  });
  if (clickref) params.set('clickref', clickref);
  return `${creadBase}?${params.toString()}`;
}

/** Liefert true, wenn AWIN global einsatzbereit ist. */
export function awinReady(): boolean {
  const a = SITE.affiliate.awin;
  return Boolean(a.enabled && a.publisherId);
}

/**
 * Zentrale Aufloesung: Slug -> fertiger Link (+ rel/target).
 * @param slug   builders-Slug (z.B. 'onepage', 'ionos', 'wix')
 * @param opts.destination  optionales Deeplink-Ziel (z.B. konkrete Tarif-/Landingpage)
 * @param opts.clickref     ueberschreibt das Standard-clickref
 */
export function getAffiliateUrl(
  slug: string,
  opts: { destination?: string; clickref?: string } = {},
): ResolvedLink {
  const program: AffiliateProgram | undefined = AFFILIATE_PROGRAMS[slug];
  if (!program) {
    return { url: '#', rel: REL, target: TARGET, isAffiliate: false, network: 'none' };
  }

  const clickref = opts.clickref ?? SITE.affiliate.awin.clickref;
  const destination = opts.destination ?? program.homepage;

  if (program.network === 'awin') {
    if (awinReady() && program.awinMerchantId) {
      return {
        url: awinDeeplink(program.awinMerchantId, destination, clickref),
        rel: REL,
        target: TARGET,
        isAffiliate: true,
        network: 'awin',
      };
    }
    // Noch nicht angenommen/konfiguriert -> sauberer Direktlink ohne Tracking.
    return { url: destination, rel: REL, target: TARGET, isAffiliate: false, network: 'awin-pending' };
  }

  if (program.network === 'direct') {
    if (program.directUrl) {
      return { url: program.directUrl, rel: REL, target: TARGET, isAffiliate: true, network: 'direct' };
    }
    return { url: destination, rel: REL, target: TARGET, isAffiliate: false, network: 'direct-pending' };
  }

  return { url: destination, rel: REL, target: TARGET, isAffiliate: false, network: 'none' };
}
