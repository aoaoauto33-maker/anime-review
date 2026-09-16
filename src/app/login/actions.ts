'use server'

import { prisma } from '@/lib/prisma'

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

  return {
    success: true,
    name: user.name,
    userId: user.id,
    role: user.role,
  }
}