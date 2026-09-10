'use server'

import { prisma } from '@/lib/prisma'

// 承認済みリクエストを取得
export async function getApprovedRequests() {
  return await prisma.request.findMany({
    where: {
      status: 'approved',
    },
    orderBy: {
      id: 'asc',
    },
  })
}

// アニメ登録
export async function createAnime(
  name: string,
  description: string,
  releaseYear: number,
) {
  try {
    const anime = await prisma.anime.create({
      data: {
        name,
        description,
        release_year: releaseYear,
      },
    })

    return {
      success: true,
      message: 'アニメを登録しました',
      anime,
    }
  } catch {
    return {
      success: false,
      message: 'アニメの登録に失敗しました',
    }
  }
}

// リクエスト削除
export async function deleteRequest(requestId: number) {
  try {
    await prisma.request.delete({
      where: {
        id: requestId,
      },
    })

    return {
      success: true,
      message: 'リクエストを削除しました',
    }
  } catch {
    return {
      success: false,
      message: 'リクエストの削除に失敗しました',
    }
  }
}

// アニメ情報を取得
export async function getAnime(id: number) {
  return await prisma.anime.findUnique({
    where: {
      id,
    },
  })
}

// アニメ情報を更新
export async function updateAnime(
  id: number,
  name: string,
  description: string,
  releaseYear: number,
) {
  try {
    await prisma.anime.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        release_year: releaseYear,
      },
    })

    return {
      success: true,
      message: 'アニメ情報を更新しました',
    }
  } catch {
    return {
      success: false,
      message: 'アニメ情報の更新に失敗しました',
    }
  }
}