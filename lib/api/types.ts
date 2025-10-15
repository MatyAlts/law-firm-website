export type BlogPost = {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  authorName: string
  createdAt: string
  updatedAt: string
}

export type AdminUser = {
  id: string
  email: string
  role: string
  createdAt: string
}

export type LoginResponse = {
  token: string
  email: string
  role: string
}
