'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateReview } from '@/app/animes/[id]/episodes/[episodeId]/reviews/actions'
import Link from 'next/link'

type Props = {
  id: number
  episodeId: number
  role?: string
  reviewId: number
  userId: number
  rating: number
  comment: string
}

export default function ReviewEditForm({
  id,
  episodeId,
  role,
  reviewId,
  userId,
  rating: initialRating,
  comment: initialComment,
}: Props) {
  const [rating, setRating] = useState(initialRating)
  const [comment, setComment] = useState(initialComment)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const result = await updateReview(
      reviewId,
      userId,
      rating,
      comment,
    )

    if (result.success) {
      router.push(
        `/animes/${id}/episodes/${episodeId}?role=${role}&userId=${userId}`
      )
      // 更新成功したらエピソード詳細画面に戻る
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div>
      <h2>レビューを編集</h2>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={1}>★☆☆☆☆</option>
        <option value={2}>★★☆☆☆</option>
        <option value={3}>★★★☆☆</option>
        <option value={4}>★★★★☆</option>
        <option value={5}>★★★★★</option>
      </select>

      <br />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="レビューを入力してください"
      />

      <br />

      <button onClick={handleSubmit}>
        更新する
      </button>

      <p>{message}</p>

      <br />

      <Link
        href={`/animes/${id}/episodes/${episodeId}?role=${role}&userId=${userId}`}
      >
        キャンセル
      </Link>
    </div>
  )
}