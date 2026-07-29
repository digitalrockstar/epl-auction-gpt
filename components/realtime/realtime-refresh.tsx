"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
export function RealtimeRefresh({ table = "bids" }: { table?: string }) { const router = useRouter(); useEffect(() => { const supabase = createClient(); if (!supabase) { const interval = window.setInterval(() => router.refresh(), 1000); return () => window.clearInterval(interval); } const channel = supabase.channel(`public:${table}`).on("postgres_changes", { event: "*", schema: "public", table }, () => router.refresh()).subscribe(); return () => { void supabase.removeChannel(channel); }; }, [router, table]); return null; }
