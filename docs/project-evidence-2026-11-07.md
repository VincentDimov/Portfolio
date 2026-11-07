# Project additions — 7 November 2026

The portfolio now includes sixteen projects: three selected case studies and thirteen archive entries. Each card has an expandable purpose and feature description in English and Swedish. These notes record the source checks for the five additions; they do not imply a production certification or commercial usage.

| Project | Repository visibility | Public demo | Implementation reviewed |
| --- | --- | --- | --- |
| [Plot Twist](https://github.com/VincentDimov/plot-twist) | Private | [Demo](https://plot-twist-vincent.vercel.app/) | README, package manifests, backend trade service: React/TypeScript/Leaflet, Express/Mongoose, transactional reservations. Further developed from the Group 11 course backend. |
| [SOLE_SEARCH](https://github.com/VincentDimov/sole-search) | Private | [Demo](https://sole-search-vincent.vercel.app/) | README, manifests, storefront and order service: vanilla JavaScript/Vite, Express, MongoDB transactions, server prices and idempotent orders. |
| [EVENTERA](https://github.com/VincentDimov/EVENTERA) | Private | [Demo](https://eventera-vincent.vercel.app/) | README, deployment documentation, manifests and booking service: vanilla JavaScript, Express/Mongoose/Zod, capacity transactions, cancellations, waiting lists and QR tickets. |
| [FOLIO](https://github.com/VincentDimov/folio) | Private | [Demo](https://folio-vincent-wine.vercel.app/) | README, manifests and services: vanilla JavaScript, Express, native MongoDB driver, revision-controlled drafts and separate published snapshots. |
| [Nordmark](https://github.com/VincentDimov/nordmark-marketplace) | Public | [Demo](https://nordmark-vincent.vercel.app/) | README, manifests and commerce service: Next.js/React/TypeScript, Prisma/PostgreSQL/Better Auth, serializable order transactions and isolated demo workspaces. |

All five public landing pages returned HTTP 200 during the review. Their public landing pages were captured as optimised WebP images under `public/images/projects/`. No customer account, purchase or message submission was required.

Demo limitations remain visible on the cards: simulated commerce, configuration-dependent mail and optional payment test code are described explicitly. Premium in FOLIO is a demonstration rather than a connected billing service. Repository access requirements are labelled separately from public demo links.

Existing project descriptions were expanded from the previously reviewed project evidence. The existing Anastasiia live URL was preserved and its public wellbeing/service page was checked. Existing case-study routes remain `/projects/ledgerapp`, `/projects/stayfinder` and `/projects/mini-ats`.

## Local verification

`npm run build` and all 17 existing tests passed. Chromium checks covered 375, 768 and 1440 pixel layouts in both languages and themes: sixteen expandable descriptions with three features each, archive counts (six initially, thirteen expanded), category filters (five fullstack, five websites/CMS, three interactive), source/demo links, loaded images and horizontal overflow. Native disclosure controls were exercised with Enter. Axe reported no WCAG A/AA violations in the changed project sections across all twelve combinations. Browser runtime errors were absent.

The machine-readable results are in [project-verification-2026-11-07.json](project-verification-2026-11-07.json). Screenshots are stored in `docs/screenshots/` with the `2026-11-07` date. These checks ran locally; no production deployment was performed.
