# Nemaha Valley Observer

Community newspaper platform for southeast Nebraska — part of the [deto.llc](https://deto.llc) ecosystem.

**Live:** [newspaper.deto.llc](https://newspaper.deto.llc)

A modern newsroom site for the Nemaha Valley Observer: homepage, sections, obituaries, public notices, events, archives continuity (Herald / Chieftain), subscriptions, local advertising, and a staff admin to draft → review → publish.

## Stack

- Next.js 15 · TypeScript · Tailwind
- PostgreSQL · Prisma
- Auth.js · TipTap editor
- Optional Stripe / Resend / OpenWeather (graceful fallbacks)

## Local setup

```bash
cp .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

## Docs

- `DEPLOYMENT.md`
- `EDITORIAL_WORKFLOW.md`
- `SECURITY.md`
- `MIGRATION_PLAN.md`

Built by [Raul Garcia](https://deto.llc) · Auburn, Nebraska
