import { prisma } from '@/lib/prisma'
import EpisodeDetail from '@/components/EpisodeDetailPage'

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
    <EpisodeDetail
      id={id}
      episodeId={episodeId}
      role={role}
      userId={userId}
      episode={episode}
      reviews={reviews}
    />
  )
}