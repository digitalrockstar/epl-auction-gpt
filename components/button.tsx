import * as React from "react"; import { cn } from "@/lib/utils";
export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn("rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 shadow-glow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40", className)} {...props}/>; }
