import { NextResponse } from "next/server"

import { fetchApi } from "@/lib/api/fetch"
import type { AdminUser } from "@/lib/api/types"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, role } = body

  if (!email || !password || !role) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
  }

  try {
    const admin = await fetchApi<AdminUser>("/admins", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    })

    return NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, role: admin.role },
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes("409")) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 })
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error desconocido" }, { status: 500 })
  }
}
