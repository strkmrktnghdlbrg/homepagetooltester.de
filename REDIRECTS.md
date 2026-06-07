# 301-Redirect-Mapping (WordPress -> Astro)

**Status:** Annahmen-basiert. Eine vollständige Live-URL-Inventur der alten Seite
(`homepagetooltester.de/sitemap.xml`) konnte zum Build-Zeitpunkt nicht durchgeführt
werden (der zuständige Workflow-Agent lief in ein Session-Limit). Die folgenden Regeln
beruhen auf der bekannten alten Navigation (Vergleiche, Branche, Einsteiger, Kosten,
E-Commerce, Funktionen, PageSpeed, Alternativen, SEO) und gängigen WP-Pfadmustern.

## Vor Go-Live zwingend tun
1. Echte alte URLs ziehen: `homepagetooltester.de/sitemap.xml` bzw. Search-Console-Export
   oder `screamingfrog`-Crawl der Live-Domain.
2. Jede alte Top-URL einem neuen Ziel zuordnen (Tabelle unten erweitern).
3. **Bezahlte Gastartikel / Backlinks unter exakter URL erhalten** (NICHT umbiegen) -
   vorher aktiv prüfen, welche `/magazin/...`- oder themenfremden Artikel als Backlink-Service
   online bleiben müssen (siehe Playbook-Regel "Guest-Posts erhalten").

## Implementiert an zwei Stellen
- `astro.config.mjs` -> `redirects` (greift im Astro-Build, erzeugt Redirect-Seiten)
- `public/_redirects` (Host-/Netlify-Format, echtes 301 auf Server-Ebene)

## Aktuelles Mapping

| Alt (Annahme) | Neu | Typ |
|---|---|---|
| /homepage-baukasten, /homepage-baukasten-vergleich, /vergleiche, /alternativen, /funktionen | /baukasten-vergleich | Vergleich |
| /wix, /jimdo, /ionos, /squarespace, /shopify, /site123, /onepage | /test/&lt;slug&gt; | Tool-Review |
| /branche | /anwendungsfall/restaurant | Branche |
| /e-commerce, /online-shop | /anwendungsfall/online-shop | Branche |
| /einsteiger | /ratgeber | Ratgeber-Hub |
| /kosten | /ratgeber/website-kosten | Ratgeber |
| /seo | /ratgeber/seo-fuer-website-baukasten | Ratgeber |
| /pagespeed | /ratgeber | Ratgeber |
| /finder | /baukasten-finder | Tool |
| /kontakt-impressum | /kontakt | Seite |

## WP-Recovery 2026

Stand dieses Durchlaufs (2026-06-02): Es wurde kein zusätzliches WP-Recovery-Mapping
übergeben (Eingabe-Set war leer). Daher wurden keine neuen 301-Regeln in
`astro.config.mjs` oder `public/_redirects` ergänzt; das bestehende, annahmen-basierte
Mapping bleibt unverändert gültig. Sobald echte Alt-URLs aus Search Console / Crawl
vorliegen, hier als Tabelle (Alt -> Neu -> Typ) nachtragen und an beiden Stellen
implementieren.

## Offene Punkte
- Trailing-Slash-Verhalten am Ziel-Host prüfen (Astro baut standardmäßig `/pfad/`).
- Einzelne Branchen-Unterseiten (Fotograf, Handwerker, Arzt ...) auf die jeweiligen
  `/anwendungsfall/<slug>` mappen, sobald die alten URLs bekannt sind.
- Alte Ratgeber-Artikel 1:1 auf neue `/ratgeber/<slug>` ziehen statt pauschal auf den Hub.
