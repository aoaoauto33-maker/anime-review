'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  getEpisode,
  updateEpisode,
} from '@/app/animes/admin/actions'

export default function EditEpisodePage() {
  const params = useParams()
  const router = useRouter()

  const id = params.id as string
  const episodeId = params.episodeId as string

  const [episodeNumber, setEpisodeNumber] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getEpisodeData = async () => {
      const episode = await getEpisode(Number(episodeId))

      if (!episode) {
        setMessage('エピソードが見つかりません')
        return
      }

      setEpisodeNumber(String(episode.episode_number))
      setTitle(episode.title)
      setDescription(episode.description)

      setReleaseDate(
        episode.release_date.toISOString().split('T')[0]
      )
    }

    getEpisodeData()
  }, [episodeId])

  const handleSubmit = async () => {
    const result = await updateEpisode(
      Number(episodeId),
      Number(episodeNumber),
      title,
      description,
      releaseDate,
    )

    if (result.success) {
      setMessage(result.message)

      router.push(
        `/animes/${id}/episodes/${episodeId}`
      )
    } else {
      setMessage(result.message)
    }
  }

  return (
    <main className="max-w-4xl">
      <h1>エピソード情報を編集</h1>

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
            更新する
          </button>

          <p>{message}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          className="link"
          href={`/animes/${id}/episodes/${episodeId}`}
        >
          エピソード詳細に戻る
        </Link>
      </div>
    </main>
  )
}