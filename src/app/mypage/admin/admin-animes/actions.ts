'use server'

import { prisma } from '@/lib/prisma'

export async function createAnime(
  name: string,
  description: string,
  release_year: number,
) {
  // アニメ登録
  try {
    await prisma.anime.create({
      data: {
        name,
        description,
        release_year,
      },
    })

    return {
      success: true,
      message: 'アニメを登録しました',
    }
  } catch {
    return {
      success: false,
      message: 'アニメの登録に失敗しました',
    }
  }
}