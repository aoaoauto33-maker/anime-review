'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteReview } from '@/app/animes/[id]/episodes/[episodeId]/reviews/actions'

type Props = {
  id: string
  episodeId: string
  role?: string
  userId?: string
  episode: {
    id: number
    episode_number: number
    title: string
    description: string
    release_date: Date
    anime: {
      name: string
    }
  }
  reviews: {
    id: number
    userId: number
    rating: number
    comment: string | null
    user: {
      name: string
    }
  }[]
}

export default function EpisodeDetail({
  id,
  episodeId,
  role,
  userId,
  episode,
  reviews,
}: Props) {
  const router = useRouter()

  const handleDelete = async (reviewId: number) => {
    const result = await deleteReview(
      reviewId,
      Number(userId),
      role,
    )

    if (result.success) {
      router.refresh()
    } else {
      alert(result.message)
    }
  }

return (
  <main className="max-w-4xl">
    <h1>{episode.anime.name}</h1>

    <div className="card p-6">
      <h2>
        {episode.episode_number}話：{episode.title}
      </h2>

      <p>{episode.description}</p>

      <p>
        公開日：{episode.release_date.toLocaleDateString('ja-JP')}
      </p>

      {role === 'admin' && (
        <div className="mt-4">
          <Link
            className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
            href={`/animes/admin/edit-anime/${id}/edit-episode/${episodeId}/edit?role=${role}&userId=${userId}`}
          >
            エピソードを編集する
          </Link>
        </div>
      )}
    </div>

    <div className="mt-6">
      <h2>レビュー</h2>

      {reviews.length === 0 ? (
        <p>まだレビューがありません</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="card p-5">
              <p className="font-bold">{review.user.name}</p>

              <p>
                評価：{'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </p>

              <p>{review.comment}</p>

              {review.userId === Number(userId) && (
                <div className="mt-3 flex gap-3">
                  <Link
                    className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
                    href={`/animes/${id}/episodes/${episodeId}/reviews/${review.id}/edit?role=${role}&userId=${userId}`}
                  >
                    編集
                  </Link>

                  <button
                    onClick={() => handleDelete(review.id)}
                  >
                    削除
                  </button>
                </div>
              )}

              {role === 'admin' &&
                review.userId !== Number(userId) && (
                  <div className="mt-3">
                    <button
                      onClick={() => handleDelete(review.id)}
                    >
                      削除
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link
          className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
          href={`/animes/${id}/episodes/${episodeId}/reviews/new?role=${role}&userId=${userId}`}
        >
          レビューを書く
        </Link>
      </div>

      <div className="mt-4">
        <Link
          className="link"
          href={`/animes/${id}?role=${role}&userId=${userId}`}
        >
          アニメ詳細に戻る
        </Link>
      </div>

      <div className="mt-4">
        <Link
          className="link"
          href={`/mypage?role=${role}&userId=${userId}`}
        >
          マイページに戻る
        </Link>
      </div>
    </div>
  </main>
)
}