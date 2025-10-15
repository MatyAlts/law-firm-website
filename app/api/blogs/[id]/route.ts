import { NextResponse } from "next/server"

import { fetchApi } from "@/lib/api/fetch"
import type { BlogPost } from "@/lib/api/types"

interface Params {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const blog = await fetchApi<BlogPost>(`/blogs/${params.id}`)
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json()
  try {
    const blog = await fetchApi<BlogPost>(`/blogs/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    })
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al actualizar" }, { status: 400 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await fetchApi(`/blogs/${params.id}`, { method: "DELETE" })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 400 })
  }
}
