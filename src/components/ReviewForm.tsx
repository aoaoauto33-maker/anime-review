'use client'

import { useState } from 'react'
import { createReview } from '@/app/reviews/actions'
// reviews/actions.tsで登録したレビュー投稿をimport

type Props = {
  userId: number
  episodeId: number
}

export default function ReviewForm({ userId, episodeId }: Props) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')


  const handleSubmit = async () => {
    const result = await createReview(userId, episodeId, rating, comment)
    // createReviewに入力した値を送ってる
    // サーバー側の操作なのでawaitで待ってあげる

    if (result.success) {
      setMessage('レビューを投稿しました')
      setComment('')
      // 投稿し終わったら入力欄を空にする
    } else {
      setMessage(result.message)
    }

  }

  return (
    <div>
      <h3>レビューを書く</h3>

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
    </div>
  )
}