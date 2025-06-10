import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  const isUser = !!authToken;
  // const isUser = true;
  // Define restricted routes for logged-in users
  const restrictedRoutes = ["/signup", "/signin"];

  const url = request.nextUrl.clone();

  // If the user is authenticated and trying to access restricted routes, redirect them
  if (isUser && restrictedRoutes.includes(url.pathname)) {
    const dashboardUrl = new URL("/", request.url); // or any other protected page
    return NextResponse.redirect(dashboardUrl);
  }

  // If the user is not authenticated and trying to access protected routes, redirect to login
  if (!isUser && !restrictedRoutes.includes(url.pathname)) {
    const loginUrl = new URL("/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signup",
    "/signin",
    "/my-posts",
    "/create",
    "/edit",
    "/post/:path*",
    "/profile",
    "/activate",
  ],
};
