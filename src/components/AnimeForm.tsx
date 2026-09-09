'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createAnime } from '@/app/mypage/admin/admin-animes/actions'

type Props = {
  role?: string
  userId?: string
}

export default function AnimeForm({ role, userId }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [message, setMessage] = useState('')

  const router = useRouter()

  const handleSubmit = async () => {
    const result = await createAnime(
      name,
      description,
      Number(releaseYear),
    )

    if (result.success) {
      router.push(
        `/mypage/admin/admin-animes?role=${role}&userId=${userId}`,
      )
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div>
      <h2>アニメ登録</h2>

      <div>
        <label>アニメ名</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>説明</label>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>放送年</label>
        <br />
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleSubmit}>
        登録する
      </button>

      <p>{message}</p>

      <br />

      <Link
        href={`/mypage/admin/admin-animes?role=${role}&userId=${userId}`}
      >
        キャンセル
      </Link>
    </div>
  )
}