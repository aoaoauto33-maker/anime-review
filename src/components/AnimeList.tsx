type Anime = {
  id: number
  name: string
  image_url: string
  description: string | null
  release_year: number
}

type Props = {
  animes: Anime[]
}

export default function AnimeList({ animes }: Props) {
  return (
    <div>
      {animes.map((anime) => (
        <div key={anime.id}>
          <h2>{anime.name}</h2>
          <p>{anime.description}</p>
          <p>{anime.release_year}年</p>
        </div>
      ))}
    </div>
  )
}