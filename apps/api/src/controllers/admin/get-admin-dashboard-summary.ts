import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { generateTimeInMs } from '../../utils/functions'

export const getAdminDashboardSummary = async (req: Request, res: Response) => {
  const { lastNDays = 30 } = zGetAdminDashboardSummaryReqQuery.parse(req.query)
  const startDate = new Date(
    Date.now() - generateTimeInMs({ hour: lastNDays * 24 })
  )

  const [
    totalUserCount,
    artistUserCount,
    publicUserCount,
    adminUserCount,
    usersCreatedLastNDays
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isArtist: true } }),
    prisma.user.count({ where: { isPublicProfile: true } }),
    prisma.user.count({ where: { isAdmin: true } }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })
  ])

  const normalUserCount = totalUserCount - artistUserCount
  const privateUserCount = totalUserCount - publicUserCount

  // Parallel queries for track counts
  const [
    totalTrackCount,
    privateTrackCount,
    pendingTrackCount,
    processingTrackCount,
    failedTrackCount,
    reviewingTrackCount,
    blockedTrackCount,
    publishedTrackCount,
    tracksCreatedLastNDays,
    trackLikesLastNDays
  ] = await Promise.all([
    prisma.track.count(),
    prisma.track.count({ where: { isPublic: false } }),
    prisma.track.count({ where: { status: 'PENDING' } }),
    prisma.track.count({ where: { status: 'PROCESSING' } }),
    prisma.track.count({ where: { status: 'FAILED' } }),
    prisma.track.count({ where: { status: 'REVIEWING' } }),
    prisma.track.count({ where: { status: 'BLOCKED' } }),
    prisma.track.count({ where: { status: 'PUBLISHED' } }),
    prisma.track.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.likedTrack.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })
  ])

  const publicTrackCount = totalTrackCount - privateTrackCount

  // Parallel queries for playlist counts
  const [
    totalPlaylistCount,
    publicPlaylistCount,
    reviewingPlaylistCount,
    blockedPlaylistCount,
    playlistsCreatedLastNDays,
    playlistLikesLastNDays
  ] = await Promise.all([
    prisma.playlist.count(),
    prisma.playlist.count({ where: { isPublic: true } }),
    prisma.playlist.count({ where: { status: 'REVIEWING' } }),
    prisma.playlist.count({ where: { status: 'BLOCKED' } }),
    prisma.playlist.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.likedPlaylist.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })
  ])

  const privatePlaylistCount = totalPlaylistCount - publicPlaylistCount
  const publishedPlaylistCount =
    totalPlaylistCount - (reviewingPlaylistCount + blockedPlaylistCount)

  res.status(201).json({
    message: 'Successfully fetched basic counts',
    data: {
      userCount: {
        total: totalUserCount,
        artist: artistUserCount,
        normal: normalUserCount,
        public: publicUserCount,
        private: privateUserCount,
        admin: adminUserCount
      },
      trackCount: {
        total: totalTrackCount,
        public: publicTrackCount,
        private: privateTrackCount,
        pending: pendingTrackCount,
        processing: processingTrackCount,
        failed: failedTrackCount,
        reviewing: reviewingTrackCount,
        published: publishedTrackCount,
        blocked: blockedTrackCount
      },
      playlistCount: {
        total: totalPlaylistCount,
        public: publicPlaylistCount,
        private: privatePlaylistCount,
        reviewing: reviewingPlaylistCount,
        published: publishedPlaylistCount,
        blocked: blockedPlaylistCount
      },
      lastNDaysCount: {
        n: lastNDays,
        users: usersCreatedLastNDays,
        tracks: tracksCreatedLastNDays,
        playlists: playlistsCreatedLastNDays,
        trackLikes: trackLikesLastNDays,
        playlistLikes: playlistLikesLastNDays
      }
    }
  })
}

const zGetAdminDashboardSummaryReqQuery = z.object({
  lastNDays: z.number().optional()
})
