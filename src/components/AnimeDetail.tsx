'use client'

import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { roleAtom } from '@/store/user'

type Anime = {
  id: number
  name: string
  image_url: string
  description: string | null
  release_year: number
  taggings: {
    genreId: number
    animeId: number
    genre: {
      id: number
      name: string
    }
  }[]
  episodes: {
    id: number
    episode_number: number
    title: string
    description: string
    release_date: Date
  }[]
}

type Props = {
  anime: Anime
  totalRating: number
}

export default function AnimeDetail({ anime, totalRating }: Props) {
  const role = useAtomValue(roleAtom)

  return (
    <main>
      <h1>{anime.name}</h1>

      <div className="card p-4">
        <h2>総合評価</h2>
        <p>{totalRating}点 / 100点</p>

        <p>{anime.description}</p>
        <p>{anime.release_year}年</p>

        <h2>ジャンル</h2>
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