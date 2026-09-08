import { prisma } from '@/lib/prisma'
import AnimeList from '@/components/AnimeList'

type Props = {
  searchParams: Promise<{
    role?: string
  }>
}

export default async function AnimePage({ searchParams }: Props) {
  const { role } = await searchParams

  const animes = await prisma.anime.findMany({
    orderBy: {
      id: 'asc',
    },
  })

  return (
    <main>
      <h1>アニメ一覧</h1>

      {role === 'admin' && <p>管理者としてログインしています</p>}
      {role === 'user' && <p>ユーザーとしてログインしています</p>}

      <AnimeList animes={animes} />
    </main>
  )
}