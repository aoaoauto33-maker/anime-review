'use server'

import { prisma } from '@/lib/prisma'

// レビュー登録
export async function createReview(
  userId: number,
  episodeId: number,
  rating: number,
  comment: string,
) {
  try {
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

// レビュー削除
export async function deleteReview(
  reviewId: number,
  userId: number,
  role?: string,
) {
  try {
    // 一般ユーザーの場合は自分のレビューだけ削除できる
    if (role !== 'admin') {
      const review = await prisma.review.findFirst({
        where: {
          id: reviewId,
          userId: userId,
        },
      })

      if (!review) {
        return {
          success: false,
          message: 'このレビューを削除する権限がありません',
        }
      }
    }

    // 管理者ならどのレビューでも削除できる
    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    })

    return {
      success: true,
      message: 'レビューを削除しました',
    }
  } catch {
    return {
      success: false,
      message: 'レビューの削除に失敗しました',
    }
  }
}