import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname.includes("%23")) {
    const parts = pathname.split("%23");
    const hash = parts[1];

    //redirect with proper hash
    // eg. /%23projects -> /#projects
    const redirectUrl = new URL("/", request.url);
    redirectUrl.hash = hash;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|documents).*)",
  ],
};
