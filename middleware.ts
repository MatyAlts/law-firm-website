import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set("x-pathname", request.nextUrl.pathname)

  const isAdminPath = request.nextUrl.pathname.startsWith("/admin")
  const isLoginPath = request.nextUrl.pathname.startsWith("/admin/login")

  if (isAdminPath && !isLoginPath) {
    const token = request.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
