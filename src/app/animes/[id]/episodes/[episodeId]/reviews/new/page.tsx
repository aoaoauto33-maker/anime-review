import ReviewForm from '@/components/ReviewForm'

type Props = {
  params: Promise<{
    // id = アニメID
    id: string
    episodeId: string
  }>
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function ReviewNewPage({
  params,
  searchParams,
}: Props) {
  const { id, episodeId } = await params
  const { role, userId } = await searchParams

  if (!userId) {
    return <p>ユーザー情報がありません</p>
  }

  return (
    <div>
      <ReviewForm
        id={Number(id)}
        userId={Number(userId)}
        role={role}
        episodeId={Number(episodeId)}
      />
    </div>
  )
}