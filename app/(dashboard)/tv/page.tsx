import { PlayerCard } from "@/components/auction/player-card";
import { PurseTicker } from "@/components/auction/purse-ticker";
import { Shell } from "@/components/layout/shell";
import { auctionState, players, teams } from "@/lib/data/mock";
import { formatINR } from "@/lib/utils";
export default function TvPage() { const current = players.find((player) => player.id === auctionState.currentPlayerId)!; const leading = teams.find((team) => team.id === auctionState.currentBid?.teamId); return <Shell><div className="space-y-6"><div className="glass rounded-[2rem] p-6 text-center"><p className="text-sm uppercase tracking-[.35em] text-cyan-200/70">Big screen live view</p><h1 className="mt-3 text-6xl font-black">{formatINR(auctionState.currentBid?.amount ?? current.basePrice)}</h1><p className="mt-2 text-2xl text-slate-200">Leading: {leading?.name ?? "Opening bid"} • Timer {auctionState.timerSeconds}s</p></div><PlayerCard player={current} /><PurseTicker teams={teams} /></div></Shell>; }
