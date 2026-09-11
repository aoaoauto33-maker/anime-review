import Link from 'next/link'
import { prisma } from '@/lib/prisma'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ role?: string, userId?: string }>
}

export default async function AnimeDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params
  const { role, userId } = await searchParams

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

  // [id]に該当するアニメのレビュー投稿を全て取得
  const reviews = await prisma.review.findMany({
    where: {
      episode: {
        animeId: Number(id),
      },
    },
  })

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0

  const totalRating = Math.round((averageRating / 5) * 100)

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
              href={`/animes/admin/edit-anime/${id}?role=${role}&userId=${userId}`}
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
              href={`/animes/${anime.id}/episodes/${episode.id}?role=${role}&userId=${userId}`}
            >
              {episode.episode_number}話：{episode.title}
            </Link>
          ))}
        </div>

        {role === 'admin' && (
          <div className="mt-4">
            <Link
              className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
             href={`/animes/admin/edit-anime/${id}/edit-episode/new-episode?role=${role}&userId=${userId}`}
            >
              エピソードを追加する
            </Link>
          </div>
        )}
      </div>

      <div className="mt-6">
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