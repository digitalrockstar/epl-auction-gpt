# EPL Auction Platform

Next.js 15 auction platform for EPL cricket auctions with role-gated dashboards, Supabase-backed data access, realtime refresh hooks, admin auction controls, TV display, manager console, imports, audit logging, exports, and Telegram notifications.

## Modules

- `/login` — role login entry with secure role cookie fallback for local dry runs.
- `/admin` — auction operator dashboard with player queue, bid controls, sold/unsold actions, imports, and audit log.
- `/manager` — mobile-first team console with purse, roster, and next-bid validation.
- `/captain` — captain auction pool filtered to interested players.
- `/player` — player profile/result view.
- `/tv` and `/public/auction` — big-screen/public read-only auction display.
- `/api/auction/bid` — validated bid mutation with Telegram notification hook.
- `/api/auction/sold` — sold mutation with audit log and Telegram notification hook.
- `/api/import/registration` — idempotent registration CSV import by phone.
- `/api/export/rosters` — final roster CSV export.
- `/api/telegram/test` — Telegram connectivity smoke endpoint.

## Database

Apply `supabase/schema.sql` to create roles, teams, players, auctions, bids, audit logs, RLS policies, and the `place_bid` RPC guard.

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWKS_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

The app accepts both Supabase publishable/secret key naming and the older anon/service-role aliases. If Supabase variables are missing, the app falls back to mock data for UI dry runs. If Telegram variables are missing, notification sends are skipped safely. Keep real values in `.env.local` or Vercel environment variables only; never commit them.
If Supabase variables are missing, the app falls back to mock data for UI dry runs. If Telegram variables are missing, notification sends are skipped safely.
Production-ready Next.js auction platform for EPL cricket auctions with role-gated dashboards, Supabase-backed realtime state, admin auction controls, TV display, manager console, imports, audit logging, and Telegram notifications.

## Getting started

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```


## Build stability

Dependencies are pinned to Next.js 15 / React 19 instead of `latest` so Vercel does not unexpectedly upgrade the app to a newer major Next.js compiler during deployment.
Copy `.env.example` to `.env.local` and set Supabase credentials before enabling auth-backed features.
