import { prisma } from '@/lib/prisma'
import AnimeDetail from '@/components/AnimeDetail'

type Props = {
  params: Promise<{ id: string }>
}

export default async function AnimeDetailPage({ params }: Props) {
  const { id } = await params

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

  const reviews = await prisma.review.findMany({
    where: {
      episode: {
        animeId: Number(id),
      },
    },
  })

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

  const totalRating = Math.round((averageRating / 5) * 100)

  return (
    <AnimeDetail
      anime={anime}
      totalRating={totalRating}
    />
  )
}