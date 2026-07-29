export type Role = "super_admin" | "admin" | "manager" | "captain" | "player";
export type AuctionMode = "captains" | "players";
export type PlayerStatus = "pending" | "live" | "sold" | "unsold" | "skipped" | "reauction";
export type Team = { id: string; name: string; logo: string; primaryColor: string; secondaryColor: string; purseLimit: number; purseRemaining: number; manager: string; playersBought: number };
export type Player = { id: string; name: string; phone: string; photo: string; role: string; battingStyle: string; bowlingStyle: string; primarySkill: string; wantsCaptain: boolean; status: PlayerStatus; basePrice: number; soldPrice?: number; teamId?: string; stats: { runs?: number; wickets?: number; strikeRate?: number; economy?: number; catches?: number } };
export type Bid = { id: string; teamId: string; playerId: string; amount: number; createdAt: string; createdBy: string };
export type AuctionState = { mode: AuctionMode; paused: boolean; currentPlayerId: string; timerSeconds: number; currentBid?: Bid; queue: string[] };
