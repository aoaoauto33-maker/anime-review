import Link from 'next/link'
import {
  getRequests,
  approveRequest,
  rejectRequest,
  resetRequest,
} from './actions'

type Props = {
  searchParams: Promise<{
    role?: string
    userId?: string
    status?: string
  }>
}

export default async function RequestApprovalPage({
  searchParams,
}: Props) {
  const { role, userId, status } = await searchParams

  const requests = await getRequests()

  const filteredRequests =
    status && status !== 'all'
      ? requests.filter((request) => request.status === status)
      : requests

  return (
    <main className="max-w-4xl">
      <h1>リクエスト管理</h1>

      <div className="mb-6">
        <Link
          className="inline-block rounded bg-blue-600 px-4 py-2 !text-white hover:bg-blue-700"
          href={`/animes/admin/new-anime?role=${role}&userId=${userId}`}
        >
          新規アニメを登録する
        </Link>
      </div>

      <div className="card p-6 py-1">
        <h2 className="mt-0">リクエスト絞り込み</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            className="link"
            href={`/mypage/request-approval?role=${role}&userId=${userId}&status=all`}
          >
            すべて
          </Link>

          <Link
            className="link"
            href={`/mypage/request-approval?role=${role}&userId=${userId}&status=pending`}
          >
            未承認
          </Link>

          <Link
            className="link"
            href={`/mypage/request-approval?role=${role}&userId=${userId}&status=approved`}
          >
            承認済み
          </Link>

          <Link
            className="link"
            href={`/mypage/request-approval?role=${role}&userId=${userId}&status=rejected`}
          >
            却下済み
          </Link>

          <Link
            className="link"
            href={`/mypage/request-approval?role=${role}&userId=${userId}&status=added`}
          >
            追加済み
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2>リクエスト一覧</h2>

        {filteredRequests.length === 0 ? (
          <p>該当するリクエストはありません</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="card p-5">
                <h3>{request.new_anime_name}</h3>

                <div className="flex flex-col gap-2">
                  <p>申請者：{request.user.name}</p>

                  <p>理由：{request.reason}</p>

                  <p>
                    状態：
                    {request.status === 'pending' && '未承認'}
                    {request.status === 'approved' && '承認済み'}
                    {request.status === 'rejected' && '却下済み'}
                    {request.status === 'added' && '追加済み'}
                  </p>
                </div>

                {request.status === 'pending' && (
                  <div className="mt-4 flex gap-3">
                    <form
                      action={async () => {
                        'use server'
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
                        await rejectRequest(request.id)
                      }}
                    >
                      <button type="submit">
                        却下
                      </button>
                    </form>
                  </div>
                )}

                {request.status === 'approved' && (
                  <div className="mt-4 flex gap-3">
                    <form
                      action={async () => {
                        'use server'
                        await rejectRequest(request.id)
                      }}
                    >
                      <button type="submit">
                        却下にする
                      </button>
                    </form>

                    <form
                      action={async () => {
                        'use server'
                        await resetRequest(request.id)
                      }}
                    >
                      <button type="submit">
                        未承認に戻す
                      </button>
                    </form>
                  </div>
                )}

                {request.status === 'rejected' && (
                  <div className="mt-4 flex gap-3">
                    <form
                      action={async () => {
                        'use server'
                        await approveRequest(request.id)
                      }}
                    >
                      <button type="submit">
                        承認にする
                      </button>
                    </form>

                    <form
                      action={async () => {
                        'use server'
                        await resetRequest(request.id)
                      }}
                    >
                      <button type="submit">
                        未承認に戻す
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          className="link"
          href={`/mypage?role=${role}&userId=${userId}`}
        >
          マイページに戻る
        </Link>
      </div>
    </main>
  )
}