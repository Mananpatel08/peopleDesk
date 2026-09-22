import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const publicPaths = ["/login"];

const protectedRoutes: Record<string, string[]> = {
  "/": ["SUPER_ADMIN"],
  "/forms": ["SUPER_ADMIN"],
  "/users": ["SUPER_ADMIN"],
  "/profile": ["SUPER_ADMIN", "USER"],
  "/form": ["SUPER_ADMIN", "USER"],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  // If NO token
  if (!token) {
    if (protectedRoutes[pathname]) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Decode token
  let payload: any;
  try {
    payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
  } catch {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("access_token");
    return res;
  }

  // If token present
  const userRole = payload?.user_role;
  if (pathname === "/login") {
    if (userRole === "SUPER_ADMIN") return NextResponse.redirect(new URL("/", request.url));
    if (userRole === "USER") return NextResponse.redirect(new URL("/form", request.url));
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Check protected routes using the map
  if (protectedRoutes[pathname]) {
    const allowedRoles = protectedRoutes[pathname];

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

