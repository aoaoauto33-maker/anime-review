'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/login/actions'

export default function Login() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const result = await login(name)

    if (result.success) {
      router.push(`/animes?role=${result.role}`)
    } else {
      setMessage('ユーザーが見つかりません')
    }
  }

  return (
    <main>
      <h1>ログイン</h1>

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
    </main>
  )
}