import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { paymentIntentId } = body

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'PaymentIntent IDが必要です' },
        { status: 400 }
      )
    }

    // Stripeから支払い状態を取得
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // データベースの支払いレコードを更新
    const payment = await prisma.payment.update({
      where: {
        stripePaymentId: paymentIntentId,
      },
      data: {
        status: paymentIntent.status,
      },
    })

    return NextResponse.json({
      success: true,
      status: payment.status,
      payment,
    })
  } catch (error) {
    console.error('Payment confirmation error:', error)
    return NextResponse.json(
      { error: '支払いの確認に失敗しました' },
      { status: 500 }
    )
  }
}
