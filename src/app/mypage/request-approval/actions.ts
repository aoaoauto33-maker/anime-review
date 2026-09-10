'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// リクエスト一覧を取得
export async function getRequests() {
  return await prisma.request.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      user: true,
    },
  })
}

// リクエストを承認
export async function approveRequest(requestId: number) {
  try {
    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'approved',
        processed_at: new Date(),
      },
    })

    revalidatePath('/mypage/request-approval')

    return {
      success: true,
      message: 'リクエストを承認しました',
    }
  } catch {
    return {
      success: false,
      message: 'リクエストの承認に失敗しました',
    }
  }
}

// リクエストを却下
export async function rejectRequest(requestId: number) {
  try {
    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'rejected',
        processed_at: new Date(),
      },
    })

    revalidatePath('/mypage/request-approval')

    return {
      success: true,
      message: 'リクエストを却下しました',
    }
  } catch {
    return {
      success: false,
      message: 'リクエストの却下に失敗しました',
    }
  }
}

// リクエストを未承認に戻す
export async function resetRequest(requestId: number) {
  try {
    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'pending',
        processed_at: null,
      },
    })

    revalidatePath('/mypage/request-approval')

    return {
      success: true,
      message: 'リクエストを未承認に戻しました',
    }
  } catch {
    return {
      success: false,
      message: 'リクエストの更新に失敗しました',
    }
  }
}