import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config"
import type { BlogPost } from "@/lib/api/types"

export async function GET() {
  try {
    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json({ error: "No se pudieron obtener los blogs" }, { status: 500 })
    }

    const blogs = await response.json()
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: "No se pudieron obtener los blogs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "Error al crear" }, { status: response.status })
    }

    const blog = await response.json()
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al crear" }, { status: 400 })
  }
}
