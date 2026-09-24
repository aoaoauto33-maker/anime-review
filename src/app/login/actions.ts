// ログインに関するprisma操作
// Cookie保存に関する処理
'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function login(name: string) {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  })

  // Atomの方で
  // export const userIdAtom = atom<number | null>(null)
  // export const roleAtom = atom<string | null>(null)
  // と定義しているのだから、失敗verにはnullを返してあげる必要がある
  if (!user) {
    return {
      success: false,
      userId: null,
      role: null,
    }
  }



  // ====================

  
  // Cookieは非同期なのでawaitを使う必要がある
  // userが存在する場合、Jotaiに返す前にCookieに保存する
  // cookieStoreは「Cookieを操作するためのものを取得した」だけ
  const cookieStore = await cookies()


  // ランダムでセッションIDを生成
  const sessionId = crypto.randomUUID()

  // DBにsessionIdとuserIdを対応させた情報を登録
  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  })

  cookieStore.set('sessionId', sessionId)



  // ====================
  // JotaiにuserIdとroleを返す
  return {
    success: true,
    name: user.name,
    userId: user.id,
    role: user.role,
  }
}