'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

interface PaymentFormProps {
  amount: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setMessage('')

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: 'if_required',
      })

      if (error) {
        setMessage(error.message || '支払いに失敗しました')
        onError?.(error.message || '支払いに失敗しました')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('支払いが完了しました')

        // 支払い確認APIを呼び出し
        await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        })

        onSuccess?.()
      }
    } catch (err) {
      setMessage('エラーが発生しました')
      onError?.('エラーが発生しました')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">支払い金額</p>
        <p className="text-2xl font-bold text-gray-900">
          ¥{amount.toLocaleString()}
        </p>
      </div>

      <PaymentElement />

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes('完了')
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? '処理中...' : `¥${amount.toLocaleString()}を支払う`}
      </button>
    </form>
  )
}
