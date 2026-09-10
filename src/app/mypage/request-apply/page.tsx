'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createRequest } from './actions'

export default function RequestApplyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const role = searchParams.get('role')
  const userId = searchParams.get('userId')

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
      Number(userId),
      newAnimeName,
      reason,
    )

    setMessage(result.message)

    if (result.success) {
      router.push(`/mypage?role=${role}&userId=${userId}`)
    }
  }

  return (
    <main>
      <h1>アニメ追加リクエスト</h1>

      <div>
        <label>アニメ名</label>
        <br />
        <input
          type="text"
          value={newAnimeName}
          onChange={(e) => setNewAnimeName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>リクエスト理由</label>
        <br />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleSubmit}>
        リクエストを送信する
      </button>

      <p>{message}</p>

      <br />

      <Link href={`/mypage?role=${role}&userId=${userId}`}>
        マイページに戻る
      </Link>
    </main>
  )
}