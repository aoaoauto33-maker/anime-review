'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  getEpisode,
  updateEpisode,
} from '@/app/animes/admin/actions'

export default function EditEpisodePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = params.id as string
  const episodeId = params.episodeId as string

  const role = searchParams.get('role')
  const userId = searchParams.get('userId')

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
        `/animes/${id}/episodes/${episodeId}?role=${role}&userId=${userId}`
      )
    } else {
      setMessage(result.message)
    }
  }

  return (
    <main>
      <h1>エピソード情報を編集</h1>

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
        更新する
      </button>

      <p>{message}</p>

      <br />

      <Link
        href={`/animes/${id}/episodes/${episodeId}?role=${role}&userId=${userId}`}
      >
        エピソード詳細に戻る
      </Link>
    </main>
  )
}