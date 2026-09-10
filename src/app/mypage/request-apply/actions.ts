'use server'

import { prisma } from '@/lib/prisma'

// アニメ追加リクエストを登録
export async function createRequest(
  userId: number,
  newAnimeName: string,
  reason: string,
) {
  try {
    await prisma.request.create({
      data: {
        userId,
        new_anime_name: newAnimeName,
        reason,
      },
    })

    return {
      success: true,
      message: 'アニメ追加リクエストを送信しました',
    }
  } catch {
    return {
      success: false,
      message: 'リクエストの送信に失敗しました',
    }
  }
}