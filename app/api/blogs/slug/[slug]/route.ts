import { NextResponse } from "next/server"

import { fetchApi } from "@/lib/api/fetch"
import type { BlogPost } from "@/lib/api/types"

interface Params {
  params: { slug: string }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const blog = await fetchApi<BlogPost>(`/blogs/slug/${params.slug}`, { skipAuth: true })
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  }
}
