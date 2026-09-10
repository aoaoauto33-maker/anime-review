'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAnime, updateAnime } from '@/app/animes/admin/actions'

export default function EditAnimePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = params.id as string
  const role = searchParams.get('role')
  const userId = searchParams.get('userId')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getAnimeData = async () => {
      const anime = await getAnime(Number(id))

      if (!anime) {
        setMessage('アニメが見つかりません')
        return
      }

      setName(anime.name)
      setDescription(anime.description ?? '')
      setReleaseYear(String(anime.release_year))
    }

    getAnimeData()
  }, [id])

  const handleSubmit = async () => {
    const result = await updateAnime(
      Number(id),
      name,
      description,
      Number(releaseYear),
    )

    setMessage(result.message)

    if (result.success) {
      router.push(
        `/animes/${id}?role=${role}&userId=${userId}`
      )
    }
  }

  return (
    <main>
      <h1>アニメ情報を編集</h1>

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
        更新する
      </button>

      <p>{message}</p>

      <br />

      <Link
        href={`/animes/${id}?role=${role}&userId=${userId}`}
      >
        アニメ詳細に戻る
      </Link>
    </main>
  )
}