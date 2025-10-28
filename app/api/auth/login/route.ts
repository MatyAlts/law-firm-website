import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config"
import type { LoginResponse } from "@/lib/api/types"

export async function POST(request: Request) {
  const body = await request.json()
  const baseUrl = getApiBaseUrl()
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: response.status })
  }

  const data = (await response.json()) as LoginResponse
  const cookieStore = await cookies()
  
  cookieStore.set("admin_token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  })

  return NextResponse.json({ 
    email: data.email, 
    role: data.role,
    success: true 
  })
}
