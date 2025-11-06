import { getToken } from './auth'

const API_BASE = import.meta.env.VITE_API_URL || ''

export async function api<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(opts.headers || {})
  }
  if (token) {
    ;(headers as any)['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    throw new Error(data?.message || `Erro ${res.status}`)
  }
  return data
}

