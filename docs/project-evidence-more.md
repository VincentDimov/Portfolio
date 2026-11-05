# Additional project verification

Reviewed on 5 November 2026 using the connected GitHub API. The facts below describe code in the repositories, not employment, commercial adoption, personal ownership of every feature, or measured business outcomes.

## Bokföringsmatchen

- Repository: <https://github.com/VincentDimov/bokforingsmatchen>
- Reviewed commit: `98744b753ea82abcbc37f6de75926647c276f4c7`
- Verified name: **Bokföringsmatchen**.
- Category: business tools / frontend application demo.
- Direct technologies: Next.js 15, React 19, TypeScript, CSS; Playwright tests.
- Verified purpose: a Swedish/English accounting-agency comparison demo with directory filters, agency profiles, a multistep quote form, indicative price calculator, financial calculators, and searchable knowledge articles.
- Crucial limitation: agency data is fictitious; quote submissions are saved in browser localStorage. There is no external lead-delivery server. Do not describe the site as having real agency customers or a live lead-generation business.
- Read: `README.md`, `package.json`, `components/SearchDirectory.tsx`, `components/PriceCalculator.tsx`, `lib/leads.ts`; repository tree also confirms calculator, language, knowledge-bank and test modules.
- Sources: [README](https://github.com/VincentDimov/bokforingsmatchen/blob/98744b753ea82abcbc37f6de75926647c276f4c7/README.md), [package](https://github.com/VincentDimov/bokforingsmatchen/blob/98744b753ea82abcbc37f6de75926647c276f4c7/package.json), [local lead adapter](https://github.com/VincentDimov/bokforingsmatchen/blob/98744b753ea82abcbc37f6de75926647c276f4c7/lib/leads.ts).
- Demo discovered from GitHub `homepage`: <https://bokforingsmatchen.vercel.app/>. Visited: HTTP 200, title “Hitta rätt redovisningsbyrå”.
- Suggested card copy: “A bilingual accounting-agency comparison demo with search filters, local quote forms and transparent price calculators.”

## Nordbladet

- Repository: <https://github.com/VincentDimov/Nordblad>
- Reviewed commit: `104b292c09ecaa14100000cb673b755bf7006a5e`
- Verified product name is **Nordbladet**, despite repository name Nordblad.
- Category: headless CMS / editorial website.
- Direct technologies: Next.js 16, React, JavaScript/JSX, Tailwind CSS 4, Storyblok Delivery API and `@storyblok/react` RSC integration.
- Verified purpose: a student newspaper/headless-CMS course project with articles, article details, authors, author profiles, categories and CMS-controlled blocks. Article-author relations and category filtering are implemented in `src/lib/storyblok.js`.
- Read: `README.md`, `package.json`, `src/lib/storyblok.js`, `src/app/articles/[slug]/page.js`, `src/app/layout.js`.
- Sources: [README](https://github.com/VincentDimov/Nordblad/blob/104b292c09ecaa14100000cb673b755bf7006a5e/README.md), [package](https://github.com/VincentDimov/Nordblad/blob/104b292c09ecaa14100000cb673b755bf7006a5e/package.json), [Storyblok integration](https://github.com/VincentDimov/Nordblad/blob/104b292c09ecaa14100000cb673b755bf7006a5e/src/lib/storyblok.js).
- Demo discovered from GitHub `homepage`: <https://nordblad.vercel.app/>. Visited: HTTP 200, title “Nordbladet”.
- Suggested card copy: “A student-built editorial site with Storyblok-managed articles, authors and categories, rendered with Next.js.”

## Jobbportalen

- Repository: <https://github.com/VincentDimov/jobbportalenCMS>
- Reviewed commit: `d52473f0b7f0b82f7bada03e581eed4e545df2e5`
- Verified name: **Jobbportalen**.
- Category: headless CMS / job listings.
- Direct technologies: Next.js 16, React 19, TypeScript, Storyblok Delivery API and RSC integration; CSS.
- Verified purpose: CMS-managed job listings and detail pages. Department filtering and text search use Storyblok queries. The jobs page retrieves published CMS blocks and passes search parameters through the block composition.
- Read: `README.md`, `package.json`, `AGENTS.md`, `src/lib/storyblok.ts`, `src/app/jobs/page.tsx`.
- Sources: [README](https://github.com/VincentDimov/jobbportalenCMS/blob/d52473f0b7f0b82f7bada03e581eed4e545df2e5/README.md), [package](https://github.com/VincentDimov/jobbportalenCMS/blob/d52473f0b7f0b82f7bada03e581eed4e545df2e5/package.json), [query implementation](https://github.com/VincentDimov/jobbportalenCMS/blob/d52473f0b7f0b82f7bada03e581eed4e545df2e5/src/lib/storyblok.ts).
- Working demo discovered from GitHub `homepage`: <https://jobbportalen-mauve.vercel.app/jobs>. Visited: HTTP 200, title “Jobbportalen”.
- Do not use the older README deployment `jobbportalen-o3shvllef-jobapplication.vercel.app`: it redirects to Vercel login and is not a public demo.
- Suggested card copy: “A CMS-driven job board with department filters, keyword search and dedicated job pages.”

## Påsk Quiz

- Repository: <https://github.com/VincentDimov/PaskQuiz>
- Reviewed commit: `a41ae5ce7c905dd0f904b13757247365ed7f2a5f`
- Repository visibility at review: **private**. Label repository access honestly; a public visitor may see a 404.
- Verified displayed name: **Påsk Quiz**.
- Category: JavaScript quiz / learning project.
- Technologies: HTML, CSS, vanilla JavaScript. No `package.json` exists in the repository tree.
- Verified functionality: Easter categories, randomized multiple-choice questions, timed answers, progress, results and audio feedback. The visible instructions describe ten questions and ten seconds per answer.
- Read: `README.md`, `index.html`, `script.js`; tree confirms `styles.css` and local media assets.
- Sources: [HTML](https://github.com/VincentDimov/PaskQuiz/blob/a41ae5ce7c905dd0f904b13757247365ed7f2a5f/index.html), [quiz logic](https://github.com/VincentDimov/PaskQuiz/blob/a41ae5ce7c905dd0f904b13757247365ed7f2a5f/script.js).
- No public demo URL found in repository metadata or documentation. Do not guess a deployment address or include a nonfunctional demo action.
- Suggested card copy: “An Easter-themed JavaScript quiz with category selection, timed questions and result feedback.”

## Jultomtes Quiz

- Repository: <https://github.com/VincentDimov/JultomtesQuiz>
- Reviewed commit: `fc78f710f0e75bd070717e3f8d5ebe36563e752d`
- Repository visibility at review: **private**. Label repository access honestly.
- Verified displayed name: **Jultomtes Quiz**.
- Category: JavaScript quiz / learning project.
- Technologies: HTML, CSS, vanilla JavaScript. No `package.json` exists in the repository tree.
- Verified functionality: Christmas-themed categories, multiple-choice question randomization, timer, progress, scoring and audio feedback.
- Read: `README.md`, `index.html`, `script.js`; tree confirms CSS and local media files.
- Sources: [HTML](https://github.com/VincentDimov/JultomtesQuiz/blob/fc78f710f0e75bd070717e3f8d5ebe36563e752d/index.html), [quiz logic](https://github.com/VincentDimov/JultomtesQuiz/blob/fc78f710f0e75bd070717e3f8d5ebe36563e752d/script.js).
- No public demo URL found in repository metadata or documentation.
- Suggested card copy: “A Christmas-themed quiz exploring DOM interaction, timed game states and multiple-choice scoring.”

## Pokemon Application

- Repository: <https://github.com/VincentDimov/PokemonApplicationAPI>
- Reviewed commit: `8f41e6ff158f68b7f33f8e672523e9ec8ae8be28`
- Verified README name: **Pokemon Application**.
- Category: API integration / learning project.
- Technologies: React, JavaScript/JSX, Vite, CSS, Fetch API, PokéAPI. This is a frontend consuming a public API, not a custom Pokémon backend.
- Verified functionality: start action, retrieval of 151 Pokémon into a dropdown, detail fetch for a selected Pokémon, and display of sprite, types, weight and height.
- Read: `README.md`, `package.json`, `src/App.jsx`, `src/components/PokemonApplication.jsx`, `src/components/Pokemon.jsx`.
- Sources: [README](https://github.com/VincentDimov/PokemonApplicationAPI/blob/8f41e6ff158f68b7f33f8e672523e9ec8ae8be28/README.md), [package](https://github.com/VincentDimov/PokemonApplicationAPI/blob/8f41e6ff158f68b7f33f8e672523e9ec8ae8be28/package.json), [API fetch and selection](https://github.com/VincentDimov/PokemonApplicationAPI/blob/8f41e6ff158f68b7f33f8e672523e9ec8ae8be28/src/components/PokemonApplication.jsx).
- No public demo URL found in repository metadata or documentation.
- Suggested card copy: “A React learning project that fetches Pokémon from PokéAPI and displays details for a selected entry.”

## Content boundaries

The inspected repositories do not establish individual authorship of every component, professional seniority, paying customers, adoption figures or business results. Those claims should remain absent. Repository timestamps are not years-of-experience evidence. Small quiz/API exercises should be presented as limited learning-project experience rather than expert capabilities.
