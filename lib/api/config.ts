export function getApiBaseUrl() {
  // En el servidor (SSR), usar URL interna del backend
  if (typeof window === 'undefined') {
    return process.env.API_BASE_URL || "http://backend:8080"
  }
  // En el cliente (browser), usar URL pública
  return process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || "http://localhost:8080"
}
