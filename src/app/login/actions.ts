// ログインに関するprisma操作
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

  // Cookieは非同期なのでawaitを使う必要がある
  // userが存在する場合、Jotaiに返す前にCookieに保存する
  // cookieStoreは「Cookieを操作するためのものを取得した」だけ
  const cookieStore = await cookies()

  // CookieにuserIdを保存する(roleは保存しちゃダメ)
  // Cookieに保存する値は文字列として扱う
  cookieStore.set('userId', user.id.toString())


  return {
    success: true,
    name: user.name,
    userId: user.id,
    role: user.role,
  }
}