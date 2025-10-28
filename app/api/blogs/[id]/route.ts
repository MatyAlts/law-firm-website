import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getApiBaseUrl } from "@/lib/api/config"
import type { BlogPost } from "@/lib/api/types"

interface Params {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs/${params.id}`)
    
    if (!response.ok) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 })
    }
    
    const blog = await response.json()
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json()
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "Error al actualizar" }, { status: response.status })
    }

    const blog = await response.json()
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al actualizar" }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "No se pudo eliminar" }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 400 })
  }
}
