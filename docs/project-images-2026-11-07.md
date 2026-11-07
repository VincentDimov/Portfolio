# Project screenshots — 7 November 2026

All sixteen portfolio entries now use real interface screenshots, saved as optimised WebP files in `public/images/projects/`. Eight existing screenshots were retained and eight missing screenshots were added. Every project has English and Swedish alternative text.

| Added image | Capture source | Screen |
| --- | --- | --- |
| `anastasiia.webp` | https://anastasiia-friskvard.vercel.app/ | Public wellbeing homepage |
| `dspwebb.webp` | https://www.dspab.se/ | Public business homepage |
| `bokforingsmatchen.webp` | https://bokforingsmatchen.vercel.app/ | Public comparison-demo homepage |
| `nordblad.webp` | https://nordblad.vercel.app/ | Public newspaper homepage |
| `jobbportalen.webp` | https://jobbportalen-mauve.vercel.app/jobs | Public vacancies listing |
| `paskquiz.webp` | Local checkout of VincentDimov/PaskQuiz | Existing category-selection view |
| `jultomtesquiz.webp` | Local checkout of VincentDimov/JultomtesQuiz | Existing category-selection view |
| `pokemon.webp` | Local checkout of VincentDimov/PokemonApplicationAPI | Pikachu selected; real PokéAPI response and sprite loaded |

The five public pages returned HTTP 200 at capture time. Local quiz previews display the existing category-selection screen without changing the source project. The three local screenshots are explicitly captioned as local project previews; no public demo URL is implied. The browser chrome handles projects without a live URL by displaying their project name.

The production build passed. Chromium verification covered all sixteen loaded, unique images and translated alternative text at 375, 768 and 1440 pixels in both languages and themes. No horizontal overflow, runtime errors or WCAG A/AA violations were found in the project sections. Results are recorded in [project-images-verification-2026-11-07.json](project-images-verification-2026-11-07.json).

Visual reference: [all sixteen screenshots](screenshots/project-images-overview-2026-11-07.webp).

Changes were verified locally; no production deployment was performed.
