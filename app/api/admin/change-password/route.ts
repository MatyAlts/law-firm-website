import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/admins/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: errorText || "Error al cambiar la contraseña" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
