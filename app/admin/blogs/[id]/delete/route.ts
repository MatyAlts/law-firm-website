import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getApiBaseUrl } from "@/lib/api/config"

export async function POST(request: Request, { params }: { params: { id: string } }) {
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "Error al eliminar" }, { status: response.status })
    }

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    return NextResponse.redirect(new URL("/admin", origin))
  } catch (error) {
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
