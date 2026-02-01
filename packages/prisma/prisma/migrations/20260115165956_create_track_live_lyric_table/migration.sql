/*
  Warnings:

  - You are about to drop the column `lyrics` on the `tracks` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TrackLiveLyricStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "tracks" DROP COLUMN "lyrics";

-- CreateTable
CREATE TABLE "track_live_lyrics" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "status" "TrackLiveLyricStatus" NOT NULL DEFAULT 'PENDING',
    "content" JSONB,
    "workflowId" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "track_live_lyrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "track_live_lyrics_trackId_key" ON "track_live_lyrics"("trackId");

-- AddForeignKey
ALTER TABLE "track_live_lyrics" ADD CONSTRAINT "track_live_lyrics_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
