import Link from 'next/link'
import { prisma } from '@/lib/prisma'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ role?: string, userId?: string}>
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

  // なんか計算してる だるいからあとで調べて
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0

  const totalRating = Math.round((averageRating / 5) * 100)


  return (
    <main>
      <h1>{anime.name}</h1>

      <h2>総合評価</h2>
      <p>{totalRating}点 / 100点</p>

      <p>{anime.description}</p>
      <p>{anime.release_year}年</p>

      {/* ジャンルは複数あるのでmapで1件ずつ表示 */}
      <h2>ジャンル</h2>
      {anime.taggings.map((tagging) => (
        <p key={tagging.genreId}>
          {tagging.genre.name}
        </p>
      ))}

       {role === 'admin' && (
        <>
          <br />
          <Link
            href={`/animes/admin/edit-anime/${id}?role=${role}&userId=${userId}`}
          >
            アニメ情報を編集する
          </Link>
        </>
      )}

      <div>
      {/* エピソードも複数あるのでmapで1件ずつ表示 */}
      <h2>エピソード</h2>
      {anime.episodes.map((episode) => (
        <div key={episode.id}>
          <Link
            href={`/animes/${anime.id}/episodes/${episode.id}?role=${role}&userId=${userId}`}
          >
            {episode.episode_number}話：{episode.title}
          </Link>
        </div>
      ))}

      <Link
        href={`/animes/admin/edit-anime/${id}/edit-episode/new-episode?role=${role}&userId=${userId}`}
      >
        エピソードを追加する
      </Link>
      </div>


      <Link href={`/animes?role=${role}&userId=${userId}`}>
        アニメ一覧に戻る
      </Link>
    </main>
  )
}