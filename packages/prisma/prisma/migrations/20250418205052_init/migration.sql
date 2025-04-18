-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PROCESSING', 'FAILED', 'REVIEWING', 'PUBLISHED', 'BLOCKED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isArtist" BOOLEAN NOT NULL DEFAULT false,
    "isPremiumUser" BOOLEAN NOT NULL DEFAULT false,
    "isPublicProfile" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL,
    "primaryArtistId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "listens" INTEGER NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "posterKey" TEXT,
    "trackKey" TEXT,
    "tags" TEXT,
    "lyrics" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlists" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "likes" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "posterKey" TEXT,
    "tracksCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "userId" TEXT NOT NULL,
    "avatarKey" TEXT,
    "bio" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT
);

-- CreateTable
CREATE TABLE "user_reset_tokens" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user_artist_applications" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT,
    "isApproved" BOOLEAN,
    "idProofType" TEXT,
    "idProofKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_artist_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liked_tracks" (
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "liked_playlists" (
    "userId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "playlist_tracks" (
    "playlistId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Users_SecondaryTracks_M2M" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Users_SecondaryTracks_M2M_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "tracks_id_idx" ON "tracks"("id");

-- CreateIndex
CREATE INDEX "tracks_primaryArtistId_idx" ON "tracks"("primaryArtistId");

-- CreateIndex
CREATE INDEX "tracks_id_primaryArtistId_idx" ON "tracks"("id", "primaryArtistId");

-- CreateIndex
CREATE INDEX "tracks_title_idx" ON "tracks"("title");

-- CreateIndex
CREATE INDEX "tracks_language_idx" ON "tracks"("language");

-- CreateIndex
CREATE INDEX "tracks_tags_idx" ON "tracks"("tags");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_id_primaryArtistId_key" ON "tracks"("id", "primaryArtistId");

-- CreateIndex
CREATE INDEX "playlists_id_idx" ON "playlists"("id");

-- CreateIndex
CREATE INDEX "playlists_ownerId_idx" ON "playlists"("ownerId");

-- CreateIndex
CREATE INDEX "playlists_name_idx" ON "playlists"("name");

-- CreateIndex
CREATE INDEX "playlists_description_idx" ON "playlists"("description");

-- CreateIndex
CREATE UNIQUE INDEX "playlists_id_ownerId_key" ON "playlists"("id", "ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "otps_email_key" ON "otps"("email");

-- CreateIndex
CREATE INDEX "otps_email_idx" ON "otps"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE INDEX "user_profiles_userId_idx" ON "user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_reset_tokens_userId_key" ON "user_reset_tokens"("userId");

-- CreateIndex
CREATE INDEX "user_reset_tokens_userId_idx" ON "user_reset_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_artist_applications_userId_key" ON "user_artist_applications"("userId");

-- CreateIndex
CREATE INDEX "user_artist_applications_userId_idx" ON "user_artist_applications"("userId");

-- CreateIndex
CREATE INDEX "liked_tracks_userId_trackId_idx" ON "liked_tracks"("userId", "trackId");

-- CreateIndex
CREATE INDEX "liked_tracks_userId_idx" ON "liked_tracks"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "liked_tracks_userId_trackId_key" ON "liked_tracks"("userId", "trackId");

-- CreateIndex
CREATE INDEX "liked_playlists_userId_playlistId_idx" ON "liked_playlists"("userId", "playlistId");

-- CreateIndex
CREATE INDEX "liked_playlists_userId_idx" ON "liked_playlists"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "liked_playlists_userId_playlistId_key" ON "liked_playlists"("userId", "playlistId");

-- CreateIndex
CREATE INDEX "playlist_tracks_playlistId_trackId_idx" ON "playlist_tracks"("playlistId", "trackId");

-- CreateIndex
CREATE INDEX "playlist_tracks_playlistId_idx" ON "playlist_tracks"("playlistId");

-- CreateIndex
CREATE UNIQUE INDEX "playlist_tracks_playlistId_trackId_key" ON "playlist_tracks"("playlistId", "trackId");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "_Users_SecondaryTracks_M2M_B_index" ON "_Users_SecondaryTracks_M2M"("B");

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_primaryArtistId_fkey" FOREIGN KEY ("primaryArtistId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_reset_tokens" ADD CONSTRAINT "user_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_artist_applications" ADD CONSTRAINT "user_artist_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liked_tracks" ADD CONSTRAINT "liked_tracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liked_tracks" ADD CONSTRAINT "liked_tracks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liked_playlists" ADD CONSTRAINT "liked_playlists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liked_playlists" ADD CONSTRAINT "liked_playlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist_tracks" ADD CONSTRAINT "playlist_tracks_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist_tracks" ADD CONSTRAINT "playlist_tracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_Users_SecondaryTracks_M2M" ADD CONSTRAINT "_Users_SecondaryTracks_M2M_A_fkey" FOREIGN KEY ("A") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Users_SecondaryTracks_M2M" ADD CONSTRAINT "_Users_SecondaryTracks_M2M_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
