/**
 * Zentrale Site-Konfiguration für HomepageTooltester.
 *
 * Affiliate-Setup:
 *  - Onepage laeuft ueber das eigene Partnerprogramm (Direktlink ?via=wbmgx) - bereits aktiv.
 *  - Die uebrigen Hoster/Baukaesten sind ueber AWIN geplant. Sobald du bei AWIN
 *    angenommen bist, musst du an GENAU ZWEI Stellen etwas eintragen:
 *      1) hier: affiliate.awin.publisherId  +  affiliate.awin.enabled = true
 *      2) in src/data/products.ts: pro Merchant die awinMerchantId (awinmid)
 *    Danach erzeugt getAffiliateUrl() automatisch korrekte AWIN-Deeplinks.
 */
export const SITE = {
  name: 'HomepageTooltester',
  url: 'https://www.homepagetooltester.de',
  tagline: 'Unabhaengiger Homepage-Baukasten-Vergleich',
  locale: 'de-DE',

  affiliate: {
    /** Globaler Transparenz-/Disclosure-Hinweis (Pflicht bei Affiliate-Links). */
    disclosure:
      'Einige Links sind Affiliate-Links. Schliesst du darueber einen Vertrag ab, erhalten wir eine Provision - ohne Mehrkosten fuer dich und ohne Einfluss auf unsere Bewertung.',

    awin: {
      /**
       * Deine AWIN Publisher-/Affiliate-ID (awinaffid).
       * Findest du nach Annahme im AWIN-Dashboard unter Account > Profile.
       * Beispiel: '1234567'. Solange leer + enabled=false -> Fallback auf Direktlink ohne Tracking.
       */
      publisherId: '' as string,

      /** Auf true stellen, sobald publisherId gesetzt ist und Programme genehmigt sind. */
      enabled: false,

      /** Sub-ID / clickref zum Kampagnen-Tracking in AWIN (frei waehlbar). */
      clickref: 'hpt-web',

      /** AWIN-Deeplink-Endpunkt (Standard, normalerweise nicht aendern). */
      creadBase: 'https://www.awin1.com/cread.php',
    },
  },
} as const;

export type SiteConfig = typeof SITE;
