import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? 'fallback-secret-change-me'
)

const COOKIE_NAME = 'lokal_admin_token'
const SESSION_DURATION = 60 * 60 * 24 // 24 jam dalam detik

export interface AdminPayload {
  username: string
  role: 'superadmin' | 'admin'
  name: string
  iat?: number
  exp?: number
}

// Sign JWT dan simpan ke HTTP-only cookie
export async function createSession(payload: Omit<AdminPayload, 'iat' | 'exp'>) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(SECRET_KEY)

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })
}

// Verifikasi JWT dari cookie
export async function verifySession(): Promise<AdminPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}

// Hapus session cookie
export function destroySession() {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

// Validasi kredensial dari .env.local
export function validateCredentials(username: string, password: string): AdminPayload | null {
  const validUsername = process.env.ADMIN_USERNAME ?? 'lokaladmin'
  const validPassword = process.env.ADMIN_PASSWORD ?? 'Lokal@2024!'

  if (
    username.toLowerCase().trim() === validUsername.toLowerCase() &&
    password === validPassword
  ) {
    return {
      username: validUsername,
      role: 'superadmin',
      name: 'Super Admin',
    }
  }
  return null
}
