import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const token = request.cookies.get("token")?.value;
    try {
      const verify = await jose.jwtVerify(token!, jwtConfig.secret);
      if (verify) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        request.cookies.delete("token");
      }
    } catch (error) {
      request.cookies.delete("token");
    }
  }
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value;
    try {
      const verify = await jose.jwtVerify(token!, jwtConfig.secret);
      if (!verify) {
        request.cookies.delete("token");
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }
    } catch (error) {
      request.cookies.delete("token");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
