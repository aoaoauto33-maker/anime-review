// エピソード詳細ページ
import { prisma } from '@/lib/prisma'
import EpisodeDetail from '@/components/EpisodeDetail'

// 受け取るのはanimeIdとepisodeIdだけ
type Props = {
  params: Promise<{
    id: string
    episodeId: string
  }>
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { id, episodeId } = await params

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
    <EpisodeDetail
      id={id}
      episodeId={episodeId}
      episode={episode}
      reviews={reviews}
    />
  )
}