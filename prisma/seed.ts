// pnpm exec prisma db seed

import 'dotenv/config';
// 副作用インポート:何も取り出さない
// dotenv/configを読み込んだときに実行される処理そのものが欲しい
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
            name: '関谷絵梨',
            age: 18,
            gender: 'female',
            role: 'user',
        },
    });

    const user3 = await prisma.user.create({
        data: { 
            name: '竹内玲奈',
            age: 2,
            gender: 'female',
            role: 'user',
        },
    });

    const user4 = await prisma.user.create({
        data: { 
            name: '増田侑奈',
            age: 20,
            gender: 'female',
            role: 'user',
        },
    });

    const user5 = await prisma.user.create({
        data: { 
            name: '木村',
            age: 21,
            gender: 'male',
            role: 'user',
        },
    });

    const user6 = await prisma.user.create({
        data: { 
            name: '宮澤',
            age: 27,
            gender: 'male',
            role: 'user',
        },
    });

    const user7 = await prisma.user.create({
        data: { 
            name: '小松',
            age: 119,
            gender: 'male',
            role: 'user',
        },
    });
    const user8 = await prisma.user.create({
        data: { 
            name: '西',
            age: 32,
            gender: 'male',
            role: 'user',
        },
    });

    const user9 = await prisma.user.create({
        data: { 
            name: '残熊',
            age: 7,
            gender: 'male',
            role: 'user',
        },
    });

    const user10 = await prisma.user.create({
        data: { 
            name: '吉田',
            age: 42,
            gender: 'male',
            role: 'user',
        },
    });

    const user11 = await prisma.user.create({
        data: { 
            name: '高橋',
            age: 52,
            gender: 'male',
            role: 'user',
        },
    });

    // ジャンルを作成
    const genre1 = await prisma.genre.create({
        data: {
            name: 'アクション',
        },
    });

    const genre2 = await prisma.genre.create({
        data: {
            name: 'コメディ',
        },
    });

    const genre3 = await prisma.genre.create({
        data: {
            name: 'ファンタジー',
        },
    });

    const genre4 = await prisma.genre.create({
        data: {
            name: 'ミステリー',
        },
    });

    const genre5 = await prisma.genre.create({
        data: {
            name: 'バトル',
        },
    });

    const genre6 = await prisma.genre.create({
        data: {
            name: '恋愛',
        },
    });

    const genre7 = await prisma.genre.create({
        data: {
            name: '日常',
        },
    });

    const genre8 = await prisma.genre.create({
        data: {
            name: 'サスペンス',
        },
    });

    const genre9 = await prisma.genre.create({
        data: {
            name: '歴史・時代劇',
        },
    });

    const genre10 = await prisma.genre.create({
        data: {
            name: 'SF',
        },
    });

    // アニメを作成
    const anime1 = await prisma.anime.create({
        data: {
            name: 'クレヨンしんちゃん',
            image_url: '/animes/crayon-shinchan.jpg',
            description: '野原しんのすけと家族の日常を描いたコメディ作品',
            release_year: 1992,
        },
    });

    const anime2 = await prisma.anime.create({
        data: {
            name: '名探偵コナン',
            image_url: '/animes/conan.jpg',
            description: '高校生探偵が少年の姿になり、数々の事件を解決していく物語',
            release_year: 1996,
        },
    });

    const anime3 = await prisma.anime.create({
        data: {
            name: 'ONE PIECE',
            image_url: '/animes/one-piece.jpg',
            description: '海賊王を目指すルフィと仲間たちの冒険を描いた物語',
            release_year: 1999,
        },
    });

    const anime4 = await prisma.anime.create({
        data: {
            name: 'HUNTER×HUNTER',
            image_url: '/animes/hunter-hunter.jpg',
            description: '父親を探すゴンが仲間たちとともにさまざまな冒険に挑む物語',
            release_year: 2011,
        },
    });

    const anime5 = await prisma.anime.create({
        data: {
            name: '薬屋のひとりごと',
            image_url: '/animes/kusuriya.jpg',
            description: '後宮を舞台に薬師の猫猫がさまざまな事件の謎を解いていく物語',
            release_year: 2023,
        },
    });

    const anime6 = await prisma.anime.create({
        data: {
            name: '鬼滅の刃',
            image_url: '/animes/kimetsu.jpg',
            description: '家族を鬼に襲われた炭治郎が、鬼となった妹を人間に戻すため戦う物語',
            release_year: 2019,
        },
    });

    const anime7 = await prisma.anime.create({
        data: {
            name: '進撃の巨人',
            image_url: '/animes/shingeki.jpg',
            description: '巨人に支配された世界で、人類が生き残るために戦う物語',
            release_year: 2013,
        },
    });

    const anime8 = await prisma.anime.create({
        data: {
            name: 'SPY×FAMILY',
            image_url: '/animes/spy-family.jpg',
            description: 'スパイの父、殺し屋の母、超能力者の娘による仮初めの家族の日常を描いた物語',
            release_year: 2022,
        },
    });

    const anime9 = await prisma.anime.create({
        data: {
            name: '呪術廻戦',
            image_url: '/animes/jujutsu.jpg',
            description: '呪いをめぐる戦いに身を投じる虎杖悠仁たちの物語',
            release_year: 2020,
        },
    });

    const anime10 = await prisma.anime.create({
        data: {
            name: '僕のヒーローアカデミア',
            image_url: '/animes/hero-aca.jpg',
            description: '個性と呼ばれる特殊能力を持つ人々の世界で、ヒーローを目指す少年の物語',
            release_year: 2016,
        },
    });

    // ジャンルとアニメを紐付け
    // クレヨンしんちゃん：コメディ、日常
    await prisma.tagging.create({
        data: {
            genreId: genre2.id,
            animeId: anime1.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre7.id,
            animeId: anime1.id,
        },
    });

    // 名探偵コナン：ミステリー、サスペンス
    await prisma.tagging.create({
        data: {
            genreId: genre4.id,
            animeId: anime2.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre8.id,
            animeId: anime2.id,
        },
    });

    // ONE PIECE：アクション、バトル、ファンタジー
    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime3.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre5.id,
            animeId: anime3.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre3.id,
            animeId: anime3.id,
        },
    });

    // HUNTER×HUNTER：アクション、バトル、ファンタジー
    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime4.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre5.id,
            animeId: anime4.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre3.id,
            animeId: anime4.id,
        },
    });

    // 薬屋のひとりごと：ミステリー、歴史・時代劇、サスペンス
    await prisma.tagging.create({
        data: {
            genreId: genre4.id,
            animeId: anime5.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre9.id,
            animeId: anime5.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre8.id,
            animeId: anime5.id,
        },
    });

    // 鬼滅の刃：アクション、バトル、ファンタジー
    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime6.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre5.id,
            animeId: anime6.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre3.id,
            animeId: anime6.id,
        },
    });

    // 進撃の巨人：アクション、バトル、サスペンス
    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime7.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre5.id,
            animeId: anime7.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre8.id,
            animeId: anime7.id,
        },
    });

    // SPY×FAMILY：コメディ、アクション、日常
    await prisma.tagging.create({
        data: {
            genreId: genre2.id,
            animeId: anime8.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime8.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre7.id,
            animeId: anime8.id,
        },
    });

    // 呪術廻戦：アクション、バトル、ファンタジー
    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime9.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre5.id,
            animeId: anime9.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre3.id,
            animeId: anime9.id,
        },
    });

    // 僕のヒーローアカデミア：アクション、バトル、SF
    await prisma.tagging.create({
        data: {
            genreId: genre1.id,
            animeId: anime10.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre5.id,
            animeId: anime10.id,
        },
    });

    await prisma.tagging.create({
        data: {
            genreId: genre10.id,
            animeId: anime10.id,
        },
    });

    // エピソードを作成
    // クレヨンしんちゃんのエピソードを作成
    const episode1 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 1,
            title: 'おつかいに行くゾ',
            description: 'しんのすけが一人でおつかいに挑戦する',
            release_date: new Date('1992-04-13'),
        },
    });

    const episode2 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 2,
            title: 'ママの朝は忙しいゾ',
            description: '朝から忙しく動き回るみさえとしんのすけの様子を描く',
            release_date: new Date('1992-04-13'),
        },
    });

    const episode3 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 3,
            title: 'お絵かきするゾ',
            description: 'しんのすけがお絵かきを楽しむ中で騒動を起こす',
            release_date: new Date('1992-04-13'),
        },
    });

    const episode4 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 4,
            title: '三輪車は楽しいゾ',
            description: 'しんのすけが三輪車で遊ぶ',
            release_date: new Date('1992-04-20'),
        },
    });

    const episode5 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 5,
            title: 'お腹がパンパン痛いゾ',
            description: 'お腹を痛がるしんのすけをめぐる騒動が起こる',
            release_date: new Date('1992-04-20'),
        },
    });

    const episode6 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 6,
            title: '父ちゃんだって大変だゾ',
            description: 'ひろしの仕事や家庭での苦労が描かれる',
            release_date: new Date('1992-04-20'),
        },
    });

    const episode7 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 7,
            title: 'アクション仮面を見るゾ',
            description: 'しんのすけが大好きなアクション仮面を楽しむ',
            release_date: new Date('1992-04-27'),
        },
    });

    const episode8 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 8,
            title: '給食は楽しいゾ',
            description: '幼稚園での給食をめぐって騒動が起こる',
            release_date: new Date('1992-04-27'),
        },
    });

    const episode9 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 9,
            title: '歯医者に行くゾ',
            description: 'しんのすけが歯医者に行くことになる',
            release_date: new Date('1992-04-27'),
        },
    });

    const episode10 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 10,
            title: '仁侠ひまわり組だゾ',
            description: '幼稚園を舞台にしんのすけたちが騒動を巻き起こす',
            release_date: new Date('1992-05-04'),
        },
    });

    const episode11 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 11,
            title: 'ピクニックに行くゾ',
            description: '野原一家がピクニックを楽しむ',
            release_date: new Date('1992-05-04'),
        },
    });

    const episode12 = await prisma.episode.create({
        data: {
            animeId: anime1.id,
            episode_number: 12,
            title: '映画に行くゾ',
            description: 'しんのすけたちが映画を見に出かける',
            release_date: new Date('1992-05-11'),
        },
    });

    // 名探偵コナンのエピソードを作成
    const episode13 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 1,
            title: 'ジェットコースター殺人事件',
            description: '遊園地のジェットコースターで殺人事件が発生し、新一が事件の謎に挑む',
            release_date: new Date('1996-01-08'),
        },
    });

    const episode14 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 2,
            title: '社長令嬢誘拐事件',
            description: '誘拐された社長令嬢を救うため、コナンが事件を追う',
            release_date: new Date('1996-01-15'),
        },
    });

    const episode15 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 3,
            title: 'アイドル密室殺人事件',
            description: 'アイドルの自宅で起きた密室殺人事件の謎を解く',
            release_date: new Date('1996-01-22'),
        },
    });

    const episode16 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 4,
            title: '大都会暗号マップ事件',
            description: '暗号のような地図を手掛かりに事件の真相を追う',
            release_date: new Date('1996-01-29'),
        },
    });

    const episode17 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 5,
            title: '新幹線大爆破事件',
            description: '走行中の新幹線を舞台に爆破事件の謎に挑む',
            release_date: new Date('1996-02-05'),
        },
    });

    const episode18 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 6,
            title: 'バレンタイン殺人事件',
            description: 'バレンタインデーに起きた殺人事件をコナンが調査する',
            release_date: new Date('1996-02-12'),
        },
    });

    const episode19 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 7,
            title: '月いちプレゼント脅迫事件',
            description: '毎月届くプレゼントをめぐる脅迫事件の謎を追う',
            release_date: new Date('1996-02-19'),
        },
    });

    const episode20 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 8,
            title: '美術館オーナー殺人事件',
            description: '美術館で起きた殺人事件の真相をコナンが推理する',
            release_date: new Date('1996-02-26'),
        },
    });

    const episode21 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 9,
            title: '天下一夜祭殺人事件',
            description: '祭りの会場で発生した殺人事件の謎を解く',
            release_date: new Date('1996-03-04'),
        },
    });

    const episode22 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 10,
            title: 'プロサッカー選手脅迫事件',
            description: 'プロサッカー選手を狙った脅迫事件をコナンが調査する',
            release_date: new Date('1996-03-11'),
        },
    });

    const episode23 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 11,
            title: 'ピアノソナタ「月光」殺人事件',
            description: '月影島で起きた連続殺人事件の謎にコナンが挑む',
            release_date: new Date('1996-04-08'),
        },
    });

    const episode24 = await prisma.episode.create({
        data: {
            animeId: anime2.id,
            episode_number: 12,
            title: '歩美ちゃん誘拐事件',
            description: '誘拐された歩美を救うためコナンが犯人を追跡する',
            release_date: new Date('1996-04-15'),
        },
    });

    // ONE PIECEのエピソードを作成
    const episode25 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 1,
            title: '俺はルフィ！海賊王になる男だ！',
            description: 'ルフィが海賊王を目指して旅立ち、コビーと出会う',
            release_date: new Date('1999-10-20'),
        },
    });

    const episode26 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 2,
            title: '大剣豪現る！海賊狩りロロノア・ゾロ',
            description: 'ルフィがシェルズタウンでゾロと出会い、仲間に誘う',
            release_date: new Date('1999-11-17'),
        },
    });

    const episode27 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 3,
            title: 'モーガンVSルフィ！謎の美少女は誰？？',
            description: 'ルフィとモーガンが対決し、謎の少女ナミが登場する',
            release_date: new Date('1999-11-24'),
        },
    });

    const episode28 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 4,
            title: 'ルフィの過去！赤髪のシャンクス登場',
            description: 'ルフィが海賊を目指すきっかけとなったシャンクスとの過去が描かれる',
            release_date: new Date('1999-12-08'),
        },
    });

    const episode29 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 5,
            title: '恐怖！謎の力・海賊道化バギー船長！',
            description: 'ルフィたちがバギー海賊団と遭遇する',
            release_date: new Date('1999-12-15'),
        },
    });

    const episode30 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 6,
            title: '絶体絶命！猛獣使いモージVSルフィ！',
            description: 'ルフィがバギー海賊団の猛獣使いモージと戦う',
            release_date: new Date('1999-12-29'),
        },
    });

    const episode31 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 7,
            title: '壮絶決闘！剣豪ゾロVS曲芸のカバジ！',
            description: 'ゾロがバギー海賊団のカバジと激しい戦いを繰り広げる',
            release_date: new Date('1999-12-29'),
        },
    });

    const episode32 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 8,
            title: '勝者はどっち？悪魔の実の能力対決！',
            description: 'ルフィとバギーが悪魔の実の能力を使って対決する',
            release_date: new Date('1999-12-29'),
        },
    });

    const episode33 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 9,
            title: '正義のうそつき？キャプテンウソップ',
            description: 'ルフィたちがウソップと出会い、シロップ村を訪れる',
            release_date: new Date('2000-01-12'),
        },
    });

    const episode34 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 10,
            title: '史上最強の変な奴！催眠術師ジャンゴ',
            description: '催眠術師ジャンゴが登場し、ウソップたちを巻き込む騒動が起こる',
            release_date: new Date('2000-01-19'),
        },
    });

    const episode35 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 11,
            title: '陰謀を暴け！海賊執事キャプテンクロ',
            description: '執事クラハドールの正体とクロの陰謀が明らかになる',
            release_date: new Date('2000-01-26'),
        },
    });

    const episode36 = await prisma.episode.create({
        data: {
            animeId: anime3.id,
            episode_number: 12,
            title: '激突！クロネコ海賊団坂道の大攻防！',
            description: 'クロネコ海賊団がシロップ村を襲い、ルフィたちが迎え撃つ',
            release_date: new Date('2000-02-02'),
        },
    });

    // HUNTER×HUNTERのエピソードを作成
    const episode37 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 1,
            title: 'タビダチ×ト×ナカマタチ',
            description: 'ゴンがハンター試験を受けるため故郷を旅立ち、試験会場を目指す',
            release_date: new Date('2011-10-02'),
        },
    });

    const episode38 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 2,
            title: 'シケン×ノ×シケン',
            description: 'ハンター試験が始まり、ゴンたちが最初の試験に挑む',
            release_date: new Date('2011-10-09'),
        },
    });

    const episode39 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 3,
            title: 'ライバル×ガ×サバイバル',
            description: '試験を進む中でゴンがさまざまな受験者と出会う',
            release_date: new Date('2011-10-16'),
        },
    });

    const episode40 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 4,
            title: 'キセキ×ノ×メイリキ',
            description: 'ゴンたちは試験の過酷な課題に挑み、仲間との協力を深める',
            release_date: new Date('2011-10-23'),
        },
    });

    const episode41 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 5,
            title: 'ヒソカ×ハ×ヒソカ',
            description: 'ゴンたちの前に強敵ヒソカが現れ、試験の緊張感が高まる',
            release_date: new Date('2011-10-30'),
        },
    });

    const episode42 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 6,
            title: 'イガイ×ナ×カダイ',
            description: 'ゴンたちが次の試験へ進み、それぞれの能力を発揮していく',
            release_date: new Date('2011-11-06'),
        },
    });

    const episode43 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 7,
            title: 'トウゲキ×ト×ツイセキ',
            description: '試験の中で受験者同士の駆け引きが激しくなっていく',
            release_date: new Date('2011-11-13'),
        },
    });

    const episode44 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 8,
            title: 'カイケツ×ハ×タスウケツ',
            description: '試験の課題を突破するため、ゴンたちが知恵を絞る',
            release_date: new Date('2011-11-20'),
        },
    });

    const episode45 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 9,
            title: 'シュウジン×ト×センジュツ',
            description: '受験者たちが試験を通して互いの実力を探り合う',
            release_date: new Date('2011-11-27'),
        },
    });

    const episode46 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 10,
            title: 'ヒッカケ×ノ×キッカケ',
            description: '試験の難関を前に、ゴンたちはそれぞれの方法で突破を目指す',
            release_date: new Date('2011-12-04'),
        },
    });

    const episode47 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 11,
            title: 'ギャンブル×ガ×ショウブ',
            description: '受験者たちが運と実力をかけた勝負に挑む',
            release_date: new Date('2011-12-11'),
        },
    });

    const episode48 = await prisma.episode.create({
        data: {
            animeId: anime4.id,
            episode_number: 12,
            title: 'サイゴ×ノ×カケヒキ',
            description: 'ハンター試験が進み、ゴンたちはさらなる試練に立ち向かう',
            release_date: new Date('2011-12-18'),
        },
    });


    // 薬屋のひとりごとのエピソードを作成
    const episode49 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 1,
            title: '猫猫',
            description: '花街で薬師として働いていた猫猫が人さらいに遭い、後宮で働くことになる',
            release_date: new Date('2023-10-21'),
        },
    });

    const episode50 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 2,
            title: '無愛想な薬師',
            description: '猫猫が後宮で働きながら、薬や毒に関する知識を活かしていく',
            release_date: new Date('2023-10-28'),
        },
    });

    const episode51 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 3,
            title: '幽霊騒ぎ',
            description: '後宮で起こる不可解な出来事について猫猫が調べる',
            release_date: new Date('2023-11-04'),
        },
    });

    const episode52 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 4,
            title: '恫喝',
            description: '後宮での人間関係をめぐる問題に猫猫が巻き込まれる',
            release_date: new Date('2023-11-11'),
        },
    });

    const episode53 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 5,
            title: '暗殺計画',
            description: '皇族をめぐる危険な事件の兆候を猫猫が察知する',
            release_date: new Date('2023-11-18'),
        },
    });

    const episode54 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 6,
            title: '園遊会',
            description: '園遊会が開かれ、猫猫が後宮の女性たちと関わることになる',
            release_date: new Date('2023-11-25'),
        },
    });

    const episode55 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 7,
            title: '里帰り',
            description: '園遊会の後、猫猫が花街での過去や周囲の人物と向き合う',
            release_date: new Date('2023-12-02'),
        },
    });

    const episode56 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 8,
            title: '蜂蜜',
            description: '猫猫が蜂蜜をめぐる問題に関わり、後宮の事情を探る',
            release_date: new Date('2023-12-09'),
        },
    });

    const episode57 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 9,
            title: '自殺か他殺か',
            description: '後宮で起きた事件について猫猫が状況を分析する',
            release_date: new Date('2023-12-16'),
        },
    });

    const episode58 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 10,
            title: '蜂蜜の謎',
            description: '事件の手掛かりをもとに猫猫が隠された事情を探る',
            release_date: new Date('2023-12-23'),
        },
    });

    const episode59 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 11,
            title: '賢者の書',
            description: '後宮に関わる人物たちの思惑が複雑に絡み合っていく',
            release_date: new Date('2024-01-06'),
        },
    });

    const episode60 = await prisma.episode.create({
        data: {
            animeId: anime5.id,
            episode_number: 12,
            title: '宦官',
            description: '猫猫が後宮で起こる新たな問題に関わることになる',
            release_date: new Date('2024-01-13'),
        },
    });


    // 鬼滅の刃のエピソードを作成
    const episode61 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 1,
            title: '残酷',
            description: '炭治郎が家族を鬼に殺され、鬼になった禰豆子を連れて旅立つ',
            release_date: new Date('2019-04-06'),
        },
    });

    const episode62 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 2,
            title: '育手・鱗滝左近次',
            description: '炭治郎が鱗滝のもとを訪れ、鬼殺隊士になるための修行を始める',
            release_date: new Date('2019-04-13'),
        },
    });

    const episode63 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 3,
            title: '錆兎と真菰',
            description: '炭治郎が鱗滝の修行を続け、錆兎と真菰と出会う',
            release_date: new Date('2019-04-20'),
        },
    });

    const episode64 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 4,
            title: '最終選別',
            description: '炭治郎が藤襲山で鬼殺隊士になるための最終選別に挑む',
            release_date: new Date('2019-04-27'),
        },
    });

    const episode65 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 5,
            title: '己の鋼',
            description: '最終選別を生き残った炭治郎が鬼殺隊士として旅を始める',
            release_date: new Date('2019-05-04'),
        },
    });

    const episode66 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 6,
            title: '鬼を連れた剣士',
            description: '炭治郎が初任務で沼の鬼と戦い、禰豆子とともに鬼と戦う',
            release_date: new Date('2019-05-11'),
        },
    });

    const episode67 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 7,
            title: '鬼舞辻無惨',
            description: '炭治郎が浅草で鬼舞辻無惨と遭遇し、鬼の少女と出会う',
            release_date: new Date('2019-05-18'),
        },
    });

    const episode68 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 8,
            title: '幻惑の血の香り',
            description: '炭治郎が珠世と愈史郎に出会い、鬼舞辻無惨について知る',
            release_date: new Date('2019-05-25'),
        },
    });

    const episode69 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 9,
            title: '手毬鬼と矢印鬼',
            description: '炭治郎が珠世の屋敷を襲撃した鬼たちと戦う',
            release_date: new Date('2019-06-01'),
        },
    });

    const episode70 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 10,
            title: 'ずっと一緒にいる',
            description: '炭治郎と禰豆子が手毬鬼との戦いを終え、次の任務へ向かう',
            release_date: new Date('2019-06-08'),
        },
    });

    const episode71 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 11,
            title: '鼓の屋敷',
            description: '炭治郎が鼓の音に支配された屋敷で新たな鬼と遭遇する',
            release_date: new Date('2019-06-15'),
        },
    });

    const episode72 = await prisma.episode.create({
        data: {
            animeId: anime6.id,
            episode_number: 12,
            title: '猪は牙を剥き 善逸は眠る',
            description: '鼓の屋敷で炭治郎たちがそれぞれ鬼との戦いに挑む',
            release_date: new Date('2019-06-22'),
        },
    });

    // 進撃の巨人のエピソードを作成
    const episode73 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 1,
            title: '二千年後の君へ',
            description: '壁の中で暮らすエレンたちの前に超大型巨人が現れ、平穏な日常が崩れ始める',
            release_date: new Date('2013-04-07'),
        },
    });

    const episode74 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 2,
            title: 'その日',
            description: '巨人の襲撃によってシガンシナ区が壊滅し、エレンは母を失う',
            release_date: new Date('2013-04-14'),
        },
    });

    const episode75 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 3,
            title: '絶望の中で鈍く光る',
            description: 'エレンたちが訓練兵団に入り、立体機動装置の訓練を始める',
            release_date: new Date('2013-04-21'),
        },
    });

    const episode76 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 4,
            title: '解散式の夜',
            description: '訓練兵団の訓練を終えたエレンたちが、それぞれの進路を決める',
            release_date: new Date('2013-04-28'),
        },
    });

    const episode77 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 5,
            title: '初陣',
            description: 'トロスト区に巨人が侵入し、エレンたちは初めて実戦に投入される',
            release_date: new Date('2013-05-05'),
        },
    });

    const episode78 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 6,
            title: '少女が見た世界',
            description: 'ミカサの幼少期が描かれ、エレンとの出会いが明らかになる',
            release_date: new Date('2013-05-12'),
        },
    });

    const episode79 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 7,
            title: '小さな刃',
            description: '巨人に追い詰められた兵士たちの前に謎の巨人が現れる',
            release_date: new Date('2013-05-19'),
        },
    });

    const episode80 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 8,
            title: '心臓の鼓動が聞こえる',
            description: 'エレンの生存が判明し、巨人化したエレンの力が明らかになる',
            release_date: new Date('2013-05-26'),
        },
    });

    const episode81 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 9,
            title: '左腕の行方',
            description: '巨人化したエレンを利用してトロスト区奪還作戦が始まる',
            release_date: new Date('2013-06-02'),
        },
    });

    const episode82 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 10,
            title: '応える',
            description: 'エレンの巨人化能力をめぐって兵士たちの間で議論が行われる',
            release_date: new Date('2013-06-09'),
        },
    });

    const episode83 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 11,
            title: '偶像',
            description: 'トロスト区奪還作戦の中で、兵士たちが命を懸けて戦う',
            release_date: new Date('2013-06-16'),
        },
    });

    const episode84 = await prisma.episode.create({
        data: {
            animeId: anime7.id,
            episode_number: 12,
            title: '傷',
            description: 'エレンが巨人化の力を使い、トロスト区奪還のため最後の作戦に挑む',
            release_date: new Date('2013-06-23'),
        },
    });


    // SPY×FAMILYのエピソードを作成
    const episode85 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 1,
            title: 'オペレーション〈梟ストリクス〉',
            description: 'スパイのロイドが任務のためにアーニャを引き取り、偽装家族を作る',
            release_date: new Date('2022-04-09'),
        },
    });

    const episode86 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 2,
            title: '妻役を確保せよ',
            description: 'ロイドが任務のため妻役を探し、ヨルと偽装結婚する',
            release_date: new Date('2022-04-16'),
        },
    });

    const episode87 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 3,
            title: '受験対策をせよ',
            description: 'フォージャー家がイーデン校の面接試験に向けて準備する',
            release_date: new Date('2022-04-23'),
        },
    });

    const episode88 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 4,
            title: '名門校面接試験',
            description: 'アーニャのイーデン校入学をかけてフォージャー家が面接試験に挑む',
            release_date: new Date('2022-04-30'),
        },
    });

    const episode89 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 5,
            title: '合否の行方',
            description: 'イーデン校の合否を待ちながら、フォージャー家が家族としての時間を過ごす',
            release_date: new Date('2022-05-07'),
        },
    });

    const episode90 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 6,
            title: 'ナカヨシ作戦',
            description: 'アーニャがイーデン校に入学し、友達を作るために行動する',
            release_date: new Date('2022-05-14'),
        },
    });

    const episode91 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 7,
            title: '標的の次男',
            description: 'アーニャがダミアンと関わりながら、学校生活を送る',
            release_date: new Date('2022-05-21'),
        },
    });

    const episode92 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 8,
            title: '対秘密警察偽装作戦',
            description: 'ロイドとヨルが互いの正体を隠しながら、家族として行動する',
            release_date: new Date('2022-05-28'),
        },
    });

    const episode93 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 9,
            title: 'ラブラブを見せつけよ',
            description: 'ロイドとヨルが偽装夫婦として周囲に仲の良さを見せようとする',
            release_date: new Date('2022-06-04'),
        },
    });

    const episode94 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 10,
            title: 'ドッジボール大作戦',
            description: 'アーニャたちが学校のドッジボール大会で活躍しようとする',
            release_date: new Date('2022-06-11'),
        },
    });

    const episode95 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 11,
            title: '〈星〉',
            description: 'アーニャが人命救助によって初めてのステラを獲得する',
            release_date: new Date('2022-06-18'),
        },
    });

    const episode96 = await prisma.episode.create({
        data: {
            animeId: anime8.id,
            episode_number: 12,
            title: 'ペンギンパーク',
            description: 'フォージャー家が水族館へ出かけ、ロイドが新たな任務に挑む',
            release_date: new Date('2022-06-25'),
        },
    });


    // 呪術廻戦のエピソードを作成
    const episode97 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 1,
            title: '両面宿儺',
            description: '虎杖悠仁が呪いの危険に巻き込まれ、特級呪物の両面宿儺を取り込む',
            release_date: new Date('2020-10-03'),
        },
    });

    const episode98 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 2,
            title: '自分のために',
            description: '虎杖が東京都立呪術高等専門学校へ入学し、呪術師としての道を歩み始める',
            release_date: new Date('2020-10-10'),
        },
    });

    const episode99 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 3,
            title: '鉄骨娘',
            description: '虎杖と伏黒が釘崎野薔薇と合流し、初めての任務に向かう',
            release_date: new Date('2020-10-17'),
        },
    });

    const episode100 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 4,
            title: '呪胎戴天',
            description: '少年院で発生した呪胎の調査に虎杖たちが向かう',
            release_date: new Date('2020-10-24'),
        },
    });

    const episode101 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 5,
            title: '呪胎戴天－弐－',
            description: '少年院で特級呪霊と戦い、虎杖が宿儺の力と向き合う',
            release_date: new Date('2020-10-31'),
        },
    });

    const episode102 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 6,
            title: '雨後',
            description: '虎杖の生存をめぐって呪術界が動き始め、伏黒たちは訓練を続ける',
            release_date: new Date('2020-11-07'),
        },
    });

    const episode103 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 7,
            title: '急襲',
            description: '五条悟が特級呪霊の漏瑚と戦い、その圧倒的な実力を見せる',
            release_date: new Date('2020-11-14'),
        },
    });

    const episode104 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 8,
            title: '退屈',
            description: '京都校の東堂たちが登場し、虎杖たちとの関係が動き始める',
            release_date: new Date('2020-11-21'),
        },
    });

    const episode105 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 9,
            title: '幼魚と逆罰',
            description: '吉野順平を中心に新たな事件が始まり、真人の存在が浮かび上がる',
            release_date: new Date('2020-11-28'),
        },
    });

    const episode106 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 10,
            title: '無為転変',
            description: '虎杖が順平と関わる中で、真人の術式による事件が起こる',
            release_date: new Date('2020-12-05'),
        },
    });

    const episode107 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 11,
            title: '固陋蠢愚',
            description: '虎杖が真人との戦いに挑み、順平をめぐる事件の真相に迫る',
            release_date: new Date('2020-12-12'),
        },
    });

    const episode108 = await prisma.episode.create({
        data: {
            animeId: anime9.id,
            episode_number: 12,
            title: 'いつかの君へ',
            description: '虎杖が真人と対峙し、順平との出来事を通して呪いの残酷さを知る',
            release_date: new Date('2020-12-19'),
        },
    });

    // 僕のヒーローアカデミアのエピソードを作成
    const episode109 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 1,
            title: '緑谷出久：オリジン',
            description: '無個性の緑谷出久がオールマイトと出会い、ヒーローを目指すきっかけを得る',
            release_date: new Date('2016-04-03'),
        },
    });

    const episode110 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 2,
            title: 'ヒーローの条件',
            description: '出久がオールマイトから個性を受け継ぐための特訓を始める',
            release_date: new Date('2016-04-10'),
        },
    });

    const episode111 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 3,
            title: 'うなれ筋肉',
            description: '出久が雄英高校の入試に向けて身体を鍛え、実技試験に挑む',
            release_date: new Date('2016-04-17'),
        },
    });

    const episode112 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 4,
            title: 'スタートライン',
            description: '雄英高校に入学した出久たちが、ヒーローとしての本格的な学校生活を始める',
            release_date: new Date('2016-04-24'),
        },
    });

    const episode113 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 5,
            title: '今 僕に出来ることを',
            description: '出久たちが個性把握テストに挑み、自分の力と向き合う',
            release_date: new Date('2016-05-01'),
        },
    });

    const episode114 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 6,
            title: '猛れクソナード',
            description: '爆豪が出久に強い敵意を向け、二人の関係が大きく動き始める',
            release_date: new Date('2016-05-08'),
        },
    });

    const episode115 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 7,
            title: 'デクvsかっちゃん',
            description: '出久と爆豪が実戦形式の授業で対決し、それぞれの成長を見せる',
            release_date: new Date('2016-05-15'),
        },
    });

    const episode116 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 8,
            title: 'スタートライン、爆豪の。',
            description: '出久との戦いを終えた爆豪が、自分自身の弱さと向き合う',
            release_date: new Date('2016-05-22'),
        },
    });

    const episode117 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 9,
            title: 'いいぞガンバレ飯田くん！',
            description: '雄英高校の生徒たちがそれぞれの目標を持ってヒーローとして成長していく',
            release_date: new Date('2016-05-29'),
        },
    });

    const episode118 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 10,
            title: '未知との遭遇',
            description: '雄英高校の生徒たちがUSJで救助訓練を行う中、ヴィランが襲撃する',
            release_date: new Date('2016-06-05'),
        },
    });

    const episode119 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 11,
            title: 'ゲームオーバー',
            description: 'USJに侵入したヴィランたちと生徒たちが戦い、オールマイトも現場へ駆けつける',
            release_date: new Date('2016-06-12'),
        },
    });

    const episode120 = await prisma.episode.create({
        data: {
            animeId: anime10.id,
            episode_number: 12,
            title: 'オールマイト',
            description: 'オールマイトが脳無と激突し、出久たちも仲間を守るために戦う',
            release_date: new Date('2016-06-19'),
        },
    });

    // レビューを作成
    // クレヨンしんちゃんのレビューを作成
    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode1.id,
            rating: 4,
            comment: 'しんのすけの自由すぎる行動に笑った。家族とのやり取りも面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode1.id,
            rating: 3,
            comment: 'テンポがよくて見やすかった。しんちゃんのキャラクターが最初から強烈。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode1.id,
            rating: 4,
            comment: '子ども向けだと思っていたけど、大人が見ても普通に笑える内容だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode1.id,
            rating: 1,
            comment: '面白いけれど、しんのすけの行動が自由すぎて少し疲れる部分もあった。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode2.id,
            rating: 3,
            comment: '家族の会話が自然で、日常のくだらない出来事を楽しめる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode2.id,
            rating: 5,
            comment: 'しんちゃんの言動が予想外すぎて何度も笑ってしまった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode2.id,
            rating: 1,
            comment: '前の話よりは普通に感じたけど、気軽に見るにはちょうどいい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode2.id,
            rating: 1,
            comment: '今回はあまり話が動かず、個人的には少し物足りなかった。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode3.id,
            rating: 5,
            comment: 'しんちゃんの発想が面白すぎる。家族との掛け合いも最高だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode3.id,
            rating: 4,
            comment: '短い話の中でもちゃんとオチがあって、最後まで楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode3.id,
            rating: 2,
            comment: 'くだらない話なのに妙に印象に残る。こういう雰囲気が好き。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode4.id,
            rating: 4,
            comment: 'しんちゃんの行動に振り回される周りの人たちまで面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode4.id,
            rating: 1,
            comment: '笑えるところはあったけど、今回は少し展開が単調だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode4.id,
            rating: 2,
            comment: '気楽に見られる回。大きな展開はないけど日常アニメとしては十分楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode4.id,
            rating: 1,
            comment: '今回はあまり笑える場面がなくて、少し退屈に感じた。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode5.id,
            rating: 4,
            comment: 'しんちゃんのいたずらが予想以上で笑った。最後のオチもよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode5.id,
            rating: 3,
            comment: '家族全員の反応がそれぞれ違っていて面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode5.id,
            rating: 1,
            comment: '普通に面白かったけど、特に印象に残る場面は少なかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode5.id,
            rating: 3,
            comment: 'こういう何気ない日常の話が一番しんちゃんらしくて好き。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode6.id,
            rating: 4,
            comment: 'しんちゃんの自由さと周囲の反応の温度差が面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode6.id,
            rating: 4,
            comment: '最初から最後までテンポがよくて、気付いたら見終わっていた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode6.id,
            rating: 1,
            comment: '今回はギャグが自分にはあまり合わなかった。少し騒がしく感じた。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode7.id,
            rating: 5,
            comment: 'しんちゃんの予想外の行動が面白い。何をするか分からないところがいい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode7.id,
            rating: 3,
            comment: '家族とのやり取りがよくて、全体的に楽しく見られた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode7.id,
            rating: 1,
            comment: '悪くはないけど、似たような展開が続いたので少し飽きた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode7.id,
            rating: 4,
            comment: 'くだらないことを全力でやっている感じが最高。かなり笑った。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode8.id,
            rating: 3,
            comment: '日常の小さな出来事をここまで面白くできるのがすごい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode8.id,
            rating: 1,
            comment: '今回は普通くらい。笑えるところはあったけど少し弱かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode8.id,
            rating: 5,
            comment: 'しんちゃんと家族のやり取りが特によかった。何回見ても笑えそう。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode9.id,
            rating: 3,
            comment: 'テンポのいいギャグが続いていてかなり楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode9.id,
            rating: 2,
            comment: 'キャラクター同士の会話が面白い。短い時間でも満足感がある。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode9.id,
            rating: 2,
            comment: '面白い部分はあるけど、個人的には少し普通の回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode9.id,
            rating: 1,
            comment: '今回はギャグがあまり刺さらなかった。オチも弱く感じた。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode10.id,
            rating: 4,
            comment: 'しんちゃんの自由な発想が面白くて、最後まで飽きずに見られた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode10.id,
            rating: 3,
            comment: '家族の日常を題材にしているのに、ちゃんと笑える話になっている。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode10.id,
            rating: 2,
            comment: '悪くないけど、もう少し大きなオチがあってもよかったと思う。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode10.id,
            rating: 4,
            comment: '何も考えずに見られるのがいい。こういう回は気分転換になる。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode11.id,
            rating: 3,
            comment: 'しんちゃんの言葉がいちいち面白くて、今回も楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode11.id,
            rating: 4,
            comment: 'キャラクターの個性がしっかり出ていて面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode11.id,
            rating: 1,
            comment: '話の流れが少し分かりにくくて、今回はあまり楽しめなかった。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode12.id,
            rating: 4,
            comment: '最後の展開が面白かった。しんちゃんらしいオチでよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode12.id,
            rating: 3,
            comment: '家族のやり取りが楽しくて、最後まで気軽に見られた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode12.id,
            rating: 2,
            comment: 'それなりに面白かったけど、もう少し印象に残る内容がほしかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode12.id,
            rating: 4,
            comment: 'くだらないのに笑ってしまう。この作品の良さが出ている回だった。',
        },
    });

    // 名探偵コナンのレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode13.id,
            rating: 5,
            comment: '事件の謎が少しずつ明らかになっていく展開が面白かった。最後まで引き込まれた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode13.id,
            rating: 4,
            comment: 'コナンが状況を整理していくところがよかった。推理ものとして楽しめる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode13.id,
            rating: 3,
            comment: '事件自体は面白かったけど、少し展開が早く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode13.id,
            rating: 5,
            comment: '犯人が分かるまでの流れがうまくて、最後まで犯人を予想しながら見られた。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode14.id,
            rating: 4,
            comment: '細かいところに事件を解くためのヒントが隠されていて面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode14.id,
            rating: 5,
            comment: 'コナンの推理が鮮やかで気持ちよかった。最後の種明かしも納得できた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode14.id,
            rating: 3,
            comment: '謎解きはよかったけど、犯人の動機には少し納得しにくい部分があった。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode15.id,
            rating: 5,
            comment: '事件の状況が複雑で、自分でも推理しながら見るのが楽しかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode15.id,
            rating: 3,
            comment: 'コナンが証拠を見つけていく過程が面白い。推理の説明も分かりやすかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode15.id,
            rating: 2,
            comment: '事件は面白かったけど、今回は犯人が途中で分かってしまって少し物足りなかった。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode16.id,
            rating: 4,
            comment: '事件の仕掛けがよく考えられていて面白かった。最後の推理も納得できる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode16.id,
            rating: 3,
            comment: '怪しい人物が何人も出てくるので、誰が犯人なのか考えながら楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode16.id,
            rating: 3,
            comment: '推理部分はよかったけど、事件が解決するまでが少し長く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode16.id,
            rating: 5,
            comment: '証拠がつながっていくところが気持ちいい。コナンらしい推理回だった。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode17.id,
            rating: 4,
            comment: '最初は普通の事件に見えたけど、後半で印象が変わって面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode17.id,
            rating: 5,
            comment: '犯人につながる伏線がきちんと用意されていて、見終わった後に納得できた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode17.id,
            rating: 3,
            comment: '悪くはないけど、今回は少し地味な事件だったと思う。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode18.id,
            rating: 5,
            comment: '事件の真相が分かった瞬間にそれまでの場面がつながって面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode18.id,
            rating: 4,
            comment: 'コナンが小さな違和感から事件を解いていくところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode18.id,
            rating: 2,
            comment: '今回は推理よりも会話が多くて、少しテンポが遅く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode18.id,
            rating: 4,
            comment: '犯人を考えながら見られるので楽しかった。最後の説明も分かりやすい。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode19.id,
            rating: 4,
            comment: '事件の雰囲気が少し怖くて、いつもの事件とは違う緊張感があった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode19.id,
            rating: 4,
            comment: '怪しい人物が多くて、最後まで犯人を絞り込めなかったのが面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode19.id,
            rating: 3,
            comment: '雰囲気はよかったけど、結末は少し予想しやすかった。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode20.id,
            rating: 3,
            comment: '事件の謎が一つずつ解けていく感じがよかった。推理を楽しめる回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode20.id,
            rating: 4,
            comment: '犯人のトリックが面白かった。自分では全然気付けなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode20.id,
            rating: 3,
            comment: '謎解きは面白かったけど、少し説明が多く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode20.id,
            rating: 4,
            comment: '証拠をもとに犯人を追い詰めていくところがよかった。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode21.id,
            rating: 4,
            comment: '最初から事件が起きるまでの流れが自然で、すぐに物語へ入り込めた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode21.id,
            rating: 4,
            comment: '登場人物の中に怪しい人が何人もいて、犯人を予想するのが楽しかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode21.id,
            rating: 1,
            comment: '今回は推理の決め手が分かりにくくて、少し置いていかれた感じがした。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode22.id,
            rating: 5,
            comment: '事件の真相にたどり着くまでの推理が面白かった。最後まで集中して見られた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode22.id,
            rating: 4,
            comment: '細かい証拠を拾っていくところがコナンらしくてよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode22.id,
            rating: 3,
            comment: '話としてはまとまっているけど、もう少し意外性がほしかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode22.id,
            rating: 5,
            comment: '犯人のトリックが分かったときに納得できた。かなり好きなタイプの事件。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode23.id,
            rating: 3,
            comment: '事件の状況が複雑だったけど、コナンの説明で整理されていくのがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode23.id,
            rating: 5,
            comment: '最後の推理が鮮やかだった。途中の何気ない場面にも意味があったのが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode23.id,
            rating: 2,
            comment: '事件の内容は悪くないけど、今回は少し展開が遅く感じた。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode24.id,
            rating: 4,
            comment: '最後まで犯人が分からなくて楽しめた。真相が明らかになる場面もよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode24.id,
            rating: 4,
            comment: '伏線の回収がきれいで、事件が終わった後にもう一度見たくなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode24.id,
            rating: 3,
            comment: '推理は面白かったけど、犯人の動機には少し弱さを感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode24.id,
            rating: 5,
            comment: '謎解きだけでなく登場人物のやり取りも楽しめて、満足できる回だった。',
        },
    });
    
    // ONE PIECEのレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode25.id,
            rating: 5,
            comment: 'ルフィが海賊王を目指す理由がしっかり伝わってきて、最初から引き込まれた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode25.id,
            rating: 4,
            comment: '海賊の世界観が分かりやすくて面白い。ルフィの性格もかなり好き。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode25.id,
            rating: 3,
            comment: '面白いけど、序盤は少しゆっくり進む印象だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode25.id,
            rating: 5,
            comment: 'ルフィの自由さと行動力が見ていて気持ちいい。これからの冒険が楽しみ。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode26.id,
            rating: 5,
            comment: 'ゾロが登場してから一気に面白くなった。二人の関係も今後が気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode26.id,
            rating: 4,
            comment: 'ゾロのキャラクターがかっこよくて印象に残った。戦闘も見応えがある。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode26.id,
            rating: 3,
            comment: '話は面白いけど、もう少し戦闘シーンをじっくり見たかった。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode27.id,
            rating: 4,
            comment: 'ルフィとゾロが少しずつ仲間らしくなっていくところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode27.id,
            rating: 5,
            comment: '戦い方がそれぞれ違っていて面白い。ルフィの無茶な行動も笑えた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode27.id,
            rating: 2,
            comment: '戦闘は悪くないけど、少し単純な展開に感じてしまった。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode28.id,
            rating: 5,
            comment: '敵との対決が熱くてよかった。ルフィの負けず嫌いなところも好き。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode28.id,
            rating: 4,
            comment: '戦闘だけでなく仲間同士のやり取りもあって、楽しく見られた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode28.id,
            rating: 3,
            comment: '盛り上がる場面はあったけど、もう少し意外な展開がほしかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode28.id,
            rating: 5,
            comment: '最後の戦いがかなり熱かった。ルフィの行動力がすごい。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode29.id,
            rating: 5,
            comment: '新しい場所へ進んでいく感じが冒険ものらしくてワクワクした。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode29.id,
            rating: 4,
            comment: '登場人物が増えてきて、世界が少しずつ広がっていくのが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode29.id,
            rating: 3,
            comment: '悪くないけど、今回は話が少し進んだだけという印象だった。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode30.id,
            rating: 5,
            comment: '敵とのやり取りが面白くて、ルフィたちの強さも感じられた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode30.id,
            rating: 4,
            comment: '仲間を大切にするルフィの考え方がよく分かる回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode30.id,
            rating: 2,
            comment: '話の進み方が少し遅く感じた。今回はそこまで印象に残らなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode30.id,
            rating: 5,
            comment: '戦闘と会話のバランスがよくて、最後まで楽しめた。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode31.id,
            rating: 5,
            comment: '敵との対立がはっきりしてきて、物語が一気に面白くなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode31.id,
            rating: 4,
            comment: 'ルフィの考え方がシンプルだけどかっこいい。仲間を守る姿勢もよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode31.id,
            rating: 3,
            comment: '展開は分かりやすかったけど、少し先が読める部分もあった。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode32.id,
            rating: 5,
            comment: '戦闘シーンが熱くて一気に見てしまった。キャラクターの動きもよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode32.id,
            rating: 5,
            comment: '仲間との連携が出てきて、パーティーらしくなってきたのが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode32.id,
            rating: 4,
            comment: '戦闘はよかったけど、少し長く感じるところがあった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode32.id,
            rating: 5,
            comment: '最後の盛り上がりがよかった。続きがかなり気になる。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode33.id,
            rating: 5,
            comment: '新しいキャラクターの考え方が分かってきて、さらに面白くなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode33.id,
            rating: 5,
            comment: 'ルフィの行動が予想できないからこそ面白い。今回も最後まで楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode33.id,
            rating: 2,
            comment: '今回は説明が多くて、戦闘や冒険の場面が少なく感じた。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode34.id,
            rating: 5,
            comment: '敵との戦いがかなり熱かった。ルフィの諦めないところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode34.id,
            rating: 5,
            comment: '戦闘の流れが分かりやすくて見やすかった。最後の展開もよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode34.id,
            rating: 3,
            comment: '面白かったけど、戦闘が少し単調に感じる部分もあった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode34.id,
            rating: 5,
            comment: '仲間を守るために戦うところが熱い。見ていて応援したくなった。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode35.id,
            rating: 4,
            comment: '冒険の目的が少しずつ見えてきて、これからの展開が楽しみになった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode35.id,
            rating: 4,
            comment: 'キャラクター同士の掛け合いが面白い。シリアスな場面との切り替えもよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode35.id,
            rating: 2,
            comment: '今回は話があまり進まなくて、少し物足りなかった。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode36.id,
            rating: 5,
            comment: '最後の展開が熱くてよかった。次の話をすぐ見たくなる終わり方だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode36.id,
            rating: 5,
            comment: 'ここまでの話がまとまってきて、冒険の続きがさらに気になった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode36.id,
            rating: 4,
            comment: '盛り上がるところはあったけど、もう少し戦闘を見たかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode36.id,
            rating: 5,
            comment: '仲間との関係が深まっていくのがよかった。最後まで楽しく見られた。',
        },
    });

    // HUNTER×HUNTERのレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode37.id,
            rating: 5,
            comment: 'ゴンがハンターを目指す理由がしっかり伝わってきて、最初から応援したくなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode37.id,
            rating: 5,
            comment: '冒険が始まる感じがしてワクワクした。ゴンのまっすぐな性格もよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode37.id,
            rating: 4,
            comment: '世界観は面白そうだけど、今回は設定の説明が少し多く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode37.id,
            rating: 5,
            comment: 'ゴンの行動力がすごい。これからどんな仲間と出会うのか楽しみになった。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode38.id,
            rating: 5,
            comment: '試験に向かうまでの雰囲気がよかった。いよいよ冒険が始まる感じがする。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode38.id,
            rating: 5,
            comment: 'ゴン以外の受験者も個性的で、これからの人間関係が気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode38.id,
            rating: 3,
            comment: '今回は移動や説明が中心で、少し展開が遅く感じてしまった。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode39.id,
            rating: 5,
            comment: '試験の厳しさが少しずつ分かってきて面白い。ゴンの判断力もよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode39.id,
            rating: 5,
            comment: 'ただ強いだけじゃなくて、状況を見て行動するゴンがかっこよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode39.id,
            rating: 3,
            comment: '面白いけど、試験のルールが少し分かりにくかった。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode40.id,
            rating: 5,
            comment: 'クラピカやレオリオとの関係が見えてきて、仲間が増えていく感じがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode40.id,
            rating: 5,
            comment: 'それぞれ違う目的を持っているのが面白い。キャラクターに興味が出てきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode40.id,
            rating: 3,
            comment: 'キャラクターはいいけど、今回は少し会話が多くてテンポが遅く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode40.id,
            rating: 5,
            comment: 'ゴンたちが少しずつ仲間になっていく過程が好き。今後のチーム感に期待したい。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode41.id,
            rating: 5,
            comment: '試験の内容がかなり過酷で、見ている側まで緊張する展開だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode41.id,
            rating: 4,
            comment: 'ゴンの身体能力がすごい。普通なら無理そうなことを簡単にやるのが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode41.id,
            rating: 3,
            comment: '展開は悪くないけど、試験が続いて少し単調に感じてきた。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode42.id,
            rating: 5,
            comment: 'それぞれの受験者の考え方が違っていて、単純な力勝負じゃないところが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode42.id,
            rating: 5,
            comment: 'ゴンが相手をよく見て行動するところがよかった。頭を使った展開が好き。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode42.id,
            rating: 3,
            comment: '面白い場面はあったけど、今回は少し説明が多く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode42.id,
            rating: 4,
            comment: '試験の緊張感があってよかった。誰が残るのか気になる。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode43.id,
            rating: 5,
            comment: 'キルアの存在感が強くて一気に興味が出た。ゴンとの関係も気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode43.id,
            rating: 4,
            comment: 'キャラクター同士のやり取りが面白い。試験だけでなく人間関係も楽しめる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode43.id,
            rating: 4,
            comment: '面白いけど、今回は少し話が進むのが遅かったように感じた。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode44.id,
            rating: 5,
            comment: 'ゴンとキルアのやり取りがかなり好き。二人の性格の違いも面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode44.id,
            rating: 5,
            comment: '試験の緊張感が続いていて、最後までどうなるのか気になった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode44.id,
            rating: 4,
            comment: 'キャラクターは魅力的だけど、もう少し戦闘を見たかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode44.id,
            rating: 5,
            comment: 'それぞれの能力や個性が見えてきて、かなり面白くなってきた。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode45.id,
            rating: 5,
            comment: 'ゴンたちの判断力が試される展開で、見ていてハラハラした。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode45.id,
            rating: 5,
            comment: '単純な力ではなく頭を使って突破するところが、この作品らしくてよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode45.id,
            rating: 3,
            comment: '展開が少し分かりにくくて、今回はあまり入り込めなかった。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode46.id,
            rating: 5,
            comment: '試験の中でそれぞれの強さが見えてきて、かなり面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode46.id,
            rating: 5,
            comment: '仲間との協力がよかった。ゴンだけではなく周りのキャラクターも活躍している。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode46.id,
            rating: 3,
            comment: '内容は面白いけど、試験が長く続いて少し疲れてきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode46.id,
            rating: 5,
            comment: '最後の展開が熱かった。次の試験がどうなるのかかなり気になる。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode47.id,
            rating: 5,
            comment: 'ゴンたちの関係がさらに深まってきて、仲間としてのまとまりが出てきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode47.id,
            rating: 5,
            comment: 'キルアの強さが印象的だった。普段とのギャップも含めて面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode47.id,
            rating: 3,
            comment: 'キャラクターはいいけど、今回は話があまり進まなかったのが残念。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode48.id,
            rating: 5,
            comment: '試験の一区切りとしてかなり面白かった。ここまで見てきて続きが楽しみになった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode48.id,
            rating: 5,
            comment: 'ゴンたちが成長しているのが感じられてよかった。仲間との関係も好き。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode48.id,
            rating: 3,
            comment: '盛り上がる場面はあったけど、もう少し派手な展開があってもよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode48.id,
            rating: 5,
            comment: 'キャラクターそれぞれの魅力が出ていて、次の展開への期待が高まった。',
        },
    });

    // 薬屋のひとりごとのレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode49.id,
            rating: 5,
            comment: '猫猫の観察力が鋭くて面白い。後宮という舞台設定も独特で引き込まれた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode49.id,
            rating: 4,
            comment: '薬の知識を使って問題を解決していく展開が新鮮だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode49.id,
            rating: 3,
            comment: '雰囲気は好きだけど、最初は登場人物が多くて少し分かりにくかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode49.id,
            rating: 5,
            comment: '猫猫の淡々とした態度と周囲との温度差が面白い。続きが気になる。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode50.id,
            rating: 4,
            comment: '小さな違和感から問題を見抜いていくところが面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode50.id,
            rating: 5,
            comment: '猫猫が自分から目立とうとしないのに事件を解決してしまうところが好き。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode50.id,
            rating: 2,
            comment: '謎解きは面白いけど、今回は説明が少し多くてテンポが遅く感じた。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode51.id,
            rating: 5,
            comment: '薬の知識が事件解決につながる流れが面白い。猫猫の推理も納得できた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode51.id,
            rating: 4,
            comment: '後宮の人間関係が少しずつ見えてきて、物語に深みが出てきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode51.id,
            rating: 3,
            comment: '話は面白かったけど、事件の内容が少し地味に感じた。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode52.id,
            rating: 5,
            comment: '猫猫が証拠を見つけていく過程が面白い。知識をひけらかさないところもいい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode52.id,
            rating: 5,
            comment: '事件の背景が分かってくるにつれて面白くなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode52.id,
            rating: 3,
            comment: '悪くないけど、もう少し意外な展開があるとよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode52.id,
            rating: 5,
            comment: '猫猫の冷静な判断がかっこよかった。最後の真相にも納得できた。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode53.id,
            rating: 5,
            comment: '事件の謎が少しずつつながっていく感じがよかった。続きが気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode53.id,
            rating: 5,
            comment: '猫猫の薬師としての知識がしっかり活かされていて面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode53.id,
            rating: 2,
            comment: '今回は話の展開が遅く感じて、少し退屈だった。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode54.id,
            rating: 5,
            comment: '人の行動から薬の影響を考えていくところが面白い。推理ものとして楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode54.id,
            rating: 5,
            comment: '猫猫の知識が事件を解く鍵になるのが気持ちいい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode54.id,
            rating: 3,
            comment: '内容は面白いけど、少し話が難しくて一度では理解しにくかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode54.id,
            rating: 5,
            comment: '真相に近づいていく緊張感がよかった。最後まで集中して見られた。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode55.id,
            rating: 5,
            comment: '猫猫が周囲の人たちを観察しているだけでも面白い。細かい伏線も気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode55.id,
            rating: 4,
            comment: '後宮の複雑な人間関係が見えてきて、事件以外の部分も楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode55.id,
            rating: 3,
            comment: '雰囲気は好きだけど、今回は少し動きが少なかった。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode56.id,
            rating: 5,
            comment: '猫猫が自分の知識を使って問題を解決するところが相変わらず面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode56.id,
            rating: 5,
            comment: '謎の答えが分かったときに、それまでの出来事がつながる感じがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode56.id,
            rating: 2,
            comment: '今回は話が少し分かりにくかった。もう少し説明がほしかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode56.id,
            rating: 5,
            comment: '後宮ならではの問題を扱っていて、この作品らしさが出ていた。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode57.id,
            rating: 5,
            comment: '事件の背景にある人間関係が分かってくるのが面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode57.id,
            rating: 5,
            comment: '猫猫の推理が鋭くて気持ちいい。何気ない情報から答えを出すのがすごい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode57.id,
            rating: 4,
            comment: '推理は面白いけど、今回は少し地味な印象だった。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode58.id,
            rating: 5,
            comment: '事件の真相が明らかになっていく展開が面白かった。伏線もきれいにつながった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode58.id,
            rating: 5,
            comment: '猫猫の知識と観察力がしっかり活かされていて満足できた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode58.id,
            rating: 4,
            comment: '面白かったけど、事件の内容が少し重たく感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode58.id,
            rating: 5,
            comment: '最後の推理がよかった。猫猫が事件を解いていく過程をもっと見たくなった。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode59.id,
            rating: 5,
            comment: '猫猫と周囲の人物との距離感が少しずつ変わってきているのが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode59.id,
            rating: 5,
            comment: '事件だけでなくキャラクター同士のやり取りも楽しめるようになってきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode59.id,
            rating: 3,
            comment: '今回は個人的にあまり盛り上がらなかった。展開が少し遅く感じた。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode60.id,
            rating: 5,
            comment: '最後まで見て、これまでの出来事がつながっていく感じがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode60.id,
            rating: 5,
            comment: '猫猫の推理力がしっかり活かされていて、最後まで楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode60.id,
            rating: 4,
            comment: '話はまとまっていたけど、もう少し大きな展開がほしかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode60.id,
            rating: 5,
            comment: '後宮という特殊な舞台を活かした事件が面白い。続きも見たくなった。',
        },
    });

    // 鬼滅の刃のレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode61.id,
            rating: 5,
            comment: '炭治郎と家族の穏やかな日常から一気に状況が変わる展開が衝撃的だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode61.id,
            rating: 4,
            comment: '炭治郎の優しさが最初から伝わってきた。家族との場面が特に印象に残った。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode61.id,
            rating: 3,
            comment: '暗い展開だけど、これからどうなるのか気になる始まり方だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode61.id,
            rating: 5,
            comment: '冒頭から引き込まれた。炭治郎が妹を守ろうとする姿がよかった。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode62.id,
            rating: 5,
            comment: '炭治郎が妹を人間に戻すために動き始めるところが熱かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode62.id,
            rating: 4,
            comment: '鬼との戦いに緊張感があって面白い。炭治郎の成長も楽しみ。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode62.id,
            rating: 2,
            comment: '話は分かりやすいけど、展開が少し急でついていきにくかった。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode63.id,
            rating: 4,
            comment: '修行の厳しさが伝わってきた。炭治郎が少しずつ強くなっていくのがいい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode63.id,
            rating: 5,
            comment: '炭治郎の努力がしっかり描かれていて、応援したくなる回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode63.id,
            rating: 3,
            comment: '修行の場面はよかったけど、少し展開がゆっくりに感じた。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode64.id,
            rating: 5,
            comment: '炭治郎が自分の弱さと向き合うところがよかった。戦闘への流れも熱い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode64.id,
            rating: 4,
            comment: '修行の成果が少しずつ見えてきて面白い。戦い方にも工夫がある。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode64.id,
            rating: 3,
            comment: '面白いけど、今回は少し説明が多くてテンポが遅く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode64.id,
            rating: 5,
            comment: '炭治郎の成長が感じられてよかった。努力が無駄になっていないのがいい。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode65.id,
            rating: 5,
            comment: '最終選別の緊張感がすごかった。敵がいつ現れるか分からない怖さがある。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode65.id,
            rating: 4,
            comment: '戦闘シーンがかっこよくて見応えがあった。炭治郎の判断力もよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode65.id,
            rating: 2,
            comment: '戦闘はよかったけど、少し同じような場面が続いて長く感じた。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode66.id,
            rating: 5,
            comment: '敵との戦いがかなり迫力があった。炭治郎の覚悟も伝わってきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode66.id,
            rating: 4,
            comment: '鬼との戦いだけでなく、炭治郎が何を守りたいのかも描かれていてよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode66.id,
            rating: 3,
            comment: '面白いけど、敵の能力が少し複雑で理解するのに時間がかかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode66.id,
            rating: 5,
            comment: '戦闘の演出がすごくて一気に見てしまった。最後まで緊張感があった。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode67.id,
            rating: 4,
            comment: '鬼殺隊としての生活が少しずつ始まって、世界観が広がってきた感じがする。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode67.id,
            rating: 5,
            comment: '炭治郎が新しい環境で動き始めるところが面白い。次の任務も楽しみ。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode67.id,
            rating: 3,
            comment: '話は進んだけど、今回は少し地味な回だった。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode68.id,
            rating: 5,
            comment: '新しい任務に入ってから一気に緊張感が出てきた。続きが気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode68.id,
            rating: 4,
            comment: '炭治郎の戦い方が少しずつ形になってきていて、成長を感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode68.id,
            rating: 3,
            comment: '雰囲気はよかったけど、今回は少し展開が読めてしまった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode68.id,
            rating: 5,
            comment: '戦闘とストーリーのバランスがよくて、かなり楽しめた。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode69.id,
            rating: 5,
            comment: '鬼の存在が怖く描かれていて、戦闘シーンにもかなり緊張感があった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode69.id,
            rating: 4,
            comment: '炭治郎が状況を考えながら戦っているのがよかった。ただ強いだけではないのが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode69.id,
            rating: 2,
            comment: '戦闘は迫力があるけど、今回は少し長く感じてしまった。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode70.id,
            rating: 5,
            comment: '炭治郎の戦い方に工夫があって面白かった。最後の展開も熱い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode70.id,
            rating: 4,
            comment: '敵との戦いが激しくなってきて、最後まで目が離せなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode70.id,
            rating: 3,
            comment: '迫力はあったけど、少し戦闘が続きすぎて疲れる部分もあった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode70.id,
            rating: 5,
            comment: '追い詰められてからの展開がすごくよかった。炭治郎を応援したくなる。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode71.id,
            rating: 4,
            comment: '戦いの中でも炭治郎の優しさが出ていて、このキャラクターが好きになった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode71.id,
            rating: 5,
            comment: '鬼にもそれぞれ事情があることが感じられて、単純な善悪ではないところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode71.id,
            rating: 2,
            comment: 'シリアスな雰囲気はいいけど、今回は少し重たく感じた。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode72.id,
            rating: 5,
            comment: 'ここまでの流れをしっかりまとめつつ、次の展開にも期待できる終わり方だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode72.id,
            rating: 4,
            comment: '炭治郎と禰豆子の関係がよく描かれていて、二人を応援したくなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode72.id,
            rating: 3,
            comment: '面白かったけど、もう少し大きな戦闘が見たかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode72.id,
            rating: 5,
            comment: 'キャラクターの成長が感じられてよかった。続きがかなり気になる。',
        },
    });

    // 進撃の巨人のレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode73.id,
            rating: 5,
            comment: '最初から世界観に引き込まれた。巨人の存在が怖くて緊張感がすごい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode73.id,
            rating: 5,
            comment: 'エレンたちが置かれている状況が分かりやすくて、続きが気になった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode73.id,
            rating: 4,
            comment: 'かなり重い話だけど、これからどうなるのか気になる始まり方だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode73.id,
            rating: 5,
            comment: '平和だった日常が一瞬で壊れる展開が衝撃的だった。かなり引き込まれた。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode74.id,
            rating: 5,
            comment: 'エレンの怒りと絶望が伝わってきて、見ていて苦しくなるくらいだった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode74.id,
            rating: 5,
            comment: '巨人の恐ろしさがよく描かれていて、緊張感のある回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode74.id,
            rating: 2,
            comment: '展開がかなり重くて、見ていて少し疲れてしまった。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode75.id,
            rating: 5,
            comment: '訓練兵としての生活が始まって、登場人物それぞれの個性が見えてきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode75.id,
            rating: 5,
            comment: 'エレンたちが訓練に取り組む姿がよかった。同期のキャラクターにも興味が出た。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode75.id,
            rating: 4,
            comment: 'キャラクター紹介としてはよかったけど、今回は少し話の進みが遅いと感じた。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode76.id,
            rating: 5,
            comment: '訓練の中でそれぞれの強さや弱さが見えてきて面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode76.id,
            rating: 5,
            comment: '立体機動の訓練が印象的だった。エレンが努力しているのもよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode76.id,
            rating: 4,
            comment: '設定は面白いけど、訓練の話が少し長く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode76.id,
            rating: 5,
            comment: '同期の関係性が見えてきて面白い。これから誰が活躍するのか楽しみ。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode77.id,
            rating: 5,
            comment: '巨人との戦闘が始まって一気に緊張感が上がった。エレンの行動も熱かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode77.id,
            rating: 5,
            comment: '立体機動を使った戦闘が迫力あってよかった。状況がかなり危険なのも伝わる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode77.id,
            rating: 4,
            comment: '戦闘は迫力があるけど、状況が混乱していて少し分かりにくかった。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode78.id,
            rating: 5,
            comment: '仲間を守ろうとする姿が印象的だった。緊迫した展開で目が離せなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode78.id,
            rating: 5,
            comment: 'キャラクターそれぞれの判断が違っていて、戦場の怖さがよく出ていた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode78.id,
            rating: 4,
            comment: '面白いけど、あまりにも展開が重くて見ていてつらかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode78.id,
            rating: 5,
            comment: '極限状態でも仲間を助けようとするところがよかった。かなり緊張した。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode79.id,
            rating: 5,
            comment: '巨人との戦い方が少しずつ分かってきて、戦闘シーンがかなり面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode79.id,
            rating: 5,
            comment: 'キャラクターたちがそれぞれの判断で動いているのがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode79.id,
            rating: 4,
            comment: '緊張感はあるけど、戦闘が続いて少し疲れるところもあった。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode80.id,
            rating: 5,
            comment: 'ここで状況が大きく動いて驚いた。続きが気になって仕方ない。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode80.id,
            rating: 5,
            comment: '今までの謎に少しずつ答えが出てきて、さらに面白くなってきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode80.id,
            rating: 3,
            comment: '展開が急すぎて、少し理解が追いつかなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode80.id,
            rating: 5,
            comment: '予想していなかった展開で驚いた。ここからの物語がかなり気になる。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode81.id,
            rating: 5,
            comment: '登場人物の考え方が少しずつ見えてきて、単なる巨人との戦いではないところが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode81.id,
            rating: 5,
            comment: '謎が増えていく一方で少しずつ答えも見えてきて、かなり引き込まれた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode81.id,
            rating: 4,
            comment: '話は面白いけど、設定が複雑になってきて少し分かりにくい部分があった。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode82.id,
            rating: 5,
            comment: '戦闘と謎解きの両方があって面白かった。最後まで緊張感が続いた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode82.id,
            rating: 5,
            comment: 'キャラクターの判断が重要になる展開で、誰を信じるか考えながら見られた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode82.id,
            rating: 4,
            comment: '展開は面白いけど、少し説明が足りないように感じるところがあった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode82.id,
            rating: 5,
            comment: '予想外の方向に話が進んで面白かった。次の話がすぐ見たくなる。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode83.id,
            rating: 5,
            comment: 'これまでの出来事が少しずつつながってきて、物語の大きさを感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode83.id,
            rating: 5,
            comment: '登場人物それぞれの覚悟が伝わってきてよかった。かなり重いけど見応えがある。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode83.id,
            rating: 3,
            comment: '話が複雑になりすぎて、今回は少し置いていかれた感じがした。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode84.id,
            rating: 5,
            comment: 'ここまでの話を見たからこそ刺さる展開だった。続きが本当に気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode84.id,
            rating: 5,
            comment: 'キャラクターたちがそれぞれの立場で動いていて、物語に厚みが出ている。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode84.id,
            rating: 4,
            comment: '内容は濃いけど、かなり重い話なので気軽には見られなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode84.id,
            rating: 5,
            comment: '謎がさらに深まって、ここからどうなるのか全く予想できないのが面白い。',
        },
    });

    // SPY×FAMILYのレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode85.id,
            rating: 5,
            comment: 'スパイと殺し屋と超能力者が家族になる設定が面白い。テンポもよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode85.id,
            rating: 4,
            comment: 'それぞれが秘密を抱えているのに普通の家族として生活しているのが面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode85.id,
            rating: 3,
            comment: '設定は面白いけど、最初は少し展開が急に感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode85.id,
            rating: 5,
            comment: 'アーニャの反応がかわいくて、重い設定なのに楽しく見られた。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode86.id,
            rating: 5,
            comment: 'ヨルの戦闘能力が想像以上で驚いた。家族とのギャップも面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode86.id,
            rating: 4,
            comment: 'それぞれの正体を知らないまま家族が成立しているところが楽しい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode86.id,
            rating: 3,
            comment: '面白いけど、ヨルの行動が少し現実離れしすぎていると感じた。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode87.id,
            rating: 4,
            comment: '家族として少しずつ距離が近づいていく感じがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode87.id,
            rating: 5,
            comment: 'アーニャの表情が面白くて何度も笑った。気軽に見られる回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode87.id,
            rating: 3,
            comment: 'コメディ中心で楽しいけど、今回は少し話の進みが遅く感じた。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode88.id,
            rating: 5,
            comment: 'アーニャが頑張っている姿がかわいかった。家族のやり取りも面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode88.id,
            rating: 4,
            comment: 'ロイドが完璧に見えて意外と苦労しているところが面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode88.id,
            rating: 4,
            comment: '面白いけど、コメディが中心なので好みは分かれそうだと思った。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode88.id,
            rating: 5,
            comment: '家族それぞれの勘違いがうまく噛み合っていて笑えた。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode89.id,
            rating: 5,
            comment: 'アーニャとロイドのやり取りが特に面白かった。二人の関係が好き。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode89.id,
            rating: 4,
            comment: 'テンポがよくて見やすかった。短い話でもしっかり楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode89.id,
            rating: 2,
            comment: '今回は少しギャグが多すぎて、個人的にはあまりハマらなかった。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode90.id,
            rating: 5,
            comment: '学校でのアーニャの行動が面白かった。周りのキャラクターも魅力的。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode90.id,
            rating: 4,
            comment: 'アーニャが一生懸命なのが伝わってきて応援したくなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode90.id,
            rating: 3,
            comment: '楽しい回だったけど、もう少しストーリーが進んでほしいとも感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode90.id,
            rating: 5,
            comment: '学校での人間関係が少しずつ広がっていて面白い。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode91.id,
            rating: 5,
            comment: 'アーニャの頑張りがかわいくてよかった。周囲とのやり取りも面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode91.id,
            rating: 4,
            comment: '家族だけではなく学校のキャラクターも増えて、さらに楽しくなってきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode91.id,
            rating: 3,
            comment: 'キャラクターは好きだけど、今回は少し話が単調に感じた。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode92.id,
            rating: 5,
            comment: 'ロイドのスパイとしての能力と父親としての行動の差が面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode92.id,
            rating: 5,
            comment: 'アーニャの超能力が話を動かしているところが面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode92.id,
            rating: 3,
            comment: '今回は少しギャグの展開が読めてしまって、そこまで楽しめなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode92.id,
            rating: 4,
            comment: '家族全員の秘密がうまく絡んでいて、この作品らしい展開だった。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode93.id,
            rating: 5,
            comment: 'ヨルの天然なところが面白かった。普段とのギャップが魅力的。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode93.id,
            rating: 4,
            comment: '家族のために頑張る姿が見られて、コメディだけではない良さを感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode93.id,
            rating: 3,
            comment: '面白い部分は多かったけど、少し話が散らかっているように感じた。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode94.id,
            rating: 5,
            comment: 'アーニャと周囲のキャラクターとの関係が面白くて楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode94.id,
            rating: 5,
            comment: 'キャラクター同士の勘違いがうまく重なっていて笑えた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode94.id,
            rating: 3,
            comment: 'ギャグ中心なのはいいけど、今回は少し笑いどころが少なかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode94.id,
            rating: 5,
            comment: 'テンポがよくて最後まで飽きずに見られた。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode95.id,
            rating: 5,
            comment: '家族としての絆が少しずつできているのが感じられてよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode95.id,
            rating: 4,
            comment: 'ロイドとヨルの関係が少しずつ変わっている感じがして面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode95.id,
            rating: 4,
            comment: '楽しいけど、もう少し大きな事件が起きてもよかったと思う。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode96.id,
            rating: 5,
            comment: '最後までアーニャがかわいかった。家族3人の関係性もよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode96.id,
            rating: 4,
            comment: 'それぞれが秘密を抱えているからこそのすれ違いが面白かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode96.id,
            rating: 4,
            comment: '全体的には楽しめたけど、今回は少しゆっくりした展開だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode96.id,
            rating: 5,
            comment: 'コメディと家族の温かさが両方あって、この作品らしい回だった。',
        },
    });

    // 呪術廻戦のレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode97.id,
            rating: 5,
            comment: '呪術という独特な世界観に引き込まれた。戦闘シーンも迫力があった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode97.id,
            rating: 3,
            comment: 'キャラクターの能力がそれぞれ違っていて面白い。続きが気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode97.id,
            rating: 3,
            comment: '設定は面白いけど、最初は専門用語が少し多くて分かりにくかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode97.id,
            rating: 4,
            comment: 'バトルだけでなくキャラクター同士の会話も面白くて、すぐに続きが見たくなった。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode98.id,
            rating: 5,
            comment: '虎杖の行動力がすごい。呪いを相手に戦う設定もかなり面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode98.id,
            rating: 4,
            comment: '伏黒の考え方が分かってきて、キャラクターに興味が出てきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode98.id,
            rating: 1,
            comment: '戦闘は迫力があるけど、展開が少し急に感じた。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode99.id,
            rating: 3,
            comment: '新しいキャラクターが登場して、物語の雰囲気がさらに広がった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode99.id,
            rating: 5,
            comment: 'キャラクター同士の掛け合いが面白かった。戦闘以外の部分も楽しめる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode99.id,
            rating: 3,
            comment: '面白いけど、今回は少し話の進みが遅く感じた。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode100.id,
            rating: 5,
            comment: '戦闘シーンの動きがよくて見応えがあった。術式の使い方も面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode100.id,
            rating: 4,
            comment: '敵側の能力も特徴があって、単純な力比べになっていないところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode100.id,
            rating: 3,
            comment: '戦闘はよかったけど、能力の説明が少し複雑だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode100.id,
            rating: 4,
            comment: 'それぞれの能力をどう使うのか考えながら見られて面白かった。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode101.id,
            rating: 5,
            comment: '虎杖の戦い方が熱くてよかった。勢いのあるバトルで楽しめた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode101.id,
            rating: 4,
            comment: '仲間との連携がよくて、戦闘の緊張感もかなりあった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode101.id,
            rating: 2,
            comment: '戦闘自体は迫力があるけど、少し長く感じてしまった。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode102.id,
            rating: 5,
            comment: 'キャラクターの過去や考え方が見えてきて、さらに好きになった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode102.id,
            rating: 4,
            comment: '戦闘だけではなく、それぞれの信念が描かれているところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode102.id,
            rating: 3,
            comment: '内容は面白いけど、少し重い話で気軽には見られなかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode102.id,
            rating: 5,
            comment: 'キャラクターの感情がしっかり描かれていて印象に残った。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode103.id,
            rating: 5,
            comment: '予想していなかった展開になって驚いた。ここからの話がかなり気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode103.id,
            rating: 3,
            comment: '敵との戦いが激しくなってきて、緊張感がかなり高まった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode103.id,
            rating: 2,
            comment: '展開が早くて面白いけど、少し理解が追いつかない部分もあった。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode104.id,
            rating: 5,
            comment: '戦闘の迫力がすごかった。キャラクターの動きもかっこよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode104.id,
            rating: 4,
            comment: 'それぞれの術式の特徴が出ていて、戦い方に個性があった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode104.id,
            rating: 1,
            comment: '戦闘はすごいけど、能力の仕組みが複雑で少し分かりにくかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode104.id,
            rating: 5,
            comment: '最後まで緊張感が続いて面白かった。次の展開が気になる。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode105.id,
            rating: 4,
            comment: '敵側の事情も見えてきて、単純な善悪ではないところが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode105.id,
            rating: 4,
            comment: 'キャラクターの考え方がぶつかる展開がよかった。かなり見応えがあった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode105.id,
            rating: 3,
            comment: '話は面白いけど、説明が多くて少しテンポが落ちたように感じた。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode106.id,
            rating: 5,
            comment: '戦いの中でキャラクターが成長していく感じがあって熱かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode106.id,
            rating: 3,
            comment: '仲間との連携がよくて、単独の戦闘とは違う面白さがあった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode106.id,
            rating: 1,
            comment: '展開は悪くないけど、今回は少し盛り上がりに欠けるように感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode106.id,
            rating: 4,
            comment: '戦闘の駆け引きが面白かった。どうやって勝つのか最後まで分からなかった。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode107.id,
            rating: 4,
            comment: 'ここまでの出来事が少しずつつながってきて、物語の全体像が見えてきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode107.id,
            rating: 4,
            comment: 'キャラクターの覚悟が伝わってきてよかった。かなり印象に残る回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode107.id,
            rating: 3,
            comment: '内容は濃いけど、少し話が複雑になってきたと感じた。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode108.id,
            rating: 5,
            comment: '最後まで緊張感があって面白かった。次の話をすぐ見たくなる終わり方だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode108.id,
            rating: 4,
            comment: 'ここまでの伏線が少し見えてきて、物語がさらに面白くなってきた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode108.id,
            rating: 3,
            comment: '面白いけど、設定が複雑なので何度か見返したくなる内容だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode108.id,
            rating: 5,
            comment: '戦闘とストーリーのバランスがよくて、最後まで楽しめた。',
        },
    });

    // 僕のヒーローアカデミアのレビューを作成

    // 第1話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode109.id,
            rating: 5,
            comment: 'デクがヒーローを目指す理由がしっかり描かれていて、最初から引き込まれた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode109.id,
            rating: 4,
            comment: '個性という設定が面白い。ヒーローを目指す世界観にも興味が出た。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode109.id,
            rating: 3,
            comment: '設定は面白いけど、最初は少し説明が多いように感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode109.id,
            rating: 5,
            comment: 'デクの一生懸命さが伝わってきて応援したくなった。',
        },
    });

    // 第2話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode110.id,
            rating: 4,
            comment: 'オールマイトが登場して一気に物語が動いた感じがした。とても熱い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode110.id,
            rating: 3,
            comment: 'デクとオールマイトの関係が始まるところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode110.id,
            rating: 2,
            comment: '展開が少し都合よく感じてしまって、そこまで入り込めなかった。',
        },
    });

    // 第3話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode111.id,
            rating: 4,
            comment: 'デクがヒーローになるために努力する姿がよかった。成長が楽しみ。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode111.id,
            rating: 5,
            comment: 'オールマイトの指導とデクの努力が熱かった。応援したくなる回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode111.id,
            rating: 2,
            comment: '面白いけど、努力の過程が少し長く感じた。',
        },
    });

    // 第4話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode112.id,
            rating: 5,
            comment: '雄英高校での生活が始まって、新しいキャラクターがたくさん出てきて面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode112.id,
            rating: 4,
            comment: 'クラスメイトそれぞれの個性が分かってきて楽しかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode112.id,
            rating: 3,
            comment: 'キャラクターが多くて少し覚えにくかったけど、設定は面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode112.id,
            rating: 4,
            comment: 'ヒーロー科の授業が普通の学校とは違っていて面白かった。',
        },
    });

    // 第5話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode113.id,
            rating: 5,
            comment: '個性を使った戦闘が迫力あってよかった。デクの成長も感じられた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode113.id,
            rating: 3,
            comment: 'それぞれの個性の使い方に工夫があって面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode113.id,
            rating: 2,
            comment: '戦闘は面白いけど、少し展開が分かりやすかった。',
        },
    });

    // 第6話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode114.id,
            rating: 5,
            comment: 'クラスメイト同士の関係が見えてきて面白かった。キャラクターが魅力的。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode114.id,
            rating: 3,
            comment: 'デクだけではなく周りのキャラクターにも見せ場があってよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode114.id,
            rating: 3,
            comment: 'キャラクターはいいけど、少し話が散らかっているように感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode114.id,
            rating: 5,
            comment: 'それぞれの個性が戦闘でどう活かされるのか見ていて楽しかった。',
        },
    });

    // 第7話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode115.id,
            rating: 5,
            comment: '本格的な戦闘になってかなり熱かった。キャラクターの成長も感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode115.id,
            rating: 4,
            comment: '個性の相性を考えながら戦っていて、ただの力比べではないところが面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode115.id,
            rating: 3,
            comment: '戦闘は迫力があるけど、少し長く感じてしまった。',
        },
    });

    // 第8話
    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode116.id,
            rating: 5,
            comment: 'デクが自分の力をどう使うか考えているところがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode116.id,
            rating: 4,
            comment: '戦闘中の判断が面白かった。個性の弱点を考えるのも楽しい。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode116.id,
            rating: 1,
            comment: '戦闘はよかったけど、少し説明が多くてテンポが落ちたように感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode116.id,
            rating: 5,
            comment: 'それぞれが自分の力を工夫して使っていて、見応えのある戦闘だった。',
        },
    });

    // 第9話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode117.id,
            rating: 3,
            comment: 'ヒーローになるための厳しさも描かれていて、単なる学園ものではないと感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode117.id,
            rating: 4,
            comment: 'キャラクターそれぞれの考え方が分かってきて、さらに面白くなった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user9.id,
            episodeId: episode117.id,
            rating: 3,
            comment: '話は面白いけど、今回は少し説明が多かった。',
        },
    });

    // 第10話
    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode118.id,
            rating: 5,
            comment: '敵が登場して一気に緊張感が上がった。今までとは違う雰囲気で面白い。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user5.id,
            episodeId: episode118.id,
            rating: 4,
            comment: 'ヒーローと敵の関係が少しずつ見えてきて、今後の展開が気になる。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user7.id,
            episodeId: episode118.id,
            rating: 2,
            comment: '敵側の話が少し長くて、今回はテンポが遅く感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user10.id,
            episodeId: episode118.id,
            rating: 5,
            comment: 'これから大きな事件が起きそうな雰囲気があってワクワクした。',
        },
    });

    // 第11話
    await prisma.review.create({
        data: {
            userId: user1.id,
            episodeId: episode119.id,
            rating: 5,
            comment: 'ヒーローとして戦う覚悟が伝わってきて熱かった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user3.id,
            episodeId: episode119.id,
            rating: 4,
            comment: '仲間との協力がよく描かれていて、クラス全体の成長を感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user8.id,
            episodeId: episode119.id,
            rating: 3,
            comment: '面白いけど、もう少し一人ひとりの活躍を見たかった。',
        },
    });

    // 第12話
    await prisma.review.create({
        data: {
            userId: user2.id,
            episodeId: episode120.id,
            rating: 5,
            comment: '最後まで熱い展開で楽しめた。デクの成長を感じられる回だった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user4.id,
            episodeId: episode120.id,
            rating: 4,
            comment: 'ヒーローとしての考え方が少しずつ変わってきているのがよかった。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user6.id,
            episodeId: episode120.id,
            rating: 3,
            comment: '全体的には面白いけど、少し都合よく進む部分もあると感じた。',
        },
    });

    await prisma.review.create({
        data: {
            userId: user11.id,
            episodeId: episode120.id,
            rating: 5,
            comment: '戦闘とストーリーのバランスがよくて、最後まで飽きずに見られた。',
        },
    });


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