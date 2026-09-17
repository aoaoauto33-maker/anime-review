// マイページ画面
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { userIdAtom, roleAtom } from '@/store/user'
import { getMyReviews, getMyRequests } from '@/app/mypage/actions'

// レビューの型
type Review = {
  id: number
  rating: number
  comment: string | null
  episode: {
    id: number
    episode_number: number
    title: string
    anime: {
      id: number
      name: string
    }
  }
}

// リクエストの型
type Request = {
  id: number
  new_anime_name: string
  reason: string
  status: string
}

export default function MyPageContent() {
  const userId = useAtomValue(userIdAtom)
  const role = useAtomValue(roleAtom)
  const [reviews, setReviews] = useState<Review[]>([])
  const [requests, setRequests] = useState<Request[]>([])

  // userId が取得できたら、そのユーザーのレビューとリクエストをDBから取得する
  // userIdを元にprisma操作をするのだが、そのuserIdがAtomからなのでReact側でやるしかない
  useEffect(() => {
    if (!userId) return

    const loadData = async () => {
      const reviewsData = await getMyReviews(userId)
      const requestsData = await getMyRequests(userId)

      setReviews(reviewsData)
      setRequests(requestsData)
    }

    loadData()
  }, [userId])

  return (
    <main className="max-w-4xl">
      <h1>マイページ</h1>

      {role === 'admin' && (
        <div className="card p-6">
          <p>管理者としてログインしています</p>

          <div className="mt-4">
            <Link
              className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
              href="/mypage/request-approval"
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

                    <p>評価：{review.rating} / 5</p>

                    <p>コメント：{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card mt-6 p-6">
            <h2>アニメ追加リクエスト</h2>

            {requests.length === 0 ? (
              <p>まだリクエストがありません</p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {requests.map((request) => (
                  <div key={request.id} className="card p-5">
                    <h3>{request.new_anime_name}</h3>

                    <p>理由：{request.reason}</p>

                    <p>ステータス：{request.status}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Link
                className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
                href="/mypage/request-apply"
              >
                アニメ追加リクエストを送る
              </Link>
            </div>
          </div>
        </>
      )}

      <div className="mt-6">
        <Link
          className="link"
          href="/animes"
        >
          アニメ一覧に戻る
        </Link>
      </div>
    </main>
  )
}