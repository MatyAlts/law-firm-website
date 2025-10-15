import { NextResponse } from "next/server"

import { fetchApi } from "@/lib/api/fetch"
import type { AdminUser } from "@/lib/api/types"

export async function GET() {
  try {
    const admins = await fetchApi<AdminUser[]>("/admins")
    return NextResponse.json(admins)
  } catch (error) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
}
