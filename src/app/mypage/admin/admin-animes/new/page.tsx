import AnimeForm from '@/components/AnimeForm'

type Props = {
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function NewAnimePage({
  searchParams,
}: Props) {
  const { role, userId } = await searchParams

  if (role !== 'admin') {
    return <p>管理者のみ利用できます</p>
  }

  return (
    <main>
      <h1>アニメ登録</h1>

      <AnimeForm
        role={role}
        userId={userId}
      />
    </main>
  )
}