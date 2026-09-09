'use server'

import { prisma } from '@/lib/prisma'

// ユーザーがブラウザ側で入力した値を受け取る
export async function createReview(
  userId: number,
  episodeId: number,
  rating: number,
  comment: string,
) {
  try {
    // 新規レビューをDBに登録
    await prisma.review.create({
      data: {
        userId,
        episodeId,
        rating,
        comment,
      },
    })

    return {
      success: true,
      message: 'レビューを投稿しました',
    }
  } catch {
    return {
      success: false,
      message: 'このエピソードにはすでにレビューを投稿しています',
    }
  }
}