'use client'

import { useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createEpisode } from '@/app/animes/admin/actions'

export default function NewEpisodePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = params.id as string

  const role = searchParams.get('role')
  const userId = searchParams.get('userId')

  const [episodeNumber, setEpisodeNumber] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!episodeNumber || !title || !releaseDate) {
      setMessage('話数、タイトル、公開日を入力してください')
      return
    }

    const result = await createEpisode(
      Number(id),
      Number(episodeNumber),
      title,
      description,
      releaseDate,
    )

    setMessage(result.message)

    if (result.success) {
      router.push(
        `/animes/admin/edit-anime/${id}?role=${role}&userId=${userId}`
      )
    }
  }

  return (
    <main>
      <h1>エピソードを追加</h1>

      <div>
        <label>話数</label>
        <br />
        <input
          type="number"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>タイトル</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <label>公開日</label>
        <br />
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleSubmit}>
        登録する
      </button>

      <p>{message}</p>

      <br />

      <Link
        href={`/animes/admin/edit-anime/${id}?role=${role}&userId=${userId}`}
      >
        アニメ編集画面に戻る
      </Link>
    </main>
  )
}