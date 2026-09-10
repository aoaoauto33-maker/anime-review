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
      {role === 'admin' && <p>※管理者としてログインしています</p>}
      {role === 'user' && <p>※ユーザーとしてログインしています</p>}

      <h1>アニメ一覧</h1>

      {role === 'admin' && (
        <div className="mb-6">
          <Link
            className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
            href={`/animes/admin/new-anime?role=${role}&userId=${userId}`}
          >
            新規アニメを登録する
          </Link>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {animes.map((anime) => (
          <div key={anime.id} className="card p-1 !mb-0">
            <p className="m-0 truncate">
              <Link
                className="link"
                href={`/animes/${anime.id}?role=${role}&userId=${userId}`}
              >
                {anime.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}