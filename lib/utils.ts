import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatINR(amount: number) { if (amount >= 100000) return `${(amount / 100000).toFixed(amount % 100000 ? 1 : 0)}L`; return `${Math.round(amount / 1000)}K`; }
