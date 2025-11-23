import { Request, Response } from 'express'

import { z } from 'zod'

import { Prisma, prisma, type Status } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { buildChangeMeta, generateTimeInMs } from '../../utils/functions'

type TTimelineRow = {
  bucket: Date
  tracks: number
  trackLikes: number
  playlistAdds: number
}

export const getArtistDashboardSummary = async (
  req: Request,
  res: Response
) => {
  const artistId = req.user.id
  const { lastNDays: lastNDaysQuery } =
    zGetArtistDashboardSummaryReqQuery.parse(req.query)

  const lastNDays = lastNDaysQuery ?? 30
  const startDate = new Date(
    Date.now() - generateTimeInMs({ hour: lastNDays * 24 })
  )
  const previousStartDate = new Date(
    startDate.getTime() - generateTimeInMs({ hour: lastNDays * 24 })
  )
  const previousEndDate = startDate

  const [
    totalTracks,
    totalPlaylists,
    totalLikesOnTracks,
    totalPlaylistsContainingTracks,
    totalLikesOnPlaylists,
    totalCollaborations,
    publicTrackCount,
    trackStatusGroups,
    timelineRows,
    topTracks,
    featuredPlaylists,
    reviewTracks,
    tracksCreatedCurrent,
    tracksCreatedPrevious,
    trackLikesCurrent,
    trackLikesPrevious,
    playlistAddsCurrent,
    playlistAddsPrevious,
    collaborationsCurrent,
    collaborationsPrevious,
    trackListensSum
  ] = await Promise.all([
    prisma.track.count({
      where: { primaryArtistId: artistId }
    }),
    prisma.playlist.count({
      where: { ownerId: artistId }
    }),
    prisma.likedTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        }
      }
    }),
    prisma.playlistTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        }
      }
    }),
    prisma.likedPlaylist.count({
      where: {
        playlist: {
          ownerId: artistId
        }
      }
    }),
    prisma.track.count({
      where: {
        secondaryArtists: { some: { id: artistId } }
      }
    }),
    prisma.track.count({
      where: {
        primaryArtistId: artistId,
        isPublic: true
      }
    }),
    prisma.track.groupBy({
      by: ['status'],
      where: {
        primaryArtistId: artistId
      },
      _count: {
        _all: true
      }
    }),
    getTimelineRows({ artistId, startDate }),
    getTopTracks({ artistId }),
    getFeaturedPlaylists({ artistId }),
    getReviewTracks({ artistId }),
    prisma.track.count({
      where: {
        primaryArtistId: artistId,
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.track.count({
      where: {
        primaryArtistId: artistId,
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    }),
    prisma.likedTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        },
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.likedTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        },
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    }),
    prisma.playlistTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        },
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.playlistTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        },
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    }),
    prisma.track.count({
      where: {
        secondaryArtists: { some: { id: artistId } },
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.track.count({
      where: {
        secondaryArtists: { some: { id: artistId } },
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    }),
    prisma.track.aggregate({
      where: {
        primaryArtistId: artistId
      },
      _sum: {
        listens: true
      }
    })
  ])

  const timelinePoints = timelineRows.map((row) => ({
    date: row.bucket.toISOString().split('T')[0],
    tracks: row.tracks,
    trackLikes: row.trackLikes,
    playlistAdds: row.playlistAdds
  }))

  const totalTrackVisibility = [
    {
      label: 'Public',
      value: publicTrackCount
    },
    {
      label: 'Private',
      value: Math.max(totalTracks - publicTrackCount, 0)
    }
  ]

  const statusCounts = trackStatusGroups.reduce<Record<Status, number>>(
    (acc, group) => {
      acc[group.status] = group._count._all
      return acc
    },
    {
      PENDING: 0,
      PROCESSING: 0,
      FAILED: 0,
      REVIEWING: 0,
      PUBLISHED: 0,
      BLOCKED: 0
    }
  )

  const overview = [
    {
      label: 'Tracks Published',
      value: tracksCreatedCurrent,
      change: {
        ...buildChangeMeta(tracksCreatedCurrent, tracksCreatedPrevious),
        referenceWindowInDays: lastNDays
      }
    },
    {
      label: 'Track Likes',
      value: trackLikesCurrent,
      change: {
        ...buildChangeMeta(trackLikesCurrent, trackLikesPrevious),
        referenceWindowInDays: lastNDays
      }
    },
    {
      label: 'Playlist Adds',
      value: playlistAddsCurrent,
      change: {
        ...buildChangeMeta(playlistAddsCurrent, playlistAddsPrevious),
        referenceWindowInDays: lastNDays
      }
    },
    {
      label: 'Collaborations',
      value: collaborationsCurrent,
      change: {
        ...buildChangeMeta(collaborationsCurrent, collaborationsPrevious),
        referenceWindowInDays: lastNDays
      }
    }
  ]

  res.status(200).json({
    message: 'Successfully fetched dashboard summary',
    data: {
      generatedAt: new Date().toISOString(),
      rangeInDays: lastNDays,
      overview,
      releasePipeline: {
        statuses: STATUS_LIST.map((status) => ({
          status,
          value: statusCounts[status]
        })),
        visibility: totalTrackVisibility
      },
      playlistPresence: {
        owned: totalPlaylists,
        likes: totalLikesOnPlaylists,
        featuring: totalPlaylistsContainingTracks
      },
      catalogStats: {
        total: totalTracks,
        public: publicTrackCount,
        private: Math.max(totalTracks - publicTrackCount, 0),
        listens: trackListensSum._sum.listens ?? 0,
        collaborations: totalCollaborations
      },
      engagement: {
        trackLikes: {
          current: trackLikesCurrent,
          previous: trackLikesPrevious,
          total: totalLikesOnTracks
        },
        playlistAdds: {
          current: playlistAddsCurrent,
          previous: playlistAddsPrevious,
          total: totalPlaylistsContainingTracks
        }
      },
      timeline: {
        points: timelinePoints
      },
      topEntities: {
        tracks: topTracks.map((track) => ({
          id: track.id,
          title: track.title,
          listens: track.listens,
          likes: track.likes,
          status: track.status,
          createdAt: track.createdAt.toISOString(),
          posterKey: track.posterKey
        })),
        playlists: featuredPlaylists.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          likes: playlist.likes,
          trackCount: playlist._count.playlistTracks,
          posterKey: playlist.posterKey
        }))
      },
      reviewQueue: reviewTracks.map((track) => ({
        id: track.id,
        title: track.title,
        status: track.status,
        submittedAt: track.createdAt.toISOString(),
        posterKey: track.posterKey
      }))
    }
  })
}

const zGetArtistDashboardSummaryReqQuery = z.object({
  lastNDays: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return Number(value)
      }
      return value
    }, z.number().min(7).max(365))
    .optional()
})

type TGetTimelineRowsArgs = {
  artistId: string
  startDate: Date
}

const getTimelineRows = ({ artistId, startDate }: TGetTimelineRowsArgs) => {
  return prisma.$queryRaw<TTimelineRow[]>(Prisma.sql`
    WITH series AS (
      SELECT generate_series(${startDate}::date, DATE_TRUNC('day', NOW())::date, '1 day') AS day
    ),
    track_counts AS (
      SELECT DATE("createdAt") AS bucket, COUNT(*) AS count
      FROM "tracks"
      WHERE "createdAt" >= ${startDate}
        AND "primaryArtistId" = ${artistId}
      GROUP BY bucket
    ),
    track_likes AS (
      SELECT DATE(lt."createdAt") AS bucket, COUNT(*) AS count
      FROM "liked_tracks" lt
      JOIN "tracks" t ON t."id" = lt."trackId"
      WHERE lt."createdAt" >= ${startDate}
        AND t."primaryArtistId" = ${artistId}
      GROUP BY bucket
    ),
    playlist_adds AS (
      SELECT DATE(pt."createdAt") AS bucket, COUNT(*) AS count
      FROM "playlist_tracks" pt
      JOIN "tracks" t ON t."id" = pt."trackId"
      WHERE pt."createdAt" >= ${startDate}
        AND t."primaryArtistId" = ${artistId}
      GROUP BY bucket
    )
    SELECT
      series.day::date AS bucket,
      COALESCE(track_counts.count, 0) AS tracks,
      COALESCE(track_likes.count, 0) AS "trackLikes",
      COALESCE(playlist_adds.count, 0) AS "playlistAdds"
    FROM series
    LEFT JOIN track_counts ON track_counts.bucket = series.day::date
    LEFT JOIN track_likes ON track_likes.bucket = series.day::date
    LEFT JOIN playlist_adds ON playlist_adds.bucket = series.day::date
    ORDER BY series.day::date;
  `)
}

type TGetTopTracksArgs = {
  artistId: string
}

const getTopTracks = ({ artistId }: TGetTopTracksArgs) => {
  return prisma.track.findMany({
    where: {
      primaryArtistId: artistId
    },
    take: 3,
    orderBy: [
      {
        listens: 'desc'
      },
      {
        likes: 'desc'
      }
    ],
    select: {
      id: true,
      title: true,
      listens: true,
      likes: true,
      status: true,
      createdAt: true,
      posterKey: true
    }
  })
}

type TGetFeaturedPlaylistsArgs = {
  artistId: string
}

const getFeaturedPlaylists = ({ artistId }: TGetFeaturedPlaylistsArgs) => {
  return prisma.playlist.findMany({
    where: {
      playlistTracks: {
        some: {
          track: {
            primaryArtistId: artistId
          }
        }
      }
    },
    take: 3,
    orderBy: [
      {
        likes: 'desc'
      },
      {
        updatedAt: 'desc'
      }
    ],
    select: {
      id: true,
      name: true,
      likes: true,
      posterKey: true,
      _count: {
        select: {
          playlistTracks: true
        }
      }
    }
  })
}

type TGetReviewTracksArgs = {
  artistId: string
}

const getReviewTracks = ({ artistId }: TGetReviewTracksArgs) => {
  return prisma.track.findMany({
    where: {
      primaryArtistId: artistId,
      status: {
        in: ['PENDING', 'PROCESSING', 'REVIEWING']
      }
    },
    take: 5,
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
      posterKey: true
    }
  })
}
