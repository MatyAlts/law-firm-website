import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const response = await fetch(`${origin}/api/blogs/${params.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") ?? "",
    },
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: response.status })
  }

  return NextResponse.redirect(new URL("/admin", origin))
}
