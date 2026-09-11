import { prisma } from '@/lib/prisma'
import AnimeList from '@/components/AnimeList'
import Link from 'next/link'

export default async function AnimePage() {
  const animes = await prisma.anime.findMany({
    orderBy: {
      id: 'asc',
      // とりあえずid順でいいや 後で人気順や五十音順を追加
    },
  })

  return (
    <main>
      <Link
        className="link"
        href="/mypage"
      >
        マイページ
      </Link>

      <AnimeList animes={animes} />
    </main>
  )
}