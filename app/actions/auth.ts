"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/types";
const roles = new Set<Role>(["super_admin", "admin", "manager", "captain", "player"]);
export async function demoLogin(formData: FormData) { const role = String(formData.get("role") ?? "admin") as Role; const next = String(formData.get("next") ?? "/admin"); if (!roles.has(role)) throw new Error("Invalid role"); const store = await cookies(); store.set("epl_role", role, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" }); redirect(next); }
export async function logout() { const store = await cookies(); store.delete("epl_role"); redirect("/login"); }
