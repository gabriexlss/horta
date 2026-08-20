import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { SESSION_COOKIE_NAME, verifyAdminToken } from "@/lib/session"

export async function proxy(request: NextRequest) {
    const session = await verifyAdminToken(request.cookies.get(SESSION_COOKIE_NAME)?.value)

    if (!session) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}
