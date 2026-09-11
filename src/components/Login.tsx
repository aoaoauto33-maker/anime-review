'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { userIdAtom, roleAtom } from '@/store/user'
import { login } from '@/app/login/actions'

export default function Login() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const setUserId = useSetAtom(userIdAtom)
  const setRole = useSetAtom(roleAtom)

  const handleLogin = async () => {
    const result = await login(name)

    if (result.success) {
      setUserId(result.userId)
      setRole(result.role)

      router.push('/animes')
      // Jotaiを入れたことによってuserIdとroleをurlで渡す必要がなくなった
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