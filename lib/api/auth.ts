import { cookies } from "next/headers"

export function getAdminTokenFromCookies() {
  const cookieStore = cookies()
  return cookieStore.get("admin_token")?.value
}
