import { NextResponse } from 'next/server'
import { redis, PRICING_KEY } from '@/lib/redis'
import { verifySession } from '@/lib/auth'
import { DEFAULT_PRICING } from '@/lib/defaultPricing'

// ─── GET /api/pricing (public) ───────────────────────────────────────────────
export async function GET() {
  try {
    const data = await redis.get(PRICING_KEY)
    if (data) {
      // Merge with defaults to handle new keys
      const merged: any = {}
      Object.keys(DEFAULT_PRICING).forEach(k => {
        const def = DEFAULT_PRICING[k as keyof typeof DEFAULT_PRICING]
        const saved = (data as any)[k] || {}
        merged[k] = { ...def, ...saved }
      })
      return NextResponse.json({ data: merged, source: 'kv', updatedAt: (data as any).__updatedAt || null })
    }
    return NextResponse.json({ data: DEFAULT_PRICING, source: 'default', updatedAt: null })
  } catch (err) {
    console.error('[API/pricing GET]', err)
    return NextResponse.json({ data: DEFAULT_PRICING, source: 'default', updatedAt: null })
  }
}

// ─── POST /api/pricing (admin only) ─────────────────────────────────────────
export async function POST(req: Request) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const payload = { ...body, __updatedAt: new Date().toISOString(), __updatedBy: session.username }
    await redis.set(PRICING_KEY, payload)
    return NextResponse.json({ success: true, updatedAt: payload.__updatedAt })
  } catch (err) {
    console.error('[API/pricing POST]', err)
    return NextResponse.json({ error: 'Gagal menyimpan data.' }, { status: 500 })
  }
}
