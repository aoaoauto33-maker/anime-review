import { prisma } from '@/lib/prisma'
import AnimeList from '@/components/AnimeList'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function AnimePage({ searchParams }: Props) {
  const { role, userId } = await searchParams

  const animes = await prisma.anime.findMany({
    orderBy: {
      id: 'asc',
      // とりあえずid順でいいや 後で人気順や五十音順を追加(React側でやるべき？)
    },
  })

  return (
    <main>
      <Link href={`/mypage?role=${role}&userId=${userId}`}>
        マイページ
      </Link>

      <AnimeList
        animes={animes}
        role={role}
        userId={userId}
      />
    </main>
  )
}