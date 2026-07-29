import { NextResponse } from "next/server";
import { placeBid } from "@/lib/auction-store";
import { sendTelegramMessage } from "@/lib/telegram";
export async function POST(request: Request) { try { const body = await request.json(); const result = await placeBid({ teamId: body.teamId, playerId: body.playerId, amount: body.amount, mode: body.mode ?? "players", actorId: body.actorId }); await sendTelegramMessage(`Bid placed: ${body.teamId} for ${body.playerId} at ${result.amount}`); return NextResponse.json(result); } catch (error) { return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 }); } }
