create type public.user_role as enum ('super_admin', 'admin', 'manager', 'captain', 'player');
create type public.auction_mode as enum ('captains', 'players');
create type public.player_status as enum ('pending', 'live', 'sold', 'unsold', 'skipped', 'reauction');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'player',
  phone text unique,
  created_at timestamptz not null default now()
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  logo_url text,
  primary_color text not null default '#22d3ee',
  secondary_color text not null default '#2563eb',
  purse_limit integer not null default 2500000,
  manager_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id),
  phone text not null unique,
  name text not null,
  photo_url text,
  role text not null,
  batting_style text,
  bowling_style text,
  primary_skill text not null,
  wants_captain boolean not null default false,
  status public.player_status not null default 'pending',
  base_price integer not null default 50000,
  sold_price integer,
  team_id uuid references public.teams(id),
  stats jsonb not null default '{}'::jsonb,
  kit_images jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.auctions (
  id uuid primary key default gen_random_uuid(),
  mode public.auction_mode not null default 'players',
  current_player_id uuid references public.players(id),
  paused boolean not null default true,
  timer_seconds integer not null default 180,
  round_number integer not null default 1,
  public_token text unique not null default encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz not null default now()
);

create table public.bids (
  id uuid primary key default gen_random_uuid(),
  auction_id uuid not null references public.auctions(id) on delete cascade,
  player_id uuid not null references public.players(id),
  team_id uuid not null references public.teams(id),
  amount integer not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (auction_id, player_id, amount)
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.auctions enable row level security;
alter table public.bids enable row level security;
alter table public.audit_logs enable row level security;

create policy "authenticated read profiles" on public.profiles for select to authenticated using (true);
create policy "public auction read teams" on public.teams for select using (true);
create policy "public auction read players without pii" on public.players for select using (true);
create policy "public auction read auctions" on public.auctions for select using (true);
create policy "public auction read bids" on public.bids for select using (true);
