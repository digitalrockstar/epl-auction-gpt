import { rosterCsv } from "@/lib/export";
import { getAuctionSnapshot } from "@/lib/auction-store";
export async function GET() { const snapshot = await getAuctionSnapshot(); return new Response(rosterCsv(snapshot.teams, snapshot.players), { headers: { "content-type": "text/csv", "content-disposition": "attachment; filename=epl-rosters.csv" } }); }
