// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const role = req.cookies.get("role")?.value;

//   // -------------------------
//   // STUDENT PROTECTION
//   // -------------------------
//   if (pathname.startsWith("/dashboard")) {
//     if (role !== "STUDENT") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   // -------------------------
//   // ADMIN PROTECTION
//   // -------------------------
//   if (pathname.startsWith("/admin") && pathname !== "/admin-login") {
//     if (role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/admin-login", req.url));
//     }
//   }

//   // -------------------------
//   // PREVENT LOGGED-IN USERS FROM SEEING LOGIN
//   // -------------------------
//   if (pathname === "/login" && role === "STUDENT") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   if (pathname === "/admin-login" && role === "ADMIN") {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/admin-login"],
// };

// export default proxy;

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyToken } from "@/lib/auth";

// export async function proxy(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const token = req.cookies.get("auth")?.value;

//   if (!token) {
//     if (path.startsWith("/dashboard"))
//       return NextResponse.redirect(new URL("/login", req.url));

//     if (path.startsWith("/admin") && path !== "/admin-login")
//       return NextResponse.redirect(new URL("/admin-login", req.url));

//     return NextResponse.next();
//   }

//   const user = await verifyToken(token);

//   if (!user) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // STUDENT ROUTES
//   if (path.startsWith("/dashboard") && user.role !== "STUDENT") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // ADMIN ROUTES
//   if (path.startsWith("/admin") && path !== "/admin-login") {
//     if (user.role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/admin-login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };

// export default proxy;

// proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Changed from 'next/request'
import { verifyJWT } from "./lib/auth";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const payload = token ? await verifyJWT(token) : null;
  const role = payload?.role;

  // 1. BOUNCE BACK: If logged in, don't allow access to login pages
  if (payload) {
    if (path === "/login" || path === "/admin-login") {
      const dest = role === "ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(dest, req.url));
    }
  }

  // 2. STUDENT PROTECTION
  if (path.startsWith("/dashboard") && role !== "STUDENT") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. ADMIN PROTECTION
  if (path.startsWith("/admin") && path !== "/admin-login") {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Ensure the matcher includes the login routes so the "Bounce Back" logic runs
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/admin-login",
    "/api/payment/:path*",
  ],
};

export default proxy;
