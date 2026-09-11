'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { userIdAtom } from '@/store/user'
import { updateReview } from '@/app/animes/[id]/episodes/[episodeId]/reviews/actions'

type Props = {
  id: number
  episodeId: number
  reviewId: number
  reviewUserId: number
  rating: number
  comment: string
}

export default function ReviewEditForm({
  id,
  episodeId,
  reviewId,
  reviewUserId,
  rating: initialRating,
  comment: initialComment,
}: Props) {
  const [rating, setRating] = useState(initialRating)
  const [comment, setComment] = useState(initialComment)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const userId = useAtomValue(userIdAtom)

  const handleSubmit = async () => {
    if (!userId) {
      setMessage('ユーザー情報がありません')
      return
    }

    if (userId !== reviewUserId) {
      setMessage('このレビューを編集する権限がありません')
      return
    }

    const result = await updateReview(
      reviewId,
      userId,
      rating,
      comment,
    )

    if (result.success) {
      router.push(`/animes/${id}/episodes/${episodeId}`)
      // 更新成功したらエピソード詳細画面に戻る
    } else {
      setMessage(result.message)
    }
  }

  return (
    <main className="max-w-4xl">
      <div className="card p-6">
        <h1>レビューを編集</h1>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-bold">評価</p>
            <select
              className="rounded border border-slate-300 px-3 py-2"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={1}>★☆☆☆☆</option>
              <option value={2}>★★☆☆☆</option>
              <option value={3}>★★★☆☆</option>
              <option value={4}>★★★★☆</option>
              <option value={5}>★★★★★</option>
            </select>
          </div>

          <div>
            <p className="font-bold">コメント</p>
            <textarea
              className="w-full rounded border border-slate-300 p-3"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="レビューを入力してください"
            />
          </div>

          <button onClick={handleSubmit}>
            更新する
          </button>

          <p>{message}</p>

          <Link
            className="link"
            href={`/animes/${id}/episodes/${episodeId}`}
          >
            キャンセル
          </Link>
        </div>
      </div>
    </main>
  )
}