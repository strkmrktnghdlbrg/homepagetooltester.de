# Improvement-Plan: homepagetooltester.de

> Automatisches Audit vom 2026-07-04. Abarbeitbar von jeder Claude-Session. Vor Deploy: Hosting laut ClickUp-Task prüfen.

## 1. Status (Live?, Hosting/Deploy, Build-Stand)

- **Live: JA.** `https://homepagetooltester.de/` liefert HTTP 200 (Netlify Edge), `https://www.homepagetooltester.de/` macht 301 auf die Apex-Domain. Die Site ist also nicht mehr in reiner Mockup-Phase, sondern deployed.
- **Hosting/Deploy:** Netlify. CI-Workflow in `.github/` ist auf Build-Check reduziert, Deploy übernimmt Netlify direkt (Commit `013ec5a`). `public/_redirects` im Netlify-Format vorhanden.
- **Build-Stand:** Astro 6 + Tailwind 4, 88 gebaute Seiten in `dist/` (Stand 2026-06-28). Git-Status clean, letzter Commit 2026-06-28 (404-Recovery-Redirects).
- **Inhalt:** 7 Tool-Reviews (`src/content/builders/`), 10 Ratgeber-Artikel (`src/content/articles/`), 4 Anwendungsfälle (`src/content/usecases/`), Vergleichs-Money-Page, Baukasten-Finder, interne Silo-Verlinkung (Commit `798a281`).

## 2. Kritische Findings (Sicherheit, kaputte Links, Canonical)

1. **Canonical-Host-Mismatch (Pflicht-Finding, höchste Priorität):** Netlify serviert die Apex-Domain als 200-Variante (www macht 301 auf Apex). Aber `astro.config.mjs` (`site: 'https://www.homepagetooltester.de'`) und `src/config/site.ts` (`url: 'https://www.homepagetooltester.de'`) deklarieren www als kanonisch. Folge: JEDE Seite trägt ein `<link rel="canonical">` auf einen Host, der per 301 wegleitet; ebenso zeigen Sitemap-URLs (`sitemap-0.xml`), `public/robots.txt` (Sitemap-Zeile) und JSON-LD auf www. Google bekommt widersprüchliche Signale. Fix (Regel: site-URL = die 200-Variante): entweder in Netlify die Primary Domain auf www umstellen ODER (einfacher) `site` in `astro.config.mjs`, `url` in `src/config/site.ts` und die Sitemap-Zeile in `public/robots.txt` auf `https://homepagetooltester.de` ändern und neu deployen.
2. **`/sitemap.xml` liefert 404:** Nur `/sitemap-index.xml` existiert (200). Die alte WP-Sitemap-URL ist vermutlich noch in der Search Console hinterlegt und wird extern verlinkt. Fix: Redirect `/sitemap.xml -> /sitemap-index.xml 301` in `public/_redirects` ergänzen.
3. **Sicherheit: KEINE Findings.** Keine hartkodierten Secrets, keine .env-Dateien im Git, keine Debug-/Admin-Dateien, keine http://-Links in Templates (einziger Treffer ist beschreibender Text in `src/pages/datenschutz.astro`). Der Web3Forms-Key in `src/pages/kontakt.astro` ist der bekannte öffentliche Access-Key (per Design public, ok).
4. **Affiliate-Links laufen fast alle untracked ins Leere (Umsatz-Verlust, siehe §4):** `SITE.affiliate.awin.enabled = false` und `publisherId = ''` in `src/config/site.ts`, dadurch fällt `getAffiliateUrl()` überall auf provisionsfreie Direktlinks zurück.

## 3. Vollendung (was zum Fertigstellen fehlt)

- **README.md ist noch Astro-Starter-Boilerplate.** Durch echte Projekt-Doku ersetzen (Stack, Deploy-Weg Netlify, Affiliate-Setup-Anleitung aus `src/config/site.ts` übernehmen).
- **Review-Lücke Produkte vs. Content:** `src/data/products.ts` definiert 12 Programme (onepage, ionos, strato, godaddy, hostinger, webgo, onecom, wix, squarespace, shopify, jimdo, site123), aber nur 7 haben eine Review-Seite unter `/test/`. Es fehlen: **webgo** (einziger Merchant mit bereits eingetragener AWIN-ID 11854!), strato, godaddy, hostinger, one.com.
- **REDIRECTS.md-Pflichtaufgabe offen:** Das Mapping ist laut Datei teilweise annahmen-basiert. Vor endgültigem Abhaken: Search-Console-Coverage/404-Report prüfen und Restlücken in `public/_redirects` + `astro.config.mjs` nachziehen (404-Recovery vom 2026-06-28 hat schon viel abgedeckt).
- **GTM/AdSense:** In `src/pages/datenschutz.astro` stehen Platzhalter (`[GTM-XXXXXXX]`, `[ca-pub-XXXXXXXXXXXXXXXX]`), aber es ist kein Tag im `src/layouts/BaseLayout.astro` eingebaut. Entweder GTM/GA4 einbauen und IDs eintragen, oder die Platzhalter-Absätze aus dem Datenschutz entfernen (Platzhalter im Impressum/Datenschutz wirken unseriös).
- **Ungenutzte Konstante:** `SITE.affiliate.disclosure` in `src/config/site.ts` wird nirgends gerendert (Footer und ScoreCard haben eigene, korrekte Texte). Entweder zentral verwenden oder entfernen.

## 4. Monetarisierung (vorhanden / fehlend / kaputt)

**Vorhanden:**
- Saubere zentrale Affiliate-Architektur: `src/lib/affiliate.ts` (AWIN-Deeplink-Builder mit `rel="sponsored nofollow noopener"`) + `src/data/products.ts` (Programm-Registry) + `src/config/site.ts` (Schalter). Fallback auf Direktlinks solange AWIN nicht aktiv.
- **Onepage aktiv getrackt:** `https://onepage.io/?via=wbmgx` (network: direct).
- Affiliate-Disclosure vorhanden (Footer + ScoreCard, echte Umlaute, ok).

**Fehlend / kaputt (= liegengelassenes Geld):**
- **AWIN global deaktiviert:** `publisherId = ''`, `enabled = false`. Alle AWIN-Kandidaten (IONOS, Strato, GoDaddy, Hostinger, webgo, one.com) verlinken untracked. webgo hat als einziger schon eine `awinMerchantId` (11854), greift aber wegen des globalen Schalters nicht. TODO: AWIN-Publisher-ID eintragen, bei den Advertisern bewerben, `enabled = true` setzen, restliche `awinMerchantId`s nachtragen (Referenz: `AWIN-PARTNER-MATCHING.md` im Hauptordner).
- **Wix, Squarespace, Shopify, Jimdo, Site123:** `network: 'direct'` mit leerer `directUrl` -> untracked. Das sind die traffic-stärksten Brands der Nische mit hohen Provisionen (Wix bis ~100 EUR+/Sale). TODO: Wix Affiliate Program, Squarespace (Impact), Shopify Affiliates, Jimdo-Partnerprogramm anmelden und `directUrl` je Slug in `src/data/products.ts` eintragen.
- **Kein AdSense/GTM** als zweite Monetarisierungs-Ebene für Info-Traffic (Ratgeber-Cluster). Optional, aber bei 10+ Ratgeber-Artikeln sinnvoll.

## 5. SEO & Traffic (Struktur, interne Links, GEO/AI-Search)

**Gut aufgestellt:**
- JSON-LD umfangreich: Organization + WebSite/SearchAction (`src/layouts/BaseLayout.astro`), SoftwareApplication + AggregateRating + Review + BreadcrumbList + FAQPage (`src/pages/test/[slug].astro`), ItemList + FAQPage (`src/pages/baukasten-vergleich.astro`). Das ist genau das Score-/Vergleichs-Schema, das für GEO/AI-Search gebraucht wird.
- Sitemap via `@astrojs/sitemap` integriert, robots.txt sperrt `/suche` (Thin-Content), interne Silo-Verlinkung (Related/Sibling + Hub-Spoke) implementiert.
- FAQ-Strukturen auf Money-Pages vorhanden (LLM-Extraktion-freundlich).

**Verbesserungspotenzial:**
- Alle strukturierten Daten erben den www-Host aus `SITE.url` -> wird mit dem Canonical-Fix (§2.1) automatisch mitgelöst, aber danach einmal alle Seiten prüfen.
- **Kein Versus-Cluster:** In der Baukasten-Nische kommen die höchsten Buyer-Intent-Suchen über "X oder Y"/"X vs Y". Es existiert nur `wix-oder-onepage` als Ratgeber-Artikel. Ein eigenes `/vergleich/<a>-vs-<b>/`-Template (Score-Tabelle beider Tools nebeneinander, beide CTAs affiliate-verlinkt) wäre der größte SEO-Hebel.
- **Anwendungsfälle ausbauen:** Nur 4 Usecases (fotograf, handwerker, online-shop, restaurant). Kleinunternehmer, Verein, Friseur, Coach/Berater, Ferienwohnung fehlen (jeweils eigene Long-Tail-Keywords mit Kaufabsicht).
- E-E-A-T: `ueber-uns` vorhanden, Reviews als Organization ausgezeichnet (regelkonform, keine Fake-Autoren). Ergänzen: Test-Methodik-Seite (`/testverfahren/` o.ä.), auf die jede Review verlinkt, plus "Zuletzt aktualisiert"-Datum sichtbar auf Reviews.

## 6. Neue Buyer-Intent-Seiten (Tabelle: URL | Keyword-Idee | Monetarisierung)

| URL | Keyword-Idee | Monetarisierung |
|---|---|---|
| /vergleich/wix-vs-jimdo/ | "wix oder jimdo", "jimdo vs wix" | Doppel-CTA Wix-Partnerprogramm + Jimdo-Partnerprogramm |
| /vergleich/wix-vs-ionos/ | "wix oder ionos" | Wix-Partner + IONOS über AWIN |
| /vergleich/jimdo-vs-ionos/ | "jimdo oder ionos homepage baukasten" | Jimdo + IONOS (AWIN) |
| /vergleich/squarespace-vs-wix/ | "squarespace vs wix deutsch" | Squarespace (Impact) + Wix |
| /test/webgo/ | "webgo homepage baukasten erfahrungen" | AWIN mid 11854 liegt schon in products.ts, nur Review-Content fehlt |
| /test/hostinger/ | "hostinger website builder erfahrungen" (hohes Suchvolumen, KI-Builder-Trend) | Hostinger über AWIN, hohe Provision |
| /test/strato/ | "strato homepage baukasten test" | Strato über AWIN |
| /anwendungsfall/kleinunternehmer/ | "homepage baukasten kleinunternehmer", "website für kleine firma" | Score-Cards Top 3 mit Affiliate-CTAs |
| /anwendungsfall/verein/ | "homepage baukasten verein kostenlos" | Free-Tier-Vergleich mit Upgrade-Affiliate-CTAs |
| /ratgeber/wix-kosten/ | "wix kosten", "wix preise deutschland" | Preis-Tabelle mit Wix-Affiliate-Deeplinks auf Tarifseite |

## 7. Priorisierte Tasks (nummerierte [ ]-Checkliste)

1. [x] **Canonical-Host fixen:** In `astro.config.mjs` `site` auf `https://homepagetooltester.de` ändern, in `src/config/site.ts` `url` auf `https://homepagetooltester.de` ändern, in `public/robots.txt` die Sitemap-Zeile auf `https://homepagetooltester.de/sitemap-index.xml` ändern. Build (`npm run build`) und prüfen, dass Canonicals/Sitemap/JSON-LD auf Apex zeigen. (Alternative, falls ClickUp/GSC www vorgibt: stattdessen Netlify Primary Domain auf www umstellen und Code lassen.)
2. [ ] **Sitemap-Redirect:** In `public/_redirects` ergänzen: `/sitemap.xml /sitemap-index.xml 301`.
3. [ ] **AWIN aktivieren:** AWIN-Publisher-ID (Account j.stark, siehe `.secrets/` bzw. AWIN-Dashboard) in `src/config/site.ts` bei `affiliate.awin.publisherId` eintragen, `enabled: true` setzen. Bewerbungen bei IONOS, Strato, Hostinger, GoDaddy, one.com über AWIN prüfen/anstoßen und angenommene `awinMerchantId`s in `src/data/products.ts` nachtragen (Referenz `AWIN-PARTNER-MATCHING.md`).
4. [ ] **Direct-Programme füllen:** Wix-, Squarespace-, Shopify-, Jimdo-, Site123-Partnerprogramm-Links besorgen und als `directUrl` in `src/data/products.ts` eintragen (Slugs: wix, squarespace, shopify, jimdo, site123).
5. [ ] **Review /test/webgo/ erstellen:** Neue Datei `src/content/builders/webgo.md` nach dem Muster von `src/content/builders/ionos.md` (Frontmatter-Schema siehe `src/content.config.ts`). Einziger Merchant mit aktiver AWIN-ID, daher Quick-Win.
6. [ ] **Versus-Cluster bauen:** Neues Template `src/pages/vergleich/[slug].astro` (zwei Builder aus der builders-Collection side-by-side, Score-Tabelle, FAQ + FAQPage-Schema, beide CTAs über `getAffiliateUrl()`), Start mit wix-vs-jimdo, wix-vs-ionos, squarespace-vs-wix. Intern von `/baukasten-vergleich` und den beteiligten `/test/`-Seiten verlinken.
7. [ ] **Anwendungsfälle erweitern:** `src/content/usecases/kleinunternehmer.md` und `src/content/usecases/verein.md` ergänzen (Muster: `src/content/usecases/handwerker.md`), Bilder nach `public/images/content/`.
8. [ ] **Weitere Reviews:** `src/content/builders/hostinger.md` und `src/content/builders/strato.md` erstellen (Programme existieren schon in `src/data/products.ts`).
9. [ ] **Datenschutz-Platzhalter bereinigen:** In `src/pages/datenschutz.astro` die Abschnitte mit `[GTM-XXXXXXX]` und `[ca-pub-XXXXXXXXXXXXXXXX]` entweder mit echten IDs füllen (sobald GTM/AdSense eingebaut) oder entfernen.
10. [ ] **README.md ersetzen:** Astro-Starter-Boilerplate durch Projekt-Doku ersetzen (Stack, Netlify-Deploy, Affiliate-Setup-Schritte aus `src/config/site.ts`-Kommentar, Verweis auf REDIRECTS.md und diesen Plan).
11. [ ] **E-E-A-T ausbauen:** Test-Methodik-Seite `src/pages/testverfahren.astro` anlegen (wie wird der 6-Punkt-Score vergeben), aus `src/pages/test/[slug].astro` und `src/pages/ueber-uns.astro` verlinken; sichtbares "Zuletzt aktualisiert"-Datum auf Review-Seiten.
12. [ ] **Redirect-Inventur abschließen:** Search-Console-404-Report bzw. GA4 prüfen und offene Alt-URLs in `public/_redirects` + `astro.config.mjs` (redirects-Objekt) nachtragen, danach Status in `REDIRECTS.md` aktualisieren.
