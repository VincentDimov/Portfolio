# Ventsislav Dimov — Portfolio

A premium, product-focused portfolio for **Ventsislav Dimov**, a fullstack developer who enjoys turning complex ideas into clear, fast and thoughtful digital experiences.

Designed as more than a standard developer portfolio: the site combines editorial layouts, product-style case studies and refined interactions in a responsive dark-first interface.

## Highlights

- Responsive, accessible single-page portfolio
- Four data-driven project case studies with dedicated routes
- Dark and light theme with persisted user preference
- Polished Framer Motion reveals and hover interactions
- CSS-built product mockups — no stock photography required
- Responsive mobile navigation with keyboard focus handling
- Contact form UI with client-side validation, loading and success states
- SEO metadata, Open Graph tags, JSON-LD and semantic landmarks
- Reduced-motion support and a small Konami-code easter egg

## Tech stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/)

## Getting started

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Install and run

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

Preview the generated production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
├── components/
│   ├── layout/       # Navigation and footer
│   ├── projects/     # Case study cards and CSS product previews
│   ├── sections/     # Portfolio page sections
│   ├── ui/           # Reusable interface primitives
│   └── visuals/      # Hero system visual
├── data/             # Editable portfolio content
├── hooks/            # Scroll tracking and easter egg logic
├── pages/            # Project case-study view
├── App.tsx           # Application composition and theme state
└── index.css          # Design tokens, layouts and responsive styles
```

## Updating the content

Portfolio content is intentionally separated from UI code.

| What to update | File |
| --- | --- |
| Name and professional title | `src/data/profile.ts` |
| Email, GitHub and LinkedIn | `src/data/socials.ts` |
| Featured projects and case-study details | `src/data/projects.ts` |
| Work history | `src/data/experience.ts` |
| Technical skills and principles | `src/data/skills.ts` |

The project cards currently use bespoke CSS product mockups. Replace those with real project imagery later by updating `ProjectVisual.tsx` or introducing image assets while retaining descriptive alternative text.

## Routes

| Route | Description |
| --- | --- |
| `/` | Main portfolio experience |
| `/projects/signal` | Signal case study |
| `/projects/atlas` | Atlas case study |
| `/projects/northstar` | Northstar case study |
| `/projects/relay` | Relay case study |

## Deployment

The project builds to the `dist/` directory and can be deployed to any static host, including Vercel, Netlify, Cloudflare Pages or GitHub Pages.

For hosts serving an SPA, configure a fallback so direct visits to `/projects/*` return `index.html`.

## Contact

- GitHub: [VincentDimov](https://github.com/VincentDimov?tab=repositories)
- LinkedIn: [Ventsislav Dimov](https://www.linkedin.com/in/ventsislav-dimov-587490227/)
- Email: [vincent@dspab.se](mailto:vincent@dspab.se)

---

Built with React, TypeScript and a considered amount of coffee.
