import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "EPL Auction Platform", description: "Live EPL cricket auction operations platform" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className="dark"><body>{children}</body></html>; }
