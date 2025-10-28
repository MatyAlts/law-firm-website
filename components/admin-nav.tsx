"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Scale, FileText, LogOut, Home, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminNavClient({ userEmail }: { userEmail: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2 font-serif text-lg md:text-xl font-bold text-primary">
            <Scale className="h-5 w-5 md:h-6 md:w-6" />
            <span className="hidden sm:inline">Admin Panel</span>
            <span className="sm:hidden">Admin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Blogs
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Ver Sitio
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground hidden lg:inline">{userEmail}</span>
            <form action="/admin/logout" method="post">
              <Button variant="ghost" size="sm" className="gap-2" type="submit">
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Cerrar Sesión</span>
              </Button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <div className="text-sm text-muted-foreground px-2 py-1">{userEmail}</div>
            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Blogs
              </Button>
            </Link>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Ver Sitio
              </Button>
            </Link>
            <form action="/admin/logout" method="post" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2" type="submit">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}

const AdminNav = () => {
  return null
}

export default AdminNav
