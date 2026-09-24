// レビューに関するprisma操作(サーバー)
'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

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
// Jotaiは権限判定に使わず、サーバー側でCookie → ユーザー特定 → DBのrole確認をする
export async function deleteReview(
  reviewId: number,
) {
  try {
    // 保存してあるCookieの取得 使うときはJotaiみたいに取得する必要がある
    const cookieStore = await cookies()
    const userId = Number(cookieStore.get('userId')?.value)

    // CookieのuserIdからユーザー情報を取得(ここでroleを取得できる)
    const user = await prisma.user.findUnique({
       where: {
        id: userId,
      },
    })

    // ユーザーが見つからなかったらそのまま終了
    if(!user){
      return{
        success: false,
        message: 'ログインしてください'
      }
    }

    // 成功の場合、取得したuserのroleからadminを判定
    if(user?.role === 'admin'){
        // 管理者ならどのレビューでも削除できる
        await prisma.review.delete({
          where: {
            id: reviewId,
          },
        })
    }else{
      // adminじゃない場合はCookieとreviewのuserIdを一致させる必要がある
      const review = await prisma.review.findFirst({
        where: {
          id: reviewId,
          // CookieのUserIdとrevuew.userIdが一致するか確認
          userId: userId
        },
      })

      if (!review) {
        return {
          success: false,
          message: 'このレビューを削除する権限がありません',
        }
      }

      // 管理者以外はCookieと一致するuserIdを持つレビューだけ消せる
      await prisma.review.delete({
        where: {
          id: reviewId,
        }
      })
    }
     
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