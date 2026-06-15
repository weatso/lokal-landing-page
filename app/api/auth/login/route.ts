import { NextResponse } from 'next/server'
import { createSession, validateCredentials } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json() as { username?: string; password?: string }
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi.' },
        { status: 400 }
      )
    }

    // Simulate delay to prevent timing attacks
    await new Promise((r) => setTimeout(r, 600))

    const user = validateCredentials(username, password)

    if (!user) {
      return NextResponse.json(
        { error: 'Username atau password salah.' },
        { status: 401 }
      )
    }

    await createSession(user)

    return NextResponse.json({ success: true, user: { username: user.username, name: user.name, role: user.role } })
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}
