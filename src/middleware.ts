import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  return clerkMiddleware()(req, null as any); 
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
