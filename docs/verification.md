# Verification — 5 November 2026

The implementation was verified locally without deploying, signing into project demos, submitting third-party forms or sending test email to an external mailbox.

## Content and source

- All eleven requested repositories were inspected through the authorised GitHub connection: README, direct dependencies and representative implementation files.
- Public demos were discovered from repository metadata/documentation, visited and checked for a successful page response and matching title.
- LedgerApp, StayFinder and Mini ATS were selected to show accounting workflows, booking correctness and recruitment permissions respectively. Their screenshots show actual public landing pages.
- Invented senior roles, employers, experience years, product counts, countries, percentage results, example projects and decorative performance metrics were removed. The About section includes the supplied education and business background, without an employment timeline or application/LIA copy.
- Private repository access and prototype limitations are labelled. Authenticated demo features are source-verified, not claimed to have been exercised against live user data.

## Browser checks

Chromium was used to inspect the existing portfolio and reference site on desktop and mobile, then the local implementation at 375, 768 and 1440 pixels.

| Check | Evidence |
| --- | --- |
| Both languages × both themes × three widths | 12 combinations, no horizontal page overflow |
| Accessibility | axe WCAG 2 A/AA and 2.1 A/AA: no detected violations on the 12 homepage combinations |
| Selected case studies | All three opened directly in both languages; title and canonical verified; no detected WCAG 2 A/AA violations |
| Keyboard and mobile menu | Focus stays in the open menu, Escape closes it, focus returns to its trigger |
| Calendar | Real data, arrow-key inspection, native date input, month labels and selected-date count |
| GitHub failures | Rate-limit response shows an error without a zero calendar; retry loads real data |
| Project overview | Three selected projects; all eight additional projects reachable; filters work |
| Language and theme | Globe and theme toggles work and persist across reloads |
| Contact validation | Invalid fields are described and the first field receives focus |
| Contact server without credentials | Real local endpoint returns 503; message text remains; no success is shown |
| Contact loading/success UI | Verified with an explicitly intercepted accepted response; no external email sent |
| Runtime | No JavaScript page errors in the checked flows |

These automated accessibility checks supplement visual and keyboard inspection; they do not establish exhaustive accessibility certification. Safari and Firefox were not run in this environment.

Raw results: [verification-results.json](verification-results.json).

## Server and build checks

`npm test` passes all **17 tests**, covering the GitHub parser, rolling/leap-year dates, missing data, upstream failures and caching, plus SMTP configuration, fixed destination, reply-to, input/header validation, origins, honeypots, payload size, rate limiting and confirmed/rejected SMTP acceptance. The transport is injected in tests, so no real mail is sent.

`npm run build` checks TypeScript and generates the production Vite frontend. The Vercel function exports are also imported directly during the server tests. No client bundle contains an SMTP password or GitHub token.

The generated production frontend was also served with `npm run preview`: light-theme default, direct case-study route, live GitHub API, persisted Swedish selection and server field-error rendering passed. No unexpected console errors were recorded.

## Screenshots

- [Desktop — Swedish, light](screenshots/desktop-sv-light.webp)
- [Mobile — Swedish, light](screenshots/mobile-sv-light.webp)
- [Desktop — English, dark](screenshots/desktop-en-dark.webp)
- [Mobile — English, dark](screenshots/mobile-en-dark.webp)
- [StayFinder case study — Swedish](screenshots/case-stayfinder-sv.webp)
- [GitHub failure state — mobile](screenshots/github-error-mobile.webp)

The other language/theme/viewport captures are in `docs/screenshots/`.

## Remaining configuration

The real mailbox password was not available locally. Configure `SMTP_USER=vincent@dspab.se` and the existing one.com `SMTP_PASS` as server-only environment variables in the Portfolio Vercel project. The same credentials are not automatically inherited from DSPWEBB. See [contact.md](contact.md).

Actual inbox delivery and Vercel production execution must be checked after that configuration is available. No production publication has been performed.
