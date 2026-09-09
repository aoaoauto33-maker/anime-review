'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createReview } from '@/app/animes/[id]/episodes/[episodeId]/reviews/actions'
// reviews/actions.tsで登録したレビュー投稿をimport

type Props = {
  id: number
  userId: number
  role?: string
  episodeId: number
}

export default function ReviewForm({ id, userId, role, episodeId }: Props) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    const result = await createReview(userId, episodeId, rating, comment)
    // createReviewに入力した値を送ってる
    // サーバー側の操作なのでawaitで待ってあげる

    if (result.success) {
      router.push(
        `/animes/${id}/episodes/${episodeId}?role=${role}&userId=${userId}`
      )
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div>
      <h2>レビューを書く</h2>

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

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="レビューを入力してください"
      />

      <button onClick={handleSubmit}>
        投稿する
      </button>

      <p>{message}</p>

      <Link
        href={`/animes/${id}/episodes/${episodeId}?role=${role}&userId=${userId}`}
      >
        キャンセル
      </Link>
    </div>
  )
}