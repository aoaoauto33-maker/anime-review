import { prisma } from '@/lib/prisma'
import ReviewEditForm from '@/components/ReviewEditForm'

type Props = {
  params: Promise<{
    id: string
    episodeId: string
    reviewId: string
  }>
  searchParams: Promise<{
    userId?: string
  }>
}

export default async function ReviewEditPage({
  params,
  searchParams,
}: Props) {
  const { reviewId } = await params
  const { userId } = await searchParams

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
    <main>
      <h1>レビューを編集</h1>

      <ReviewEditForm
        reviewId={review.id}
        userId={review.userId}
        rating={review.rating}
        comment={review.comment ?? ''}
      />
    </main>
  )
}