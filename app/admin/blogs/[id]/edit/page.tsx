"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Section {
  id: string
  title: string
  content: string
}

export default function EditBlogPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const blogId = params.id

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [slug, setSlug] = useState("")
  const [authorName, setAuthorName] = useState("Equipo Legal")
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`)
        if (!response.ok) {
          throw new Error("No se pudo cargar el blog")
        }
        const blog = await response.json()
        setTitle(blog.title)
        setSummary(blog.summary)
        setSlug(blog.slug)
        setAuthorName(blog.authorName || "Equipo Legal")
        setSections(parseContent(blog.content))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }

    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value))
    }
  }

  const addSection = () => {
    setSections([...sections, { id: crypto.randomUUID(), title: "", content: "" }])
  }

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id))
  }

  const updateSection = (id: string, field: "title" | "content", value: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const buildContent = () => {
    if (sections.length === 0) return summary
    const built = sections
      .map((section) => {
        const title = section.title.trim()
        const content = section.content.trim()
        if (!title && !content) return ""
        return `${title ? `## ${title}\n\n` : ""}${content}`
      })
      .filter(Boolean)
      .join("\n\n")
    return built || summary
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          summary,
          slug,
          content: buildContent(),
          authorName,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Error al actualizar el blog" }))
        throw new Error(data.error || "Error al actualizar el blog")
      }

      router.push("/admin")
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al actualizar el blog")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <p>Cargando...</p>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary">Editar Blog</h1>
          <p className="text-muted-foreground">Modifique el contenido del artículo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Actualice el título, resumen y URL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Blog *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ej: Reformas al Código Civil 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="reformas-codigo-civil-2024"
                required
              />
              <p className="text-xs text-muted-foreground">URL: /blog/{slug || "slug-del-articulo"}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Resumen *</Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Secciones del Artículo</CardTitle>
                <CardDescription>Modifique el contenido por secciones</CardDescription>
              </div>
              <Button type="button" onClick={addSection} variant="outline" size="sm" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Agregar Sección
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {sections.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                <p>No hay secciones agregadas</p>
                <p className="text-sm">Agregue secciones para estructurar el contenido</p>
              </div>
            )}

            {sections.map((section, index) => (
              <div key={section.id} className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Sección {index + 1}</h3>
                  <Button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`section-title-${section.id}`}>Título de la Sección</Label>
                  <Input
                    id={`section-title-${section.id}`}
                    value={section.title}
                    onChange={(e) => updateSection(section.id, "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`section-content-${section.id}`}>Contenido</Label>
                  <Textarea
                    id={`section-content-${section.id}`}
                    value={section.content}
                    onChange={(e) => updateSection(section.id, "content", e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Cancelar
          </Button>
          <Button type="submit" className="gap-2" disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  )
}

function parseContent(content: string): Section[] {
  if (!content) return []

  const lines = content.split(/\r?\n/)
  const sections: Section[] = []
  let currentTitle = ""
  let currentContent: string[] = []

  const flush = () => {
    if (currentTitle || currentContent.length > 0) {
      sections.push({ id: crypto.randomUUID(), title: currentTitle.replace(/^##\s*/, ""), content: currentContent.join("\n").trim() })
    }
    currentTitle = ""
    currentContent = []
  }

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      flush()
      currentTitle = line
    } else {
      currentContent.push(line)
    }
  })

  flush()

  return sections
}
