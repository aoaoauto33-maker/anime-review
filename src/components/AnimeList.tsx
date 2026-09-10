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
  userId?: string
}

export default function AnimeList({ animes, role, userId }: Props) {
  return (
    <div>
      <h1>アニメ一覧</h1>

      {role === 'admin' && <p>管理者としてログインしています</p>}
      {role === 'user' && <p>ユーザーとしてログインしています</p>}

      {role === 'admin' && (
        <Link href={`/animes/admin/new-anime?role=${role}&userId=${userId}`}>
          新規アニメを登録する
        </Link>
      )}

      {animes.map((anime) => (
        <div key={anime.id}>
          <h2>
            <Link href={`/animes/${anime.id}?role=${role}&userId=${userId}`}>
              {anime.name}
            </Link>
          </h2>
        </div>
      ))}
    </div>
  )
}