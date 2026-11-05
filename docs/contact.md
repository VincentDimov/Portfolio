# Contact email

The contact form posts to `/api/contact`, a Vercel Node.js function using **Nodemailer and one.com**, matching the SMTP solution in DSPWEBB. The destination is fixed server-side as `vincent@dspab.se`. The visitor supplies a reply-to address, never the envelope sender or recipient.

## Configuration

Set the following server variables in the Portfolio Vercel project, or in an ignored `.env.local` for local development:

```dotenv
SMTP_USER=vincent@dspab.se
SMTP_PASS=<the existing one.com mailbox password>
```

These are the same variable names as DSPWEBB. The defaults are `send.one.com`, port `465`, implicit TLS, and a sender equal to `SMTP_USER`. Optional `SMTP_HOST`, `SMTP_PORT` and `SMTP_FROM` support another authorised sender or transport. Never add a `VITE_` prefix to any SMTP variable. No password is included in this repository or client bundle.

The password was not present in the local DSPWEBB configuration during implementation. If it is already stored as a Vercel secret, configure the same mailbox credentials separately in the Portfolio project's environment; Vercel project variables are not inherited from DSPWEBB. No production settings or deployments were changed.

For an authorised preview or custom domain, set its exact HTTPS origin as `CONTACT_SITE_URL`. The canonical portfolio origin and local Vite ports 5173/4173 are already accepted. Vite's middleware loads server variables and runs the same handler during `dev` and `preview`.

## Behaviour

- Server validation enforces name/email/message sizes and caps request bodies at 16 KiB.
- Origin checks, a honeypot and a bounded per-instance rate backstop reject unwanted requests. The rate limit is not claimed to be shared between server instances.
- Email is plain text with a fixed destination; headers cannot be controlled through form fields.
- Success is returned only after SMTP explicitly accepts the destination. This confirms server acceptance, not a guarantee about the recipient's inbox/spam filtering.
- Missing configuration returns 503; rejected delivery returns 502. Input remains in the form after an error.
- Email and LinkedIn links remain available when sending fails.
- Responses are never cached, and logs do not include submitted data, passwords or SMTP response details.

Run `npm test` for isolated SMTP contract tests. They inject a test transport and send no external email. Real mailbox delivery must be checked after the secret is configured.
