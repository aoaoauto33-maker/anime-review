import Link from 'next/link'
import { prisma } from '@/lib/prisma'

type Props = {
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function AdminAnimesPage({
  searchParams,
}: Props) {
  const { role, userId } = await searchParams

  if (role !== 'admin') {
    return <p>管理者のみ利用できます</p>
  }

  const animes = await prisma.anime.findMany({
    orderBy: {
      id: 'asc',
    },
  })

  return (
    <main>
      <h1>アニメ管理</h1>

      <Link
        href={`/mypage/admin/admin-animes/new?role=${role}&userId=${userId}`}
      >
        アニメを登録する
      </Link>

      <h2>アニメ一覧</h2>

      {animes.map((anime) => (
        <div key={anime.id}>
          <p>
            {anime.name}（{anime.release_year}年）
          </p>
        </div>
      ))}

      <br />

      <Link
        href={`/mypage?role=${role}&userId=${userId}`}
      >
        マイページに戻る
      </Link>
    </main>
  )
}