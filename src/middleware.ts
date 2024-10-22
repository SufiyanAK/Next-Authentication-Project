import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const publicPath = [
        '/login',
        '/signup',
        '/verifyemail',
    ]

    const isPublic = publicPath.includes(path)
    // const isPublic = path === "/login" || path === "/signup" || path === "/verifyemail";

    const token = req.cookies.get("token")?.value || "";

    if (isPublic && token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail',
        '/profile',
        '/123'
    ]
}