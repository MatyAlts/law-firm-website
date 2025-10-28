import "server-only"

import { getApiBaseUrl } from "./config"
import { getAdminTokenFromCookies } from "./auth"

export async function fetchApi<T>(path: string, init?: (RequestInit & { skipAuth?: boolean }) | undefined) {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${path}`
  const { skipAuth, ...requestInit } = init ?? {}
  const headers = new Headers(requestInit.headers)
  headers.set("Content-Type", "application/json")

  if (!skipAuth) {
    const token = getAdminTokenFromCookies()
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
  }

  const response = await fetch(url, {
    ...requestInit,
    headers,
    cache: requestInit.cache ?? "no-store",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return (await response.json()) as T
}
