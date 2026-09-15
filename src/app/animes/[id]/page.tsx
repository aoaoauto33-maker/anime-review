import { prisma } from '@/lib/prisma'
import AnimeDetail from '@/components/AnimeDetail'

// AnimeListからもらって来たアニメのid
//(ユーザーがとあるアニメを選択した場合、そのアニメのidがurlを通して渡される)
type Props = {
  params: Promise<{ id: string }>
  // awaitでidの受け取りを待ってからprismaを使いたいため、Promiseで型付けを待っててもらう
  // Promiseを使えばawaitが使える
}

export default async function AnimeDetailPage({ params }: Props) {
  const { id } = await params
  // paramsが決まるまで待つ

  // PK(id)を元に一件のデータを取得する
  const anime = await prisma.anime.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      episodes: true,
      taggings: {
        include: {
          genre: true,
        },
      },
    },
  })

  if (!anime) {
    return <p>アニメが見つかりません</p>
  }

 // ---------------------
 // 平均評価を表示するためのコード(おまけ要素てきな)
  // aggregate...DBのデータを集計するときに使う
  // 対象になったレビュー(そのアニメのレビュー全件)のratingの平均を計算する
  const result = await prisma.review.aggregate({
  where: {
    episode: {
      animeId: Number(id),
        // reviewテーブルの中にanimeIdがないため、紐づけているepisode
        // からanimeIdを取ってきて、そのanimeIdに関連するレビューを全件取得
    },
  },
  // _avg...平均を計算する
  _avg: {
    rating: true,
  },
})
 const averageRating = result._avg.rating ?? 0
 // 5点満点を100点満点に変換してるだけ
 // Math.round()...小数点を四捨五入するメソッド
 const totalRating = Math.round((averageRating / 5) * 100)

 // ---------------------

  return (
    <AnimeDetail
      anime={anime}
      totalRating={totalRating}
    />
  )
}