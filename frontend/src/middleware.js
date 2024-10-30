import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedRoutes = ['/comments']
const publicRoutes = ['/login']
export async function middleware(req) {
    const path = req.nextUrl.pathname

    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. the session from the cookie
    const cookieStore = await cookies()
    const session = cookieStore.get('sessionId')?.value
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 6. Redirect to /comments if the user is authenticated
    if (
        isPublicRoute && session && !req.nextUrl.pathname.startsWith('/comments')
    ) {
        return NextResponse.redirect(new URL('/comments', req.url))
    }

    return NextResponse.next()
}