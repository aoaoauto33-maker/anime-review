// Jotaiでログインしたユーザーの情報を受け渡しする(userIdとrole)
// ユーザー情報をルーティングで渡すのはセキュリティ上危険なため
import { atom } from 'jotai'

export const userIdAtom = atom<number | null>(null)
export const roleAtom = atom<string | null>(null)

