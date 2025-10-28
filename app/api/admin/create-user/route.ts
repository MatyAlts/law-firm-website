import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config"
import type { AdminUser } from "@/lib/api/types"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, role } = body

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/admins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, role }),
    })

    if (!response.ok) {
      if (response.status === 409) {
        return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 })
      }
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "Error al crear usuario" }, { status: response.status })
    }

    const admin = (await response.json()) as AdminUser

    return NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, role: admin.role },
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error desconocido" }, { status: 500 })
  }
}
