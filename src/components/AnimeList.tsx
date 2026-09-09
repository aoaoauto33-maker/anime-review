import Link from 'next/link'

type Anime = {
  id: number
  name: string
  image_url: string
  description: string | null
  release_year: number
}

type Props = {
  animes: Anime[]
  role?: string
}

export default function AnimeList({ animes, role }: Props) {
  return (
    <div>
      {animes.map((anime) => (
        // もらってきたアニメ情報を1件ずつ表示
        <div key={anime.id}>
          <h2>
            <Link href={`/animes/${anime.id}?role=${role}`}>
              {anime.name}
            </Link>
            {/* アニメ名をLinkにして、そこから詳細ページに飛べるようにする */}
            {/* animes/[id]/page.tsxにidとroleを渡す */}
          </h2>

          <p>{anime.description}</p>
          <p>{anime.release_year}年</p>
        </div>
      ))}
    </div>
  )
}