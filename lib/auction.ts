export const ROLES = ["super_admin", "admin", "manager", "captain", "player"] as const;
export type Role = (typeof ROLES)[number];
export type AuctionMode = "captains" | "players";
export const AUCTION_RULES = { teamPurse: 2500000, minPlayersPerTeam: 13, captainBasePrice: 200000, playerBasePrice: 50000, timerSeconds: 180 } as const;
export function nextIncrement(currentBid: number) { if (currentBid < 100000) return 10000; if (currentBid < 200000) return 20000; if (currentBid < 400000) return 40000; return 50000; }
export function bidFloor(currentBid: number | null, mode: AuctionMode) { const base = mode === "captains" ? AUCTION_RULES.captainBasePrice : AUCTION_RULES.playerBasePrice; return currentBid ? currentBid + nextIncrement(currentBid) : base; }
export function canBid(params: { purseRemaining: number; currentBid: number | null; mode: AuctionMode; playersOwned: number }) { const floor = bidFloor(params.currentBid, params.mode); const slotsAfter = Math.max(AUCTION_RULES.minPlayersPerTeam - (params.playersOwned + 1), 0); const reserve = slotsAfter * AUCTION_RULES.playerBasePrice; return params.purseRemaining - floor >= reserve; }
