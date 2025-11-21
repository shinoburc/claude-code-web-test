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
    const { amount, currency = 'jpy', description } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: '有効な金額を指定してください' },
        { status: 400 }
      )
    }

    // Stripe PaymentIntentを作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // 整数に変換
      currency,
      description,
      metadata: {
        userId: session.user.id,
      },
    })

    // データベースに支払いレコードを作成
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount,
        currency,
        status: 'pending',
        stripePaymentId: paymentIntent.id,
        description,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
    })
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json(
      { error: '支払いの作成に失敗しました' },
      { status: 500 }
    )
  }
}
