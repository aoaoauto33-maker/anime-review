import Link from 'next/link'
import { getMyReviews } from './actions'

type Props = {
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function MyPage({
  searchParams,
}: Props) {
  const { role, userId } = await searchParams

  const reviews =
    userId
      ? await getMyReviews(Number(userId))
      : []

  return (
    <main className="max-w-4xl">
      <h1>マイページ</h1>

      {role === 'admin' && (
        <div className="card p-6">
          <p>管理者としてログインしています</p>

          <div className="mt-4">
            <Link
              className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
              href={`/mypage/request-approval?role=${role}&userId=${userId}`}
            >
              リクエスト管理
            </Link>
          </div>
        </div>
      )}

      {role === 'user' && (
        <>
          <div className="card p-6">
            <h2>自分のレビュー</h2>

            {reviews.length === 0 ? (
              <p>まだレビューがありません</p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="card p-5">
                    <h3>{review.episode.anime.name}</h3>

                    <p>
                      {review.episode.episode_number}話：
                      {review.episode.title}
                    </p>

                    <p>
                      評価：{review.rating} / 5
                    </p>

                    <p>
                      コメント：{review.comment}
                    </p>

                    <div className="mt-3">
                      <Link
                        className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
                        href={`/animes/${review.episode.anime.id}/episodes/${review.episode.id}?role=${role}&userId=${userId}`}
                      >
                        エピソード詳細を見る
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card mt-6 p-6">
            <h2>アニメ追加リクエスト</h2>

            <Link
              className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
              href={`/mypage/request-apply?role=${role}&userId=${userId}`}
            >
              アニメ追加リクエストを送る
            </Link>
          </div>
        </>
      )}

      <div className="mt-6">
        <Link
          className="link"
          href={`/animes?role=${role}&userId=${userId}`}
        >
          アニメ一覧に戻る
        </Link>
      </div>
    </main>
  )
}