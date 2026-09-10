'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  getApprovedRequests,
  createAnime,
  markRequestAdded,
} from '@/app/animes/admin/actions'

type Request = {
  id: number
  new_anime_name: string
  reason: string
  status: string
}

type Anime = {
  name: string
  description: string | null
  release_year: number
}

export default function NewAnimePage() {
  const searchParams = useSearchParams()

  const role = searchParams.get('role')
  const userId = searchParams.get('userId')

  const [requests, setRequests] = useState<Request[]>([])
  const [requestId, setRequestId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [releaseYear, setReleaseYear] = useState('2026')
  const [registeredAnime, setRegisteredAnime] = useState<Anime | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadRequests = async () => {
      const result = await getApprovedRequests()
      setRequests(result)
    }

    loadRequests()
  }, [])

  const handleRequestChange = (id: string) => {
    setRequestId(id)

    const request = requests.find(
      (request) => request.id === Number(id)
    )

    if (request) {
      setName(request.new_anime_name)
    }
  }

  const handleSubmit = async () => {
    if (!name || !releaseYear) {
      setMessage('アニメ名と放送年を入力してください')
      return
    }

    const result = await createAnime(
      name,
      description,
      Number(releaseYear),
    )

    if (!result.success || !result.anime) {
      setMessage(result.message)
      return
    }

    if (requestId) {
      const requestResult = await markRequestAdded(
        Number(requestId),
      )

      if (!requestResult.success) {
        setMessage(requestResult.message)
        return
      }
    }

    setRegisteredAnime(result.anime)
    setMessage('以下の情報が追加されました')
  }

  if (registeredAnime) {
    return (
      <main>
        <h1>アニメ登録完了</h1>

        <p>{message}</p>

        <p>アニメ名：{registeredAnime.name}</p>
        <p>説明：{registeredAnime.description}</p>
        <p>放送年：{registeredAnime.release_year}年</p>

        <br />

        <Link
          href={`/mypage/request-approval?role=${role}&userId=${userId}`}
        >
          リクエスト管理に戻る
        </Link>

        <br />
        <br />

        <Link
          href={`/animes?role=${role}&userId=${userId}`}
        >
          アニメ一覧に戻る
        </Link>
      </main>
    )
  }

  return (
    <main>
      <h1>新規アニメ登録フォーム</h1>

      <h2>承認済みリクエスト</h2>

      {requests.length === 0 ? (
        <p>承認済みのリクエストはありません</p>
      ) : (
        <select
          value={requestId}
          onChange={(e) => handleRequestChange(e.target.value)}
        >
          <option value="">リクエストを選択してください</option>

          {requests.map((request) => (
            <option key={request.id} value={request.id}>
              {request.new_anime_name}
            </option>
          ))}
        </select>
      )}

      {requestId && (
        <div>
          <p>
            リクエスト理由：
            {
              requests.find(
                (request) => request.id === Number(requestId)
              )?.reason
            }
          </p>
        </div>
      )}

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
        href={`/mypage/request-approval?role=${role}&userId=${userId}`}
      >
        リクエスト管理に戻る
      </Link>

      <br />
      <br />

      <Link
        href={`/animes?role=${role}&userId=${userId}`}
      >
        アニメ一覧に戻る
      </Link>
    </main>
  )
}