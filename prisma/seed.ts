// pnpm exec prisma db seed

import 'dotenv/config';
// 副作用インポート:何も取り出さない
import { PrismaPg } from '@prisma/adapter-pg';
// 前インストールしたやつ、PrismaとPostgreSQLをつなぐためのアダプター
import { PrismaClient } from '@/generated/prisma/client';
// PrismaClientを読み込んでいる

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
// 実際に使える窓口を設計図をもとに作ってる
// シングルトンでprisma.tsから使いまわせばいいのになぜやらないの？
// => Seedはprisma.tsを使うアプリ本体とは別のプログラムだから
// テスト用のPrismaClientを作ってる
// seedは終わったらPrisma Clientを停止させるのでシングルトンのコードを書く必要はない

async function main(){
    // 既存データを全部削除(外部キーがある順で)
    await prisma.review.deleteMany();
    await prisma.tagging.deleteMany();
    await prisma.request.deleteMany();
    await prisma.episode.deleteMany();
    await prisma.anime.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.user.deleteMany();

    // ユーザーを作成
    const user1 = await prisma.user.create({
        data: { 
            name: '青木梢恵',
            age: 22,
            gender: 'female',
            role: 'admin',
        },
    });
    const user2 = await prisma.user.create({
        data: { 
            name: '天城一彩',
            age: 18,
            gender: 'male',
            role: 'user'
        },
    });

    // ジャンルを作成
    const genre1 = await prisma.genre.create({
        data: {
            name: 'アクション',
        },
    })
    
    const genre2 = await prisma.genre.create({
        data: {
            name: 'コメディ',
        }
    })

    const genre3 = await prisma.genre.create({
        data: {
            name: 'ファンタジー',
        }
    })


    // アニメを作成
   const anime1 = await prisma.anime.create({
        data: {
            name: '鬼滅の刃',
            description: '鬼と戦う鬼殺隊の物語',
            release_year: 2019,
        },
    })

    // ジャンルとアニメを紐付け
    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime1.id,
        },
    })

    await prisma.tagging.create({
        data: {
            genreId: genre3.id,
            animeId: anime1.id,
        }
    })

    // エピソードを作成
    const episode1 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 1,
            title: '残酷',
            description: '炭治郎が家族を鬼に襲われる物語の始まり',
            release_date: new Date('2019-04-06'),
        },
    })

    const episode2 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 2,
            title: '育手・鱗滝左近次',
            description: '炭治郎が鱗滝のもとで修行を始める',
            release_date: new Date('2019-04-13'),
        },
    })

    // レビューを作成
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode1.id,
            rating: 5,
            comment: 'とても面白かった！',
        },
    })

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode1.id,
            rating: 4,
            comment: '続きが気になる作品。',
        },
    })

    // リクエストを作成
    await prisma.request.create({
        data: {
            userId: user1.id,
            new_anime_name: '進撃の巨人',
            reason: '好きな作品なので追加してほしい',
            status: 'pending',
        },
    })


     console.log('Seed data created successfully');
}


main()
.catch((e) => {
    console.error(e)
    process.exit(1)
})
// エラーが起きたら表示してね
.finally(async () => {
    await prisma.$disconnect()
});
// 実行したらDBの接続を切る