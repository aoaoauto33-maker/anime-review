'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { userIdAtom } from '@/store/user'
import { createRequest } from './actions'

export default function RequestApplyPage() {
  const router = useRouter()

  const userId = useAtomValue(userIdAtom)

  const [newAnimeName, setNewAnimeName] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!newAnimeName || !reason) {
      setMessage('アニメ名とリクエスト理由を入力してください')
      return
    }

    if (!userId) {
      setMessage('ユーザー情報が取得できません')
      return
    }

    const result = await createRequest(
      userId,
      newAnimeName,
      reason,
    )

    setMessage(result.message)

    if (result.success) {
      router.push('/mypage')
    }
  }

  return (
    <main className="max-w-4xl">
      <div className="card p-6">
        <h1>アニメ追加リクエスト</h1>

        <div className="flex flex-col gap-5">
          <div>
            <p className="font-bold">アニメ名</p>
            <input
              className="w-full rounded border border-slate-300 px-3 py-2"
              type="text"
              value={newAnimeName}
              onChange={(e) => setNewAnimeName(e.target.value)}
            />
          </div>

          <div>
            <p className="font-bold">リクエスト理由</p>
            <textarea
              className="w-full rounded border border-slate-300 p-3"
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit}>
            リクエストを送信する
          </button>

          <p>{message}</p>

          <Link
            className="link"
            href="/mypage"
          >
            マイページに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}