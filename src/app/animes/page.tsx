import { prisma } from '@/lib/prisma'
import AnimeList from '@/components/AnimeList'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ role?: string }>
}

export default async function AnimePage({ searchParams }: Props) {
  const { role } = await searchParams

  const animes = await prisma.anime.findMany({
    orderBy: {
      id: 'asc',
      // とりあえずid順でいいや 後で人気順や五十音順を追加(React側でやるべき？)
    },
  })

  return (
    <main>
      <h1>アニメ一覧</h1>

      {role === 'admin' && <p>管理者としてログインしています</p>}
      {role === 'user' && <p>ユーザーとしてログインしています</p>}

      <Link href={`/mypage?role=${role}`}>
        マイページ
      </Link>

      <AnimeList animes={animes} role={role} />
      {/* AnimeListにDBからもらってきたanimesとLoginからもらってきたroleを渡す */}
    </main>

  )
}