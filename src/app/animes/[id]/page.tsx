import Link from 'next/link'
import { prisma } from '@/lib/prisma'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ role?: string }>
}

export default async function AnimeDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params
  const { role } = await searchParams

  // 貰ってきたidを使って該当するアニメを検索
  const anime = await prisma.anime.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      episodes: true,
      taggings: {
        include: {
          genre: true,
        },
      },
    },
  })

  if (!anime) {
    return <p>アニメが見つかりません</p>
  }

  return (
    <main>
      <h1>{anime.name}</h1>

      <p>{anime.description}</p>
      <p>{anime.release_year}年</p>

      {/* ジャンルは複数あるのでmapで1件ずつ表示 */}
      <h2>ジャンル</h2>
      {anime.taggings.map((tagging) => (
        <p key={tagging.genreId}>
          {tagging.genre.name}
        </p>
      ))}

      {/* エピソードも複数あるのでmapで1件ずつ表示 */}
      <h2>エピソード</h2>
      {anime.episodes.map((episode) => (
        <div key={episode.id}>
          <p>{episode.episode_number}話</p>
          <p>{episode.title}</p>
          <p>{episode.description}</p>
        </div>
      ))}

      <Link href={`/animes?role=${role}`}>
        アニメ一覧に戻る
      </Link>
    </main>
  )
}