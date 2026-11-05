# GitHub contribution calendar

The portfolio reads **real, public contribution counts** for `VincentDimov` from GitHub's own public calendar at `https://github.com/users/VincentDimov/contributions`. This includes GitHub contributions, not only commits. GitHub determines which activity qualifies and which public/private activity is visible; the portfolio does not infer private work or professional experience from it.

## Period and validation

`scripts/github-activity.mjs` requests the calendar years that overlap the latest twelve months, then selects only the inclusive UTC date range from the day after the same date last year through today. The current day may be incomplete. Dates, exact tooltip counts and GitHub intensity levels are parsed from the official calendar HTML. Every requested date must exist. Missing data or a changed source format produces an error, never a zero-filled calendar. The total is summed from the exact daily values shown in that same range.

The public HTML endpoint requires no token or additional account. It is maintained by GitHub but is not a versioned API, so parser tests and visible failure handling are intentional. The source parser is isolated so it can be updated if GitHub changes its markup. A GitHub GraphQL integration could replace it later if a server-only token is configured; there is no need to expose any `VITE_` credential.

## Delivery, cache and updates

`api/github-activity.mjs` serves a Vercel Node.js function using a standard Web `fetch` handler. It never accepts an arbitrary upstream URL or username. Successful responses use Vercel CDN caching for six hours and allow stale-while-revalidate for one day. A request after cache expiry triggers a refresh. The UI displays the source response's `fetchedAt` timestamp and exact period, so a cached date range is visible.

Errors use `Cache-Control: no-store`. Rate limits, a changed calendar, partial data and network failures return an error object with no total. The browser retains only its last successfully validated result in session storage, for at most seven days. If a refresh fails, that saved calendar is explicitly labelled with its last successful update and the failure notice. With no saved data, the UI shows an error, retry control and direct GitHub link. A genuine all-zero response has a separate empty state.

## Local development

Vite's middleware for `/api/github-activity` calls the same `createActivityResponse(new Request(...))` helper and forwards its standard Response status, headers and body. It is registered for both `configureServer` and `configurePreviewServer`, and retains a successful response for six hours in the local process. Vercel runs the root `api/` function automatically when the repository is deployed. Static-only hosts cannot execute this function and display the documented fallback unless an equivalent server endpoint is supplied.

## Accessibility

The calendar supports pointer hover, touch selection and keyboard arrows. Tab enters at one selected day; Up/Down move one day, Left/Right one week, Page Up/Down four weeks, Home/End the first/last day. Every button has its date and exact count in an accessible name. A persistent text detail below the calendar exposes the same information to touch users; no hover-only tooltip is required. Only the calendar region scrolls horizontally on narrow viewports.

## Verification

Run `node --test tests/github-activity.test.mjs` for parser/count, rolling-period, missing-day, failure, method and cache behavior. The tests use clearly isolated upstream fixtures. No fixture or generated count enters the production UI.

The implementation follows [Vercel's standard Web handler guidance](https://vercel.com/docs/functions/runtimes/node-js) without an extra SDK or runtime dependency.
