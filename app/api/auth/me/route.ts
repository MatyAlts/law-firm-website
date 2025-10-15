import { NextResponse } from "next/server"

import { fetchApi } from "@/lib/api/fetch"
import type { LoginResponse } from "@/lib/api/types"

export async function GET() {
  try {
    const data = await fetchApi<LoginResponse>("/auth/me")
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
}
