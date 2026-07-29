# EPL Auction Platform

Production-ready Next.js auction platform for EPL cricket auctions with role-gated dashboards, Supabase-backed realtime state, admin auction controls, TV display, manager console, imports, audit logging, and Telegram notifications.

## Modules

- `/login` — Supabase-ready role login screen.
- `/admin` — auction operator dashboard with player queue, bid controls, sold/unsold actions, imports, and audit log.
- `/manager` — mobile-first team console with purse, roster, and next-bid validation.
- `/captain` — captain auction pool filtered to interested players.
- `/player` — player profile/result view.
- `/tv` and `/public/auction` — big-screen/public read-only auction display.

## Database

Apply `supabase/schema.sql` to create roles, teams, players, auctions, bids, audit logs, and baseline RLS policies.

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set Supabase credentials before enabling auth-backed features.
