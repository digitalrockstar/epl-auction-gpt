import { NextResponse, type NextRequest } from "next/server";
const protectedPrefixes = ["/admin", "/manager", "/captain", "/player"];
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some((prefix) => path.startsWith(prefix));
  if (!isProtected) return NextResponse.next();
  const role = request.cookies.get("epl_role")?.value;
  const allowed: Record<string, string[]> = {
    "/admin": ["super_admin", "admin"],
    "/manager": ["super_admin", "admin", "manager"],
    "/captain": ["super_admin", "admin", "captain"],
    "/player": ["super_admin", "admin", "player", "captain", "manager"],
  };
  const match = Object.keys(allowed).find((prefix) => path.startsWith(prefix));
  if (!role || (match && !allowed[match].includes(role))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*", "/manager/:path*", "/captain/:path*", "/player/:path*"] };
