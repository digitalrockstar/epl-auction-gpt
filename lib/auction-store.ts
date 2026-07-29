import { AUCTION_RULES, bidFloor, canBid } from "@/lib/auction";
import { auctionState, bids, players, teams } from "@/lib/data/mock";
import { createServiceClient } from "@/lib/supabase";
import type { AuctionMode, Player, Team } from "@/lib/types";

export async function getAuctionSnapshot() {
  const supabase = createServiceClient();

  console.log("Supabase client exists:", !!supabase);

  if (!supabase) {
    console.log("⚠️ No Supabase client. Falling back to mock data.");
    return {
      teams,
      players,
      bids,
      auction: auctionState,
      source: "mock" as const,
    };
  }

  const [teamsRes, playersRes, auctionsRes] = await Promise.all([
    supabase.from("teams").select("*"),
    supabase.from("players").select("*"),
    supabase
      .from("auctions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1),
  ]);

  console.log("========== SUPABASE DEBUG ==========");
  console.log("Teams Error:", teamsRes.error);
  console.log("Players Error:", playersRes.error);
  console.log("Auctions Error:", auctionsRes.error);

  console.log("Teams Count:", teamsRes.data?.length);
  console.log("Players Count:", playersRes.data?.length);
  console.log("Auctions Count:", auctionsRes.data?.length);
  console.log("====================================");

  const dbTeams = teamsRes.data;
  const dbPlayers = playersRes.data;
  const dbAuctions = auctionsRes.data;

  return {
    teams: dbTeams?.length ? mapTeams(dbTeams) : teams,
    players: dbPlayers?.length ? mapPlayers(dbPlayers) : players,
    bids,
    auction: dbAuctions?.[0]
      ? {
          ...auctionState,
          id: dbAuctions[0].id,
          mode: dbAuctions[0].mode,
          paused: dbAuctions[0].paused,
          currentPlayerId:
            dbAuctions[0].current_player_id ?? auctionState.currentPlayerId,
          timerSeconds: dbAuctions[0].timer_seconds,
        }
      : auctionState,
    source: "supabase" as const,
  };
}

export async function placeBid(input: {
  teamId: string;
  playerId: string;
  amount?: number;
  mode: AuctionMode;
  actorId?: string;
}) {
  const snapshot = await getAuctionSnapshot();

  const team = snapshot.teams.find((item) => item.id === input.teamId);
  const player = snapshot.players.find((item) => item.id === input.playerId);

  if (!team || !player) {
    throw new Error("Invalid team or player");
  }

  const currentBid = snapshot.auction.currentBid?.amount ?? null;

  const amount = input.amount ?? bidFloor(currentBid, input.mode);

  if (amount < bidFloor(currentBid, input.mode)) {
    throw new Error("Bid below floor");
  }

  if (
    !canBid({
      purseRemaining: team.purseRemaining,
      currentBid,
      mode: input.mode,
      playersOwned: team.playersBought,
    })
  ) {
    throw new Error("Purse reserve rule blocks bid");
  }

  const supabase = createServiceClient();

  if (!supabase) {
    return {
      ok: true,
      simulated: true,
      amount,
    };
  }

  if (!snapshot.auction.id) {
    throw new Error("Auction id missing");
  }

  await supabase.from("bids").insert({
    auction_id: snapshot.auction.id,
    player_id: input.playerId,
    team_id: input.teamId,
    amount,
    created_by: input.actorId,
  });

  await supabase.from("audit_logs").insert({
    actor_id: input.actorId,
    action: "bid_placed",
    entity_type: "player",
    metadata: {
      playerId: input.playerId,
      teamId: input.teamId,
      amount,
    },
  });

  return {
    ok: true,
    simulated: false,
    amount,
  };
}

export function reserveForTeam(team: Team) {
  return (
    Math.max(
      AUCTION_RULES.minPlayersPerTeam - team.playersBought,
      0
    ) * AUCTION_RULES.playerBasePrice
  );
}

function mapTeams(rows: any[]): Team[] {
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    logo: row.logo_url ?? row.name.slice(0, 2),
    primaryColor: row.primary_color,
    secondaryColor: row.secondary_color,
    purseLimit: row.purse_limit,
    purseRemaining: row.purse_limit,
    manager: "Assigned manager",
    playersBought: 0,
  }));
}

function mapPlayers(rows: any[]): Player[] {
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    photo: row.photo_url ?? "",
    role: row.role,
    battingStyle: row.batting_style ?? "",
    bowlingStyle: row.bowling_style ?? "",
    primarySkill: row.primary_skill,
    wantsCaptain: row.wants_captain,
    status: row.status,
    basePrice: row.base_price,
    soldPrice: row.sold_price,
    teamId: row.team_id,
    stats: row.stats ?? {},
  }));
}
