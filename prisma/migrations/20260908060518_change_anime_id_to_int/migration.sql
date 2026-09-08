/*
  Warnings:

  - The primary key for the `Anime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tagging` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `animeId` on the `Episode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `animeId` on the `Tagging` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_animeId_fkey";

-- DropForeignKey
ALTER TABLE "Tagging" DROP CONSTRAINT "Tagging_animeId_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Anime_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "animeId",
ADD COLUMN     "animeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tagging" DROP CONSTRAINT "Tagging_pkey",
DROP COLUMN "animeId",
ADD COLUMN     "animeId" INTEGER NOT NULL,
ADD CONSTRAINT "Tagging_pkey" PRIMARY KEY ("genreId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_animeId_episode_number_key" ON "Episode"("animeId", "episode_number");

-- AddForeignKey
ALTER TABLE "Tagging" ADD CONSTRAINT "Tagging_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
