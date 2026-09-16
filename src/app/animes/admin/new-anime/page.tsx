// アニメ追加画面(ルーティング＆クライアント)
// ルーティングとクライアントをまとめたのは、この画面にこれ以上機能が増えないと思ったから
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getApprovedRequests,
  createAnime,
  markRequestAdded,
} from '@/app/animes/admin/actions'
// URLから値を取り出す機能
import { useSearchParams } from 'next/navigation'

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
  const [requests, setRequests] = useState<Request[]>([])
  const [requestId, setRequestId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [releaseYear, setReleaseYear] = useState('2026')
  const [registeredAnime, setRegisteredAnime] = useState<Anime | null>(null)
  const [message, setMessage] = useState('')

  // URLの?より後ろにあるクエリパラメータを取得する
  const searchParams = useSearchParams()
  // fromという名前の値を取り出している(オブジェクトのキーみたいなもの)
  const from = searchParams.get('from')

  // 承認済みリクエストを取得する関数を呼び出してStateに保存する
  // 依存配列が[]なので最初の一回だけ実行
  useEffect(() => {
    const loadRequests = async () => {
      const result = await getApprovedRequests()
      setRequests(result)
    }
    loadRequests()
  }, [])



  // 管理者がリクエストを選択したときに、そのリクエストの情報を画面に反映する処理
  const handleRequestChange = (id: string) => {
    setRequestId(id)

    // find()...配列の中から条件に合う最初の1件を探す
    // DBから取得して保存しておいたrequestsから条件に合うものを探している
    const request = requests.find(
      (request) => request.id === Number(id)
    )
    if (request) {
      setName(request.new_anime_name)
    }
  }



  const handleSubmit = async () => {
    // バリデーション
    if (!name || !releaseYear) {
      setMessage('アニメ名と放送年を入力してください')
      return
    }
    // actions.tsからアニメ登録する関数を呼び出している
    const result = await createAnime(
      name,
      description,
      Number(releaseYear),
    )
    // 失敗してたら失敗メッセージをStateに保存
    if (!result.success || !result.anime) {
      setMessage(result.message)
      return
    }
    // actions.tsから関数を呼び出している
    // リクエストIDをもとにアニメを登録した場合、リクエストのstatusを追加済みに変更
    if (requestId) {
      const requestResult = await markRequestAdded(
        Number(requestId),
      )
      // 失敗してたら失敗メッセージを保存
      if (!requestResult.success) {
        setMessage(requestResult.message)
        return
      }
    }

    // 追加済みアニメとしてStateに保存
    // 登録済みであることを表示するために必要
    setRegisteredAnime(result.anime)
    setMessage('以下の情報が追加されました')
  }

  // 追加済みになったら以下を表示
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
              href="/mypage/request-approval"
            >
              リクエスト管理に戻る
            </Link>

            <Link
              className="link"
              href="/animes"
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

      <div className="mt-6">
       {from === 'request' && (
         <Link
           className="link"
           href="/mypage/request-approval"
         >
           リクエスト管理に戻る
         </Link>
       )}


       {from === 'animes' && (
          <Link
            className="link"
            href="/animes"
          >
            アニメ一覧に戻る
          </Link>
       )}
      </div>
    </main>
  )
}