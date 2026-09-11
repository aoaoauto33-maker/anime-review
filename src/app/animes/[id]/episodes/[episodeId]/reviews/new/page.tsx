import ReviewForm from '@/components/ReviewForm'

type Props = {
  params: Promise<{
    // id = アニメID
    id: string
    episodeId: string
  }>
}

export default async function ReviewNewPage({ params }: Props) {
  const { id, episodeId } = await params

  return (
    <div>
      <ReviewForm
        id={Number(id)}
        episodeId={Number(episodeId)}
      />
    </div>
  )
}