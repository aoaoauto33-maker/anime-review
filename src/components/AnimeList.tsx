// アニメ一覧ページ
// JotaiのHookであるuseAtomValueを使っているため、Client Componentにする必要がある
'use client'


import Link from 'next/link'
// useAtomValue...Atomの値を読み取るときに使う
import { useAtomValue } from 'jotai'
import { roleAtom } from '@/store/user'

// アニメ一件分のデータの型
type Anime = {
  id: number
  name: string
  image_url: string
  description: string | null
  release_year: number
}

// Animeのデータを配列にまとめる型(animes/page.tsxから貰ってきたprops)
type Props = {
  animes: Anime[]
}

export default function AnimeList({ animes }: Props) {
  // user.tsから持ってきたroleAtomを読み取り専用で使う
  const role = useAtomValue(roleAtom)

  return (
    <div>
      {role === 'admin' && <p>※管理者としてログインしています</p>}
      {role === 'user' && <p>※ユーザーとしてログインしています</p>}

      <h1>アニメ一覧</h1>

      {role === 'admin' && (
        // margin-bottom-6 その要素の外側の下に余白を作る、h1が余白を作ってるからmtはいらない
        <div className="mb-6">
          <Link
          // inline-block...ボタンっぽくしてる rounded...角を丸くする bg-blue-600...背景を青にする
          // px-4...左右に内側の余白をつける py-2...上下に内側の余白をつける
          // !text-white...文字を白にする hover:bg-blue-700...マウスを少し乗せたとき、背景を少し濃い青にする
            className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
            href="/animes/admin/new-anime?from=animes"
          >
            新規アニメを登録する
          </Link>
        </div>
      )}

      {/* grid...Gridレイアウトを使う grid-cols-5...横方向に5列作る gap-2...8px間を開ける */}
      <div className="grid grid-cols-5 gap-2">
        {animes.map((anime) => (
          // p-1...paddingを4pxにする 
          <div key={anime.id} className="card p-1 ">
            {/* m-o...<p> の外側の余白を全部0にする trancate...文字が長すぎる場合に「...」をつける*/}
            <p className="m-0 truncate">
              <Link
                className="link"
                href={`/animes/${anime.id}`}
              >
                {anime.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}