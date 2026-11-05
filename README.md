# Ventsislav Dimov — Portfolio

A personal fullstack developer portfolio connecting real projects, their technical foundations and the thinking behind them.

**Website:** [ventsislavdimov.vercel.app](https://ventsislavdimov.vercel.app/)

**GitHub:** [VincentDimov](https://github.com/VincentDimov)

**Contact:** [vincent@dspab.se](mailto:vincent@dspab.se)

## The experience

- Three featured projects: **LedgerApp**, **StayFinder** and **Mini ATS**, each with a dedicated case study.
- Eight additional projects with category filters and an expandable overview.
- Real GitHub contributions for the latest twelve months, with keyboard and touch support.
- Technology cards connected to the projects where the technologies are used.
- A concise About / Approach section with a business perspective and current education.
- Light theme by default, a persistent dark-theme option and reduced-motion support.
- Complete English and Swedish content, switched with a globe button in the header and remembered between visits.
- A server-backed contact form using Nodemailer and one.com, plus direct email and LinkedIn links. Success is shown only after SMTP accepts the fixed destination.

Built with **React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide**. The GitHub endpoint uses Node.js built-ins and no API token. Nodemailer handles server-side email.

## Run locally

Use Node.js 22 or later and npm.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. A local Vite middleware runs the same GitHub activity handler as the Vercel Function, so the calendar works during development and preview.

For email, configure the same one.com mailbox used by DSPWEBB: `SMTP_USER` and the server secret `SMTP_PASS`. See [.env.example](.env.example) and [contact configuration](docs/contact.md). No credentials are included. Without them the form reports that sending is unavailable and preserves the message.

```bash
npm test          # Contribution parser, period, upstream error and cache tests
npm run build    # TypeScript and production Vite build
npm run preview  # Preview the production frontend with the local GitHub endpoint
```

## Structure

```text
api/                         Vercel Functions for GitHub activity and contact email
scripts/                     Shared server handlers and local Vite middleware
src/
  components/
    layout/                  Navigation and footer
    projects/                Project cards, screenshots and concept diagrams
    sections/                Hero, Work, About, Activity & Tech, More Projects, Contact
    ui/                      Reusable interface components
    visuals/                 Decorative UI → API → data diagram
  data/                      Typed profile, project, skill and social content
  hooks/                     Section tracking and keyboard easter egg
  lib/                       Calendar validation and shared utilities
  pages/                     Selected project case studies
  index.css                  Design tokens, themes and responsive layout
public/images/projects/      Optimised WebP screenshots of public landing pages
tests/                       Node tests for the GitHub integration
docs/                        Verification evidence, data-source notes and screenshots
```

## Content and evidence

| Content | Source |
| --- | --- |
| Name, title and background | `src/data/profile.ts` |
| Email and social links | `src/data/socials.ts` |
| All eleven projects and case studies | `src/data/projects.ts` |
| Technology areas | `src/data/skills.ts` |
| English and Swedish interface text | `src/data/copy.ts` |
| Swedish projects and skills | `src/data/projects.sv.ts`, `src/data/skills.sv.ts` |
| Page metadata and Person schema | `index.html` |

Project descriptions were checked against repository READMEs, direct dependencies and relevant source on **5 November 2026**. The evidence files record reviewed commits and public demo checks:

- [Primary project evidence](docs/project-evidence-primary.md)
- [Additional project evidence](docs/project-evidence-more.md)

Private repositories are labelled as private. Small exercises remain small exercises; no customer counts, commercial outcomes, employment history or experience years are inferred from repository metadata. The selected screenshots show public landing pages, not authenticated workspaces. Other projects use labelled concept diagrams.

## GitHub data

`/api/github-activity` reads GitHub’s official public contribution calendar for `VincentDimov`, combines calendar years and validates each date in the rolling twelve-month period. The displayed total is the sum of those daily counts. Contributions include more than commits.

Successful responses are cached by Vercel’s CDN for six hours with one day of stale-while-revalidate. Errors are not cached. The UI shows the exact period and source update time, and may retain an explicitly labelled last-successful calendar when a refresh fails. No credentials are required or exposed.

The public calendar HTML is not a versioned API. If its markup changes, the endpoint reports an error instead of inventing a zero-filled calendar. See [GitHub data and update strategy](docs/github-activity.md).

## Routing and hosting

The frontend builds into `dist/`. Vercel runs the root `api/` functions and uses `vercel.json` to serve selected project routes through the SPA:

- `/projects/ledgerapp`
- `/projects/stayfinder`
- `/projects/mini-ats`

A static-only host needs equivalent API endpoints for live contributions and email. Without the GitHub endpoint, the site displays an error and direct-profile fallback. Direct project URLs also need an SPA fallback. No new service account or subscription is required; email reuses the existing one.com mailbox credentials.

## Verification

Browser verification covers 375, 768 and 1440-pixel layouts in both languages and themes, project filters, direct case-study URLs, calendar keyboard navigation, error/retry states, mobile navigation and contact validation/loading/error/success handling. Findings and screenshots are stored in `docs/`. Unit tests use an injected SMTP transport and do not send email. Real mailbox delivery requires configuring `SMTP_PASS` in the Portfolio project.

The repository changes are prepared for review. No deployment or external form submission is part of the verification workflow.

## Connect

- [GitHub](https://github.com/VincentDimov)
- [LinkedIn](https://www.linkedin.com/in/ventsislav-dimov-587490227/)
- [Email](mailto:vincent@dspab.se)
