import Link from 'next/link'
import { getRequests } from './actions'

type Props = {
  searchParams: Promise<{
    role?: string
    userId?: string
  }>
}

export default async function RequestApprovalPage({
  searchParams,
}: Props) {
  const { role, userId } = await searchParams

  const requests = await getRequests()

  return (
    <main>
      <h1>リクエスト管理</h1>

      {requests.length === 0 ? (
        <p>リクエストはありません</p>
      ) : (
        requests.map((request) => (
          <div key={request.id}>
            <h2>{request.new_anime_name}</h2>

            <p>申請者：{request.user.name}</p>

            <p>理由：{request.reason}</p>

            <p>状態：{request.status}</p>

            {request.status === 'pending' && (
              <div>
                <form
                  action={async () => {
                    'use server'

                    const { approveRequest } = await import('./actions')
                    await approveRequest(request.id)
                  }}
                >
                  <button type="submit">
                    承認
                  </button>
                </form>

                <form
                  action={async () => {
                    'use server'

                    const { rejectRequest } = await import('./actions')
                    await rejectRequest(request.id)
                  }}
                >
                  <button type="submit">
                    却下
                  </button>
                </form>
              </div>
            )}

            <hr />
          </div>
        ))
      )}

      <Link
        href={`/mypage?role=${role}&userId=${userId}`}
      >
        マイページに戻る
      </Link>
    </main>
  )
}