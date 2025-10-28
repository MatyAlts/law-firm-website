import { NextResponse } from "next/server"

import { fetchApi } from "@/lib/api/fetch"
import type { BlogPost } from "@/lib/api/types"

export async function GET() {
  try {
    const blogs = await fetchApi<BlogPost[]>("/blogs", { skipAuth: true })
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: "No se pudieron obtener los blogs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const blog = await fetchApi<BlogPost>("/blogs", {
      method: "POST",
      body: JSON.stringify(body),
    })
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al crear" }, { status: 400 })
  }
}
