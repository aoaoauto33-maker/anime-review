// アニメ編集画面(ルーティング＆クライアント)
// ルーティングとクライアントをまとめたのは、この画面にこれ以上機能が増えないと思ったから
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAnime, updateAnime } from '@/app/animes/admin/actions'

export default function EditAnimePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [message, setMessage] = useState('')

  const router = useRouter()
  // useParams...URLの動的な部分(動的ルートの値)を取得する
  // ClientComponentとして動かしていて、URLの[id]を取得したいからuseParams()を使っている
  const params = useParams()
  // useParams()から取得したparams.idは、TypeScriptから見ると型がはっきりしないからas stringを使う
  const id = params.id as string


  // actions.tsから呼び出してアニメ情報を取得してそれをStateに保存する
  // 依存配列が[id]なのでidが変わるたびに実行する
  // なぜuseEffectなのか？ => このファイルはルーティングとクライアントがまとまっている
  // ので、画面表示をした後にDB処理をするという設計にしたいから
  // ルーティングとクライアントを分けた場合はuseEffectは使わなくてもいい
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
      router.push(`/animes/${id}`)
    }
  }

  return (
    <main className="max-w-4xl">
      <h1>アニメ情報を編集</h1>

      <div className="card p-6">
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
            更新する
          </button>

          <p>{message}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          className="link"
          href={`/animes/${id}`}
        >
          アニメ詳細に戻る
        </Link>
      </div>
    </main>
  )
}