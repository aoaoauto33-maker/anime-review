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