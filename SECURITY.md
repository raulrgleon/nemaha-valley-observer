# Security

- Auth.js JWT sessions; staff routes gated by middleware + server checks
- Zod validation on article/event/newsletter payloads
- Honeypot fields on public forms
- Stripe webhook signature verification when configured
- Audit log for article/event mutations
- No secrets committed; use `.env` on server only
- HTML from TipTap should be sanitized before untrusted display in future hardening
- Rate limiting recommended at nginx for `/api/*` in production hardening pass
