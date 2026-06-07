/**
 * Affiliate-/Merchant-Konfiguration je Baukasten bzw. Hoster.
 *
 * "slug" muss zum Slug der builders-Content-Collection passen, damit
 * getAffiliateUrl(builder.slug) automatisch den richtigen Link liefert.
 *
 * Eintragen sobald angenommen:
 *   - network 'awin' -> awinMerchantId (= AWIN "advertiser ID" / awinmid aus dem Merchant-Profil)
 *   - network 'direct' -> directUrl (fertiger Affiliate-Link des Eigen-/Fremdnetzwerks)
 *
 * AWIN-Recherche (Stand Juni 2026) - passende Programme fuer unsere Nische:
 *   webgo      AWIN merchant-profile 11854 (verifiziert) - Hosting + Baukasten, bis 60 EUR/Sale
 *   IONOS      Partnerprogramm vorhanden (AWIN/Direkt) - awinmid pruefen
 *   STRATO     ueber AWIN
 *   GoDaddy    ueber AWIN
 *   Hostinger  ueber AWIN (+ Eigenprogramm)
 *   one.com    ueber AWIN
 * NICHT bei AWIN (eigene Netzwerke) -> network 'direct':
 *   Onepage      Eigenprogramm (FirstPromoter, ?via=wbmgx) - bereits aktiv
 *   Wix          Eigenprogramm (~100 USD/Sale)
 *   Squarespace  Impact-Netzwerk
 *   Shopify      Impact-Netzwerk
 *   Jimdo / Site123  Eigen-/anderes Netzwerk
 */

export type AffiliateNetwork = 'awin' | 'direct' | 'none';

export interface AffiliateProgram {
  /** Muss zum builders-Collection-Slug passen. */
  slug: string;
  label: string;
  network: AffiliateNetwork;
  /** AWIN advertiser/merchant id (awinmid) - nur bei network 'awin'. */
  awinMerchantId?: string;
  /** Fertiger Direkt-Affiliate-Link - bei network 'direct'. */
  directUrl?: string;
  /** Saubere Ziel-URL (wird bei AWIN als ued= Deeplink-Ziel genutzt). */
  homepage: string;
  /** Interne Notiz. */
  note?: string;
}

export const AFFILIATE_PROGRAMS: Record<string, AffiliateProgram> = {
  // --- Aktiv monetarisiert ---
  onepage: {
    slug: 'onepage',
    label: 'Onepage',
    network: 'direct',
    directUrl: 'https://onepage.io/?via=wbmgx',
    homepage: 'https://onepage.io/',
    note: 'Eigenprogramm via FirstPromoter (?via=wbmgx) - aktiv',
  },

  // --- AWIN-Kandidaten (awinMerchantId eintragen sobald angenommen) ---
  ionos: {
    slug: 'ionos',
    label: 'IONOS',
    network: 'awin',
    awinMerchantId: '',
    homepage: 'https://www.ionos.de/websites/homepage-baukasten',
    note: 'AWIN - awinmid eintragen',
  },
  strato: {
    slug: 'strato',
    label: 'STRATO',
    network: 'awin',
    awinMerchantId: '',
    homepage: 'https://www.strato.de/homepage-baukasten/',
    note: 'AWIN - awinmid eintragen',
  },
  godaddy: {
    slug: 'godaddy',
    label: 'GoDaddy',
    network: 'awin',
    awinMerchantId: '',
    homepage: 'https://www.godaddy.com/de-de/websites/website-builder',
    note: 'AWIN - awinmid eintragen',
  },
  hostinger: {
    slug: 'hostinger',
    label: 'Hostinger',
    network: 'awin',
    awinMerchantId: '',
    homepage: 'https://www.hostinger.de/website-builder',
    note: 'AWIN (+ Eigenprogramm) - awinmid eintragen',
  },
  webgo: {
    slug: 'webgo',
    label: 'webgo',
    network: 'awin',
    awinMerchantId: '11854',
    homepage: 'https://www.webgo.de/homepage-baukasten/',
    note: 'AWIN merchant-profile 11854 (verifiziert) - nur noch enable + publisherId noetig',
  },
  onecom: {
    slug: 'onecom',
    label: 'one.com',
    network: 'awin',
    awinMerchantId: '',
    homepage: 'https://www.one.com/de/website-builder',
    note: 'AWIN - awinmid eintragen',
  },

  // --- Eigene/andere Netzwerke (kein AWIN) - directUrl eintragen ---
  wix: {
    slug: 'wix',
    label: 'Wix',
    network: 'direct',
    directUrl: '',
    homepage: 'https://www.wix.com/',
    note: 'Eigenprogramm (~100 USD/Sale, kein AWIN) - Affiliate-Link eintragen',
  },
  squarespace: {
    slug: 'squarespace',
    label: 'Squarespace',
    network: 'direct',
    directUrl: '',
    homepage: 'https://www.squarespace.com/',
    note: 'Impact-Netzwerk (kein AWIN)',
  },
  shopify: {
    slug: 'shopify',
    label: 'Shopify',
    network: 'direct',
    directUrl: '',
    homepage: 'https://www.shopify.com/de',
    note: 'Impact-Netzwerk (kein AWIN)',
  },
  jimdo: {
    slug: 'jimdo',
    label: 'Jimdo',
    network: 'direct',
    directUrl: '',
    homepage: 'https://www.jimdo.com/',
    note: 'Eigen-/anderes Netzwerk',
  },
  site123: {
    slug: 'site123',
    label: 'Site123',
    network: 'direct',
    directUrl: '',
    homepage: 'https://www.site123.com/',
    note: 'Eigenprogramm',
  },
};

/** Liste aller aktuell ueber AWIN geplanten Merchants (fuer Doku/Statusanzeige). */
export const AWIN_MERCHANTS = Object.values(AFFILIATE_PROGRAMS).filter(
  (p) => p.network === 'awin',
);
