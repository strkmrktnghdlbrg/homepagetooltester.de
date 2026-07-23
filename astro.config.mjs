// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import outboundGate from './integrations/outbound-gate.mjs';
// 301-Redirects: alte WordPress-Pfade -> neue Astro-Cluster.
// Annahmen-basiert (Live-Inventur war zum Build-Zeitpunkt nicht moeglich) - siehe REDIRECTS.md.
const redirects = {
  // Vergleich / Money-Page
  '/homepage-baukasten': '/baukasten-vergleich',
  '/homepage-baukasten-vergleich': '/baukasten-vergleich',
  '/vergleiche': '/baukasten-vergleich',
  '/alternativen': '/baukasten-vergleich',
  '/funktionen': '/baukasten-vergleich',
  // Tool-Reviews
  '/wix': '/test/wix',
  '/jimdo': '/test/jimdo',
  '/ionos': '/test/ionos',
  '/squarespace': '/test/squarespace',
  '/shopify': '/test/shopify',
  '/site123': '/test/site123',
  '/onepage': '/test/onepage',
  // Branche / Anwendungsfall
  '/branche': '/anwendungsfall/restaurant',
  '/e-commerce': '/anwendungsfall/online-shop',
  '/online-shop': '/anwendungsfall/online-shop',
  // Ratgeber-Cluster
  '/einsteiger': '/ratgeber',
  '/kosten': '/ratgeber/website-kosten',
  '/seo': '/ratgeber/seo-fuer-website-baukasten',
  '/pagespeed': '/ratgeber',
  // Tools / Sonstiges
  '/finder': '/baukasten-finder',
  '/kontakt-impressum': '/kontakt',

  // WP-Recovery 2026: echte indexierte Alt-URLs (via site:-Inventur) -> neue Ziele
  '/homepage-baukasten-test-2025/': '/baukasten-vergleich',
  '/homepage-baukasten-test-2025': '/baukasten-vergleich',
  '/homepage-builder-fuer-anfaenger/': '/ratgeber/homepage-baukasten-fuer-anfaenger',
  '/homepage-builder-fuer-anfaenger': '/ratgeber/homepage-baukasten-fuer-anfaenger',
  '/webseite-erstellen/': '/ratgeber/website-erstellen-anleitung',
  '/webseite-erstellen': '/ratgeber/website-erstellen-anleitung',
  '/homepage-builder-onlinekurse/': '/baukasten-vergleich',
  '/homepage-builder-onlinekurse': '/baukasten-vergleich',
  '/homepage-builder-ecommerce-vergleich/': '/ratgeber/online-shop-erstellen',
  '/homepage-builder-ecommerce-vergleich': '/ratgeber/online-shop-erstellen',
  '/kostenlose-homepage-builder/': '/ratgeber/kostenlose-homepage-baukasten',
  '/kostenlose-homepage-builder': '/ratgeber/kostenlose-homepage-baukasten',
  '/kostenlose-website-baukasten-ohne-werbung/': '/ratgeber/kostenlose-homepage-baukasten',
  '/kostenlose-website-baukasten-ohne-werbung': '/ratgeber/kostenlose-homepage-baukasten',
  '/webseite-erstellen-lassen/': '/baukasten-vergleich',
  '/webseite-erstellen-lassen': '/baukasten-vergleich',

  // 404-Recovery 2026-06-28 (GA4 + Wayback-Inventur): alte WP-Pfade die live 404 warfen
  // Alte Baukasten-Reviews (1&1 = heute IONOS; Webnode/Weebly/BigCommerce nicht mehr im Test)
  '/1und1/': '/test/ionos',
  '/1und1': '/test/ionos',
  '/webnode/': '/baukasten-vergleich',
  '/webnode': '/baukasten-vergleich',
  '/weebly/': '/baukasten-vergleich',
  '/weebly': '/baukasten-vergleich',
  '/big-commerce/': '/anwendungsfall/online-shop',
  '/big-commerce': '/anwendungsfall/online-shop',
  // alte Jimdo-Unterseiten -> konsolidiert auf den Jimdo-Testbericht
  '/jimdo/kosten/': '/test/jimdo',
  '/jimdo/preise/': '/test/jimdo',
  '/jimdo/gutschein/': '/test/jimdo',
  '/jimdo/jimdo-oder-wix/': '/test/jimdo',
  '/jimdo/website/': '/test/jimdo',
  '/jimdo/templates/': '/test/jimdo',
  '/jimdo/blog/': '/test/jimdo',
  '/jimdo/shop/': '/anwendungsfall/online-shop',
  '/jimdo/online-shop/': '/anwendungsfall/online-shop',
  // alte Wix-Unterseiten -> konsolidiert auf den Wix-Testbericht
  '/wix/preise/': '/test/wix',
  '/wix/kosten/': '/test/wix',
  '/wix/gutschein/': '/test/wix',
  '/wix/website/': '/test/wix',
  '/wix/templates/': '/test/wix',
  '/wix/blog/': '/test/wix',
  '/wix/online-shop/': '/anwendungsfall/online-shop',
  '/wix/wix-oder-jimdo/': '/ratgeber/wix-oder-onepage',
  // Service-/Meta-Seiten
  '/datenschutzerklaerung': '/datenschutz',
  '/datenschutzerklaerung/': '/datenschutz',
  '/kontaktformular/': '/kontakt',
  '/hinweise-zu-werbepartner/': '/ueber-uns',
  '/sitemap/': '/',
  '/author/admin-22/': '/ueber-uns',
  // alte Webnode-Q&A-Artikel
  '/webnode/webnode-erfahrungen-ist-webnode-eine-gute-wahl-fuer-einen-homepage-baukasten/': '/baukasten-vergleich',
  '/antwort-fuer-webnode-erfahrungen-ist-webnode-eine-gute-wahl-fuer-einen-homepage-baukasten/': '/baukasten-vergleich',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://homepagetooltester.de',
  redirects,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [outboundGate(), sitemap()]
});