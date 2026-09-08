import { prisma } from '@/lib/prisma'

export default async function Home() {
  const users = await prisma.user.findMany()

  return (
    <main>
      <h1>Prisma動作確認</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  )
}