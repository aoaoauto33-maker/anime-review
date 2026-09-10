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
    <main>
      <h1>マイページ</h1>

      {role === 'admin' && (
        <>
          <p>管理者としてログインしています</p>

          <Link
            href={`/mypage/request-approval?role=${role}&userId=${userId}`}
          >
            リクエスト管理
          </Link>

          <br />
          <br />
        </>
      )}

      {role === 'user' && (
        <>
          <h2>自分のレビュー</h2>

          {reviews.length === 0 ? (
            <p>まだレビューがありません</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id}>
                <h3>
                  {review.episode.anime.name}
                </h3>

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

                <Link
                  href={`/animes/${review.episode.anime.id}/episodes/${review.episode.id}?role=${role}&userId=${userId}`}
                >
                  エピソード詳細を見る
                </Link>

                <hr />
              </div>
            ))
          )}

          <h2>アニメ追加リクエスト</h2>

          <Link
            href={`/mypage/request-apply?role=${role}&userId=${userId}`}
          >
            アニメ追加リクエストを送る
          </Link>

          <br />
          <br />
        </>
      )}

      <Link
        href={`/animes?role=${role}&userId=${userId}`}
      >
        アニメ一覧に戻る
      </Link>
    </main>
  )
}