import { prisma } from '@/lib/prisma'
import ReviewEditForm from '@/components/ReviewEditForm'

type Props = {
  params: Promise<{
    id: string
    episodeId: string
    reviewId: string
  }>
}

export default async function ReviewEditPage({ params }: Props) {
  const { id, episodeId, reviewId } = await params

  const review = await prisma.review.findUnique({
    where: {
      id: Number(reviewId),
    },
  })

  if (!review) {
    return <p>レビューが見つかりません</p>
  }

  return (
    <div>
      <ReviewEditForm
        id={Number(id)}
        episodeId={Number(episodeId)}
        reviewId={review.id}
        reviewUserId={review.userId}
        rating={review.rating}
        comment={review.comment ?? ''}
      />
    </div>
  )
}