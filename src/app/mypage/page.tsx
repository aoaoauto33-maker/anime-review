import Link from 'next/link'
import { prisma } from '@/lib/prisma'

type Props = {
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function MyPage({ searchParams }: Props) {
  const { role, userId } = await searchParams

  if (!userId) {
    return <p>ユーザー情報がありません</p>
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  })

  if (!user) {
    return <p>ユーザーが見つかりません</p>
  }

  return (
    <main>
      <h1>マイページ</h1>

      <h2>ユーザー情報</h2>

      <p>名前：{user.name}</p>
      <p>年齢：{user.age ?? '未設定'}</p>
      <p>性別：{user.gender ?? '未設定'}</p>

      <h2>メニュー</h2>

      <Link href={`/animes?role=${role}&userId=${userId}`}>
        レビューを見る
      </Link>

      <br />

      {role === 'user' && (
        <Link
          href={`/mypage/user/request-apply?role=${role}&userId=${userId}`}
        >
          アニメ追加リクエスト
        </Link>
      )}

      {role === 'admin' && (
        <>
          <Link
            href={`/mypage/admin/request-approval?role=${role}&userId=${userId}`}
          >
            リクエスト管理
          </Link>

          <br />

          <Link
            href={`/mypage/admin/admin-animes?role=${role}&userId=${userId}`}
          >
            アニメ管理
          </Link>
        </>
      )}

      <br />
      <br />

      <Link href={`/animes?role=${role}&userId=${userId}`}>
        アニメ一覧に戻る
      </Link>
    </main>
  )
}