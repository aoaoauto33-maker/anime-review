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
      <main className="max-w-4xl">
        <h1>アニメ登録完了</h1>

        <div className="card p-6">
          <p>{message}</p>

          <div className="mt-4 flex flex-col gap-2">
            <p>アニメ名：{registeredAnime.name}</p>
            <p>説明：{registeredAnime.description}</p>
            <p>放送年：{registeredAnime.release_year}年</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              className="link"
              href={`/mypage/request-approval?role=${role}&userId=${userId}`}
            >
              リクエスト管理に戻る
            </Link>

            <Link
              className="link"
              href={`/animes?role=${role}&userId=${userId}`}
            >
              アニメ一覧に戻る
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl">
      <h1>新規アニメ登録フォーム</h1>

      <div className="card p-6">
        <h2 className="mt-0">承認済みリクエスト</h2>

        {requests.length === 0 ? (
          <p>承認済みのリクエストはありません</p>
        ) : (
          <div className="flex flex-col gap-3">
            <select
              className="rounded border border-slate-300 px-3 py-2"
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

            {requestId && (
              <p>
                リクエスト理由：
                {
                  requests.find(
                    (request) => request.id === Number(requestId)
                  )?.reason
                }
              </p>
            )}
          </div>
        )}

        <h2>アニメ登録</h2>

        <div className="flex flex-col gap-5">
          <div>
            <label className="font-bold">アニメ名</label>
            <input
              className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label className="font-bold">放送年</label>
            <input
              className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit}>
            登録する
          </button>

          <p>{message}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          className="link"
          href={`/mypage/request-approval?role=${role}&userId=${userId}`}
        >
          リクエスト管理に戻る
        </Link>

        <Link
          className="link"
          href={`/animes?role=${role}&userId=${userId}`}
        >
          アニメ一覧に戻る
        </Link>
      </div>
    </main>
  )
}