'use server'

import { prisma } from '@/lib/prisma'

export async function login(name: string) {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  })

  if (!user) {
    return {
      success: false,
    }
  }

  return {
    success: true,
    name: user.name,
    userId: user.id,
  }
}