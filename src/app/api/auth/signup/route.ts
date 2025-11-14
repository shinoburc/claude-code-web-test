import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードは必須です' },
        { status: 400 }
      )
    }

    // 既存のユーザーチェック
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 400 }
      )
    }

    // ユーザー作成（実際のプロダクションではbcryptでパスワードをハッシュ化）
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // 本番環境では必ずハッシュ化してください
      },
    })

    return NextResponse.json(
      { message: 'ユーザーが作成されました', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: '登録に失敗しました' },
      { status: 500 }
    )
  }
}
