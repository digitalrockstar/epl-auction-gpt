import type { AuctionState, Bid, Player, Team } from "@/lib/types";
export const teams: Team[] = [
  { id: "th", name: "Thunder Hawks", logo: "TH", primaryColor: "#22d3ee", secondaryColor: "#2563eb", purseLimit: 2500000, purseRemaining: 1780000, manager: "Ravi Nair", playersBought: 6 },
  { id: "rs", name: "Royal Strikers", logo: "RS", primaryColor: "#e879f9", secondaryColor: "#e11d48", purseLimit: 2500000, purseRemaining: 1530000, manager: "Maya Shah", playersBought: 7 },
  { id: "et", name: "Emerald Titans", logo: "ET", primaryColor: "#34d399", secondaryColor: "#84cc16", purseLimit: 2500000, purseRemaining: 1910000, manager: "Kabir Khan", playersBought: 5 },
  { id: "gk", name: "Golden Kings", logo: "GK", primaryColor: "#fbbf24", secondaryColor: "#f97316", purseLimit: 2500000, purseRemaining: 1320000, manager: "Anika Rao", playersBought: 8 },
];
export const players: Player[] = [
  { id: "p1", name: "Arjun Menon", phone: "+91-90000-00001", photo: "", role: "All-rounder", battingStyle: "RHB", bowlingStyle: "Leg spin", primarySkill: "All-rounder", wantsCaptain: false, status: "live", basePrice: 50000, stats: { runs: 842, wickets: 37, strikeRate: 148, economy: 7.1, catches: 19 } },
  { id: "p2", name: "Dev Patel", phone: "+91-90000-00002", photo: "", role: "Opener", battingStyle: "LHB", bowlingStyle: "Off spin", primarySkill: "Batter", wantsCaptain: true, status: "pending", basePrice: 200000, stats: { runs: 1120, strikeRate: 156, catches: 12 } },
  { id: "p3", name: "Nikhil Varma", phone: "+91-90000-00003", photo: "", role: "Death bowler", battingStyle: "RHB", bowlingStyle: "Right-arm fast", primarySkill: "Bowler", wantsCaptain: false, status: "pending", basePrice: 50000, stats: { wickets: 48, economy: 6.8, catches: 8 } },
  { id: "p4", name: "Samar Iyer", phone: "+91-90000-00004", photo: "", role: "Wicket keeper", battingStyle: "RHB", bowlingStyle: "-", primarySkill: "Keeper", wantsCaptain: false, status: "sold", basePrice: 50000, soldPrice: 180000, teamId: "th", stats: { runs: 640, strikeRate: 139, catches: 31 } },
];
export const bids: Bid[] = [
  { id: "b1", teamId: "rs", playerId: "p1", amount: 180000, createdAt: "2026-07-29T12:01:00Z", createdBy: "admin" },
  { id: "b2", teamId: "th", playerId: "p1", amount: 220000, createdAt: "2026-07-29T12:02:00Z", createdBy: "admin" },
  { id: "b3", teamId: "et", playerId: "p1", amount: 240000, createdAt: "2026-07-29T12:03:00Z", createdBy: "admin" },
];
export const auctionState: AuctionState = { mode: "players", paused: false, currentPlayerId: "p1", timerSeconds: 143, currentBid: bids.at(-1), queue: ["p2", "p3"] };
