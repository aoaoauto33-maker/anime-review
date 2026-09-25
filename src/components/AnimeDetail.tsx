// アニメ詳細ページ
'use client'

import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { roleAtom } from '@/store/user'
import Image from 'next/image'

type Anime = {
  id: number
  name: string
  image_url: string
  description: string | null
  release_year: number
  // そのアニメのジャンルが複数の可能性もあるので配列
  taggings: {
    genreId: number
    animeId: number
    genre: {
      id: number
      name: string
    }
  }[]
  // 一つのアニメに対してエピソードは複数あるので配列
  episodes: {
    id: number
    episode_number: number
    title: string
    description: string
    release_date: Date
  }[]
}

// animes/[id]/page.tsxから渡されたpropsを受け取るための型
type Props = {
  anime: Anime
  totalRating: number
}

export default function AnimeDetail({ anime, totalRating }: Props) {
  const role = useAtomValue(roleAtom)

  return (
    <main>
      <h1>{anime.name}</h1>

    <Image
      src={anime.image_url}
      alt={anime.name}
      width={300}
      height={400}
      className="mb-8 object-cover"
    />


      {/* p-4...カードの内側の余白を16pxにする */}
      <div className="card p-4">
        <h2>総合評価</h2>
        <p>{totalRating}点 / 100点</p>

        <p>{anime.description}</p>
        <p>{anime.release_year}年</p>

        <h2>ジャンル</h2>
        {/* flex...横一列に並べる flex-wrap...横に入りきらなければ折り返す*/}
        <div className="flex flex-wrap gap-2">
          {anime.taggings.map((tagging) => (
            <p key={tagging.genreId} className="rounded border px-2 py-1">
              {tagging.genre.name}
            </p>
          ))}
        </div>

        {role === 'admin' && (
          <div className="mt-4">
            <Link
              className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
              href={`/animes/admin/edit-anime/${anime.id}`}
            >
              アニメ情報を編集する
            </Link>
          </div>
        )}
      </div>

      <div className="card mt-6 p-4">
        <h2>エピソード</h2>

          {/* flex-col...縦に並べる */}
        <div className="flex flex-col gap-2">
          {anime.episodes.map((episode) => (
            <Link
              key={episode.id}
              className="link"
              href={`/animes/${anime.id}/episodes/${episode.id}`}
            >
              {episode.episode_number}話：{episode.title}
            </Link>
          ))}
        </div>

        {role === 'admin' && (
          <div className="mt-4">
            <Link
              className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
              href={`/animes/admin/edit-anime/${anime.id}/edit-episode/new-episode`}
            >
              エピソードを追加する
            </Link>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          className="link"
          href="/animes"
        >
          アニメ一覧に戻る
        </Link>
      </div>
    </main>
  )
}