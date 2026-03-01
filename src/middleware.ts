import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    const { pathname } = request.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        // Exception for login page to avoid infinite redirect
        if (pathname === "/admin/login") {
            if (session) {
                try {
                    await decrypt(session);
                    return NextResponse.redirect(new URL("/admin", request.url));
                } catch (e) {
                    // Invalid session, let them stay on login
                }
            }
            return NextResponse.next();
        }

        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            await decrypt(session);
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
