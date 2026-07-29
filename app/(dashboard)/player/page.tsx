import { PlayerCard } from "@/components/auction/player-card";
import { Shell } from "@/components/layout/shell";
import { players, teams } from "@/lib/data/mock";
export default function PlayerPage() { const player = players[3]; const team = teams.find((item) => item.id === player.teamId); return <Shell><div className="space-y-6"><PlayerCard player={player} /><section className="glass rounded-[2rem] p-6"><h2 className="text-2xl font-black">Auction result</h2><p className="mt-2 text-slate-300">{team ? `Sold to ${team.name}` : "Awaiting auction result"}</p></section></div></Shell>; }
