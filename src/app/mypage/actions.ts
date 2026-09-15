// マイページ画面に関するprisma操作

'use server'

import { prisma } from '@/lib/prisma'

// 自分のレビューを取得
export async function getMyReviews(userId: number) {
  return await prisma.review.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      episode: {
        include: {
          anime: true,
        },
      },
    },
  })
}

// 自分のアニメ追加リクエストを取得
export async function getMyRequests(userId: number) {
  return await prisma.request.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: 'desc',
    },
  })
}