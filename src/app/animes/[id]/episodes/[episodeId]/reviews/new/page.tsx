import ReviewForm from '@/components/ReviewForm'

type Props = {
  params: Promise<{
    // id = アニメID
    id: string
    episodeId: string
  }>
  searchParams: Promise<{
    userId?: string
  }>
}

export default async function ReviewNewPage({
  params,
  searchParams,
}: Props) {
  const { episodeId } = await params
  const { userId } = await searchParams

  if (!userId) {
    return <p>ユーザー情報がありません</p>
  }

  return (
    <div>

      <ReviewForm
        userId={Number(userId)}
        episodeId={Number(episodeId)}
      />
    </div>
  )
}