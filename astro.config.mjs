// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

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
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.homepagetooltester.de',
  redirects,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});