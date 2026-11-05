# Primary project verification

Reviewed 5 November 2026 using the connected GitHub API, repository README files, direct dependencies, representative source and public HTTP visits. These are portfolio projects, not evidence of paid customers, employment, commercial success or sole authorship. Do not turn repository claims into measured production outcomes.

## Selected work candidates

### LedgerApp — `AppenBokforing`

- Repository: <https://github.com/VincentDimov/AppenBokforing> (public, default branch `master`). Reviewed commit `0f461b7f92fb97edb4c8aff366ba33d0d7fc090e`.
- Live URL from official repository homepage: <https://bokforingsappen.vercel.app/>. GET returned **200**, title **LedgerApp**.
- Purpose: a Swedish bookkeeping application connecting a browser workspace, API and persistent accounting model.
- Implemented source areas: authentication and organisations, chart of accounts, fiscal years, journal entries, reports, attachments, SIE import/export and audit. API modules are registered in `apps/api/src/app.module.ts`; PostgreSQL model is in `packages/db/prisma/schema.prisma`.
- Direct technologies: Next.js, React, TypeScript, Tailwind CSS, NestJS, PostgreSQL, Prisma. Testing dependencies include Jest and Playwright; monorepo uses pnpm/Turborepo.
- Evidence: `README.md`, `apps/web/package.json`, `apps/api/package.json`, `packages/db/package.json`, `apps/api/src/app.module.ts`, `packages/db/prisma/schema.prisma` on the reviewed branch.
- Suitable portfolio framing: a personal fullstack accounting project exploring domain modelling, API contracts and traceable financial workflows.
- Do not claim an officially licensed complete BAS catalogue, accountant certification, regulatory approval, production suitability for real books, or measured business improvements. README explicitly says the full official BAS release is blocked/incomplete. Historical stage reports should not be presented as current deployment results.

### StayFinder

- Repository: <https://github.com/VincentDimov/StayFinder> (public, `main`). Reviewed commit `37abb4d8db083e7a6cd9e6e0f79085084bbefb41`.
- Live URL from official repository homepage and README: <https://stayfinder-tau-sepia.vercel.app/>. GET returned **200**, title **StayFinder · Hitta din nästa paus**.
- README explicitly identifies this as an **individual WEBB25 Backend 2 TypeScript assignment**. It may be described as a course project; do not turn it into a commercial booking business.
- Implemented features: property browsing and management, host/guest access, date-based bookings, server-calculated price, booking status changes, persistent sessions and ownership checks.
- Direct technologies: Next.js, React, TypeScript, Hono, PostgreSQL (`pg`), Zod, Docker for local database setup. Supabase hosts PostgreSQL in deployment; authentication is implemented by Hono, not Supabase Auth. No direct Tailwind dependency in this project.
- `backend/src/app.ts` implements property and booking routes. `backend/sql/001_schema.sql` uses forced RLS and a PostgreSQL exclusion constraint over property ID + date range to prevent overlapping active bookings, including concurrent writes.
- Evidence: `README.md`, `frontend/package.json`, `backend/package.json`, `backend/src/app.ts`, `backend/sql/001_schema.sql`.
- Appropriate technical lesson: database constraints complement server validation and browser feedback when correctness matters.

### Mini ATS — `mini-ATS-Vincent`

- Repository: <https://github.com/VincentDimov/mini-ATS-Vincent> (public, `main`). Reviewed commit `23b8f943dff58801d5215aedb3aa788c816071a3`.
- Live URL from official repository homepage: <https://miniatsvincent.vercel.app/>. GET returned **200**, title **Mini ATS**. Authenticated workspace features were verified in source, not by signing in or handling real CVs.
- Purpose: a recruitment workflow application for organisations, jobs and candidates.
- Implemented source features: admin/customer roles, organisation separation, job management, candidate register, drag-and-drop Kanban pipeline, CV PDF upload, search/filtering, CSV export and interview/activity-related workflow code documented by README.
- Direct technologies: Next.js, React, TypeScript, Tailwind CSS, Supabase Auth, PostgreSQL/RLS, Supabase Storage. Drag-and-drop uses `@hello-pangea/dnd`; Playwright is a direct testing dependency.
- An optional server-side OpenAI CV-summary integration exists. It requires a server API key. Code presence does **not** verify that AI analysis is configured in the public deployment. Describe it as optional/configuration-dependent, not deployed specialist AI capability.
- Evidence: `README.md`, `package.json`, `src/app/actions.ts`, `src/lib/ai-analysis.ts`, `src/lib/auth.ts`, `supabase/migrations/`.
- Appropriate technical lesson: permissions must be enforced in server/data layers, not only hidden in the UI. Do not claim paid customers or sole authorship from repository ownership alone.

## Other verified projects

### Anastasiia

- Repository: <https://github.com/VincentDimov/anastasiia> (**private**). Reviewed commit `af11b480e2d5ca0e40ae1a6a94913f0342198586` via authorised GitHub access.
- Live URL from official repository homepage and `lib/content.ts`: <https://anastasiia-consultation.vercel.app/>. GET returned **200** with the consultation-site title.
- Purpose: a responsive consultation website rebuilt from a Tilda source, with structured service, article, gallery and education content. The repository includes Russian content and a Swedish `/sv` route.
- Direct stack: Next.js, React, TypeScript, Tailwind CSS, Lucide; local WebP optimisation and `next/image` are documented.
- Evidence: `README.md`, `package.json`, `lib/content.ts`, `content/migration.json`, `app/` route structure.
- Contact form is intentionally disabled without webhook/privacy configuration; use verified contact links instead. Do not claim active booking submissions without checking configuration.
- Portfolio source link must clearly say **Private repository** or be omitted as a clickable public-code promise. Public demo remains useful. Do not copy private client/personal content into the portfolio.

### DSPWEBB

- Repository: <https://github.com/VincentDimov/DSPWEBB> (**private**). Reviewed commit `b700852346bc7d078518414801295f05f2a105da` via authorised GitHub access.
- Live URLs discovered in official repository metadata/README: <https://dspwebb.vercel.app/> and <https://www.dspab.se/>. Both GETs returned **200** with the DSP business-site title.
- Purpose: a bilingual business website with three service areas and shared identity, service pages and contact paths.
- Direct stack: Next.js, React, TypeScript, Tailwind CSS, Motion, Lucide, Nodemailer.
- Implemented source features: URL-based Swedish/English routing, responsive navigation, service-specific pages and server contact endpoint. `src/components/language-switcher.tsx` verifies path-based locale switching; README documents the SMTP endpoint and disabled/error cases.
- Evidence: `README.md`, `package.json`, `src/components/language-switcher.tsx`, `src/app/api/contact/route.ts`, `src/lib/content.ts`.
- Do not turn concept projects or proposed services within that site into delivered client engagements. The portfolio should discuss the website implementation, not reproduce unneeded business or personal details.
- Mark source as private; public demo can be linked. No form was submitted and no external email was sent during verification.

## Selection rationale

LedgerApp, StayFinder and Mini ATS form a useful three-project selection: accounting domain modelling, a booking application with database correctness, and a recruitment workflow with permissions and document handling. Together they demonstrate frontend, API and database work without arbitrary performance metrics. Anastasiia and DSPWEBB complement them with content structure, responsive design and bilingual business-site work.

## Link verification scope

The demo checks above confirm successful public page responses and matching titles on the review date. They do not attest that every authenticated workflow, external integration, email path or deployment environment is production-ready. No authentication, live data mutation or email submission was performed.
