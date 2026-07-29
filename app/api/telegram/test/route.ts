import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
export async function POST() { return NextResponse.json(await sendTelegramMessage("EPL Auction bot connected.")); }
