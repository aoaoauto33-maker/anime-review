import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
//  globalThis(アプリ全体からアクセスできるグローバルな領域)にprismaという名前でPrismaClientを保存しておく


export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
        // ！はちゃんと.envに用意してあるからnullにはならないよというマーク
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

