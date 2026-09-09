'use server'

import { prisma } from '@/lib/prisma'

// レビュー登録
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




// レビュー編集
export async function updateReview(
  reviewId: number,
  userId: number,
  rating: number,
  comment: string,
) {
  try {
    // 自分のレビューか確認
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId: userId,
      },
    })

    if (!review) {
      return {
        success: false,
        message: 'このレビューを編集する権限がありません',
      }
    }

    // レビューを更新
    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating,
        comment,
      },
    })

    return {
      success: true,
      message: 'レビューを編集しました',
    }
  } catch {
    return {
      success: false,
      message: 'レビューの編集に失敗しました',
    }
  }
}