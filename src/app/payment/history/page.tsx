'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  description: string | null
  createdAt: string
}

export default function PaymentHistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchPaymentHistory()
    }
  }, [status, router])

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch('/api/payment/history')

      if (!response.ok) {
        throw new Error('支払い履歴の取得に失敗しました')
      }

      const data = await response.json()
      setPayments(data.payments)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'succeeded':
        return '成功'
      case 'pending':
        return '処理中'
      case 'failed':
        return '失敗'
      default:
        return status
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">支払い履歴</h1>
            <Link
              href="/payment"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              新しい支払い
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {payments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">支払い履歴がありません</p>
              <Link
                href="/payment"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                最初の支払いを作成
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {payment.description || '支払い'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.createdAt).toLocaleString('ja-JP')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ¥{payment.amount.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
