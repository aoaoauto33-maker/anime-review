import Link from 'next/link'
import { prisma } from '@/lib/prisma'

type Props = {
  params: Promise<{
    id: string
    episodeId: string
  }>
  searchParams: Promise<{
    role?: string
    userId?: string,
  }>
}

export default async function EpisodeDetailPage({
  params,
  searchParams,
}: Props) {
  const { id, episodeId } = await params
  const { role, userId } = await searchParams

  // エピソードIDを使って該当するエピソードを検索
  const episode = await prisma.episode.findUnique({
    where: {
      id: Number(episodeId),
    },
    include: {
      anime: true,
    },
  })

  if (!episode) {
    return <p>エピソードが見つかりません</p>
  }

  // このエピソードのレビューを全て取得
  const reviews = await prisma.review.findMany({
    where: {
      episodeId: Number(episodeId),
    },
    include: {
      user: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return (
    <main>
      <h1>{episode.anime.name}</h1>

      <h2>
        {episode.episode_number}話：{episode.title}
      </h2>

      <p>{episode.description}</p>
      <p>公開日：{episode.release_date.toLocaleDateString('ja-JP')}</p>

      <h2>レビュー</h2>
      {reviews.length === 0 ? (
        <p>まだレビューがありません</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id}>
            <p>{review.user.name}</p>
            <p>
              評価：{'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </p>
            <p>{review.comment}</p>
          </div>
        ))
      )}

      {/*  */}
      <Link
        href={`/animes/${id}/episodes/${episodeId}/reviews/new?userId=${userId}`}
      >
        レビューを書く
      </Link>

      <br />

      <Link href={`/animes/${id}?role=${role}`}>
        アニメ詳細に戻る
      </Link>
    </main>
  )
}