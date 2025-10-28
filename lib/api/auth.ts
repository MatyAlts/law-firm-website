import { cookies } from "next/headers"

export async function getAdminTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get("admin_token")?.value
}
