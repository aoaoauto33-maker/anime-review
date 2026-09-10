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
    <main>
      <h1>リクエスト管理</h1>

      <Link
        href={`/animes/admin/new-anime?role=${role}&userId=${userId}`}
      >
        新規アニメを登録する
      </Link>

      <h2>リクエスト検索</h2>

      <Link
        href={`/mypage/request-approval?role=${role}&userId=${userId}&status=all`}
      >
        すべて
      </Link>
      {' / '}
      <Link
        href={`/mypage/request-approval?role=${role}&userId=${userId}&status=pending`}
      >
        未承認
      </Link>
      {' / '}
      <Link
        href={`/mypage/request-approval?role=${role}&userId=${userId}&status=approved`}
      >
        承認済み
      </Link>
      {' / '}
      <Link
        href={`/mypage/request-approval?role=${role}&userId=${userId}&status=rejected`}
      >
        却下済み
      </Link>
      {' / '}
      <Link
        href={`/mypage/request-approval?role=${role}&userId=${userId}&status=added`}
      >
        追加済み
      </Link>

      <h2>リクエスト一覧</h2>

      {filteredRequests.length === 0 ? (
        <p>該当するリクエストはありません</p>
      ) : (
        filteredRequests.map((request) => (
          <div key={request.id}>
            <h3>{request.new_anime_name}</h3>

            <p>申請者：{request.user.name}</p>

            <p>理由：{request.reason}</p>

            <p>
              状態：
              {request.status === 'pending' && '未承認'}
              {request.status === 'approved' && '承認済み'}
              {request.status === 'rejected' && '却下済み'}
              {request.status === 'added' && '追加済み'}
            </p>

            {request.status === 'pending' && (
              <div>
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
              <>
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
              </>
            )}

            {request.status === 'rejected' && (
              <>
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
              </>
            )}

            <hr />
          </div>
        ))
      )}

      <br />

      <Link
        href={`/mypage?role=${role}&userId=${userId}`}
      >
        マイページに戻る
      </Link>
    </main>
  )
}