"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminNav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex gap-6">
      <Link href="/admin" className={pathname === "/admin" ? "font-semibold" : ""}>
        Blog Posts
      </Link>
      <Link href="/admin/users" className={pathname === "/admin/users" ? "font-semibold" : ""}>
        Users
      </Link>
    </nav>
  )
}

export default AdminNav
