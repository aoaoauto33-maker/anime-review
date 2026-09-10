'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/login/actions'

export default function Login() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  // useRouter...Nextのページ遷移機能

  const handleLogin = async () => {
    const result = await login(name)

    if (result.success) {
      router.push(`/animes?role=${result.role}&userId=${result.userId}`)
      // アニメ一覧に移動
    } else {
      setMessage('ユーザーが見つかりません')
    }
  }

  return (
    <main className="flex justify-center px-8 py-12">
      <div className="card w-full max-w-md p-6 text-center">
        <h1>ログイン</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={handleLogin}>
            ログイン
          </button>

          <p>{message}</p>
        </div>
      </div>
    </main>
  )
}