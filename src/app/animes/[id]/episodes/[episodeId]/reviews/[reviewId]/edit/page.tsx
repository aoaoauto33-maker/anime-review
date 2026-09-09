import { prisma } from '@/lib/prisma'
import ReviewEditForm from '@/components/ReviewEditForm'

type Props = {
  params: Promise<{
    id: string
    episodeId: string
    reviewId: string
  }>
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function ReviewEditPage({
  params,
  searchParams,
}: Props) {
  const { id, episodeId, reviewId } = await params
  const { role, userId } = await searchParams

  if (!userId) {
    return <p>ユーザー情報がありません</p>
  }

  const review = await prisma.review.findUnique({
    where: {
      id: Number(reviewId),
    },
  })

  if (!review) {
    return <p>レビューが見つかりません</p>
  }

  if (review.userId !== Number(userId)) {
    return <p>このレビューを編集する権限がありません</p>
  }

  return (
    <div>

      <ReviewEditForm
        id={Number(id)}
        episodeId={Number(episodeId)}
        role={role}
        reviewId={review.id}
        userId={review.userId}
        rating={review.rating}
        comment={review.comment ?? ''}
      />
    </div>
  )
}