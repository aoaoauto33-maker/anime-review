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
        `/animes/${id}?role=${role}&userId=${userId}`
      )
    }
  }

  return (
    <main className="max-w-4xl">
      <h1>エピソードを追加</h1>

      <div className="card p-6">
        <div className="flex flex-col gap-5">
          <div>
            <label className="font-bold">話数</label>
            <input
              className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
              type="number"
              value={episodeNumber}
              onChange={(e) => setEpisodeNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="font-bold">タイトル</label>
            <input
              className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="font-bold">説明</label>
            <textarea
              className="mt-2 w-full rounded border border-slate-300 p-3"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="font-bold">公開日</label>
            <input
              className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit}>
            登録する
          </button>

          <p>{message}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          className="link"
          href={`/animes/${id}?role=${role}&userId=${userId}`}
        >
          アニメ詳細に戻る
        </Link>
      </div>
    </main>
  )
}