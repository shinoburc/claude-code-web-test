'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">
              クレジットカード支払いアプリ
            </h1>
            <div className="flex items-center space-x-4">
              {status === 'authenticated' ? (
                <>
                  <span className="text-sm text-gray-700">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-gray-700 hover:text-gray-900"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ログイン
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            安全で簡単なオンライン決済
          </h2>
          <p className="text-xl text-gray-600">
            Stripeを使用した安全なクレジットカード決済システム
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              セキュア
            </h3>
            <p className="text-gray-600">
              業界最高水準のセキュリティで、お客様の情報を保護します
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              高速
            </h3>
            <p className="text-gray-600">
              スムーズで高速な決済処理を実現します
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              簡単
            </h3>
            <p className="text-gray-600">
              直感的なインターフェースで誰でも簡単に利用できます
            </p>
          </div>
        </div>

        <div className="text-center">
          {status === 'authenticated' ? (
            <div className="space-x-4">
              <Link
                href="/payment"
                className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                支払いを開始
              </Link>
              <Link
                href="/payment/history"
                className="inline-block bg-gray-200 text-gray-800 py-3 px-8 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                支払い履歴
              </Link>
              <Link
                href="/admin/users"
                className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                ユーザー管理
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                href="/auth/signin"
                className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/auth/signup"
                className="inline-block bg-gray-200 text-gray-800 py-3 px-8 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                新規登録
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
