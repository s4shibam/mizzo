import { Request, Response } from 'express'

import { z } from 'zod'

import { Prisma, prisma, type Status } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { buildChangeMeta, generateTimeInMs } from '../../utils/functions'

type TTrackCount = Record<Status | 'total' | 'public' | 'private', number>

type TPlaylistCount = TTrackCount

type TTimelineRow = {
  bucket: Date
  users: number
  tracks: number
  playlists: number
  trackLikes: number
  playlistLikes: number
}

export const getAdminDashboardSummary = async (req: Request, res: Response) => {
  const { lastNDays: lastNDaysQuery } = zGetAdminDashboardSummaryReqQuery.parse(
    req.query
  )

  const lastNDays = lastNDaysQuery ?? 30
  const startDate = new Date(
    Date.now() - generateTimeInMs({ hour: lastNDays * 24 })
  )
  const previousStartDate = new Date(
    startDate.getTime() - generateTimeInMs({ hour: lastNDays * 24 })
  )
  const previousEndDate = startDate

  const [
    { userCount, newUsersCurrent, newUsersPrevious, premiumUserCount },
    {
      trackCount,
      tracksCreatedCurrent,
      tracksCreatedPrevious,
      trackLikesCurrent,
      trackLikesPrevious,
      totalTrackListens
    },
    { playlistVisibility, playlistLikesCurrent, playlistLikesPrevious },
    timelineRows,
    pendingTracks,
    pendingPlaylists,
    pendingArtistApplications,
    topTracks,
    topPlaylists,
    activeArtistCurrentCount,
    activeArtistPreviousCount,
    topArtistGroups
  ] = await Promise.all([
    getUserAggregations({ startDate, previousStartDate, previousEndDate }),
    getTrackAggregations({ startDate, previousStartDate, previousEndDate }),
    getPlaylistAggregations({ startDate, previousStartDate, previousEndDate }),
    getTimelineRows({ startDate }),
    getPendingTracks(),
    getPendingPlaylists(),
    getPendingArtistApplications(),
    getTopTracks(),
    getTopPlaylists(),
    getActiveArtistCount({ startDate }),
    getActiveArtistCount({
      startDate: previousStartDate,
      endDate: previousEndDate
    }),
    getTopArtistGroups()
  ])

  const overview = [
    {
      label: 'New Users',
      value: newUsersCurrent,
      change: {
        ...buildChangeMeta(newUsersCurrent, newUsersPrevious),
        referenceWindowInDays: lastNDays
      }
    },
    {
      label: 'Active Artists',
      value: activeArtistCurrentCount,
      change: {
        ...buildChangeMeta(activeArtistCurrentCount, activeArtistPreviousCount),
        referenceWindowInDays: lastNDays
      }
    },
    {
      label: 'Tracks Created',
      value: tracksCreatedCurrent,
      change: {
        ...buildChangeMeta(tracksCreatedCurrent, tracksCreatedPrevious),
        referenceWindowInDays: lastNDays
      }
    },
    {
      label: 'Engagement Events',
      value: trackLikesCurrent + playlistLikesCurrent,
      change: {
        ...buildChangeMeta(
          trackLikesCurrent + playlistLikesCurrent,
          trackLikesPrevious + playlistLikesPrevious
        ),
        referenceWindowInDays: lastNDays
      }
    }
  ]

  const timeline = timelineRows.map((row) => ({
    date: row.bucket.toISOString().split('T')[0],
    users: row.users,
    tracks: row.tracks,
    playlists: row.playlists,
    trackLikes: row.trackLikes,
    playlistLikes: row.playlistLikes
  }))

  const topArtists = await mapTopArtists({ groups: topArtistGroups })

  res.status(200).json({
    message: 'Successfully fetched admin dashboard insights',
    data: {
      generatedAt: new Date().toISOString(),
      overview,
      userCount: {
        total: userCount.total,
        artist: userCount.artist,
        public: userCount.public,
        admin: userCount.admin,
        premium: premiumUserCount
      },
      timeline: {
        points: timeline
      },
      trackPipeline: {
        statuses: STATUS_LIST.map((status) => ({
          status,
          value: trackCount[status]
        }))
      },
      playlistInsights: {
        visibility: playlistVisibility
      },
      topEntities: {
        tracks: topTracks.map((track) => ({
          id: track.id,
          title: track.title,
          status: track.status,
          listens: track.listens,
          likes: track.likes,
          posterKey: track.posterKey,
          artist: {
            id: track.primaryArtist.id,
            name: track.primaryArtist.name
          }
        })),
        playlists: topPlaylists.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          likes: playlist.likes,
          status: playlist.status,
          trackCount: Number(playlist._count.playlistTracks),
          posterKey: playlist.posterKey,
          owner: {
            id: playlist.owner.id,
            name: playlist.owner.name
          }
        })),
        artists: topArtists
      },
      reviewQueues: {
        tracks: pendingTracks.map((track) => ({
          id: track.id,
          title: track.title,
          status: track.status,
          submittedAt: track.createdAt.toISOString(),
          artistName: track.primaryArtist.name,
          posterKey: track.posterKey
        })),
        playlists: pendingPlaylists.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          status: playlist.status,
          submittedAt: playlist.createdAt.toISOString(),
          ownerName: playlist.owner.name,
          posterKey: playlist.posterKey
        })),
        artistApplications: pendingArtistApplications.map((application) => ({
          id: application.id,
          name: application.user.name,
          submittedAt: application.createdAt.toISOString(),
          avatarKey: application.user.profile?.avatarKey ?? null
        }))
      },
      aggregate: {
        totalTrackListens
      }
    }
  })
}

const zGetAdminDashboardSummaryReqQuery = z.object({
  lastNDays: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        if (value.trim().length === 0) {
          return undefined
        }

        return Number(value)
      }

      return value
    }, z.number().min(1).max(366))
    .optional()
})

type TGetUserAggregationsArgs = {
  startDate: Date
  previousStartDate: Date
  previousEndDate: Date
}

const getUserAggregations = async ({
  startDate,
  previousStartDate,
  previousEndDate
}: TGetUserAggregationsArgs) => {
  const [
    totalUserCount,
    artistUserCount,
    publicUserCount,
    adminUserCount,
    premiumUserCount,
    usersCreatedLastNDays,
    usersCreatedPrevWindow
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isArtist: true } }),
    prisma.user.count({ where: { isPublicProfile: true } }),
    prisma.user.count({ where: { isAdmin: true } }),
    prisma.user.count({ where: { isPremiumUser: true } }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    })
  ])

  const normalUserCount = totalUserCount - artistUserCount
  const privateUserCount = totalUserCount - publicUserCount

  return {
    userCount: {
      total: totalUserCount,
      artist: artistUserCount,
      normal: normalUserCount,
      public: publicUserCount,
      private: privateUserCount,
      admin: adminUserCount
    },
    newUsersCurrent: usersCreatedLastNDays,
    newUsersPrevious: usersCreatedPrevWindow,
    premiumUserCount
  }
}

type TGetTrackAggregationsArgs = {
  startDate: Date
  previousStartDate: Date
  previousEndDate: Date
}

const getTrackAggregations = async ({
  startDate,
  previousStartDate,
  previousEndDate
}: TGetTrackAggregationsArgs) => {
  const [
    totalTrackCount,
    privateTrackCount,
    trackStatuses,
    tracksCreatedCurrent,
    tracksCreatedPrevious,
    trackLikesCurrent,
    trackLikesPrevious,
    trackListensSum
  ] = await Promise.all([
    prisma.track.count(),
    prisma.track.count({ where: { isPublic: false } }),
    prisma.track.groupBy({
      by: ['status'],
      _count: {
        _all: true
      }
    }),
    prisma.track.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.track.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    }),
    prisma.likedTrack.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.likedTrack.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    }),
    prisma.track.aggregate({
      _sum: {
        listens: true
      }
    })
  ])

  const baseTrackCount: TTrackCount = {
    total: totalTrackCount,
    public: totalTrackCount - privateTrackCount,
    private: privateTrackCount,
    PENDING: 0,
    PROCESSING: 0,
    FAILED: 0,
    REVIEWING: 0,
    PUBLISHED: 0,
    BLOCKED: 0
  }

  const trackCount = trackStatuses.reduce<TTrackCount>(
    (acc, current) => {
      const key = current.status
      acc[key] = Number(current._count._all)
      return acc
    },
    { ...baseTrackCount }
  )

  return {
    trackCount,
    tracksCreatedCurrent,
    tracksCreatedPrevious,
    trackLikesCurrent,
    trackLikesPrevious,
    totalTrackListens: Number(trackListensSum._sum.listens ?? 0)
  }
}

type TGetPlaylistAggregationsArgs = {
  startDate: Date
  previousStartDate: Date
  previousEndDate: Date
}

const getPlaylistAggregations = async ({
  startDate,
  previousStartDate,
  previousEndDate
}: TGetPlaylistAggregationsArgs) => {
  const [
    totalPlaylistCount,
    publicPlaylistCount,
    playlistStatuses,
    playlistLikesCurrent,
    playlistLikesPrevious
  ] = await Promise.all([
    prisma.playlist.count(),
    prisma.playlist.count({ where: { isPublic: true } }),
    prisma.playlist.groupBy({
      by: ['status'],
      _count: {
        _all: true
      }
    }),
    prisma.likedPlaylist.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    }),
    prisma.likedPlaylist.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lt: previousEndDate
        }
      }
    })
  ])

  const basePlaylistCount: TPlaylistCount = {
    total: totalPlaylistCount,
    public: publicPlaylistCount,
    private: totalPlaylistCount - publicPlaylistCount,
    PENDING: 0,
    PROCESSING: 0,
    FAILED: 0,
    REVIEWING: 0,
    PUBLISHED: totalPlaylistCount,
    BLOCKED: 0
  }

  const playlistCount = playlistStatuses.reduce<TPlaylistCount>(
    (acc, current) => {
      const key = current.status
      acc[key] = Number(current._count._all)
      return acc
    },
    { ...basePlaylistCount }
  )

  const nonPublishedCount =
    playlistCount.REVIEWING +
    playlistCount.BLOCKED +
    playlistCount.PROCESSING +
    playlistCount.FAILED +
    playlistCount.PENDING

  playlistCount.PUBLISHED = Math.max(totalPlaylistCount - nonPublishedCount, 0)

  const playlistVisibility = [
    {
      label: 'Public',
      value: playlistCount.public
    },
    {
      label: 'Private',
      value: playlistCount.private
    }
  ]

  return {
    playlistVisibility,
    playlistLikesCurrent,
    playlistLikesPrevious
  }
}

type TGetTimelineRowsArgs = {
  startDate: Date
}

const getTimelineRows = async ({ startDate }: TGetTimelineRowsArgs) => {
  return prisma.$queryRaw<TTimelineRow[]>(Prisma.sql`
    WITH series AS (
      SELECT generate_series(${startDate}::date, DATE_TRUNC('day', NOW())::date, '1 day') AS day
    ),
    user_counts AS (
      SELECT DATE("createdAt") AS bucket, COUNT(*)::int AS count
      FROM "users"
      WHERE "createdAt" >= ${startDate}
      GROUP BY bucket
    ),
    track_counts AS (
      SELECT DATE("createdAt") AS bucket, COUNT(*)::int AS count
      FROM "tracks"
      WHERE "createdAt" >= ${startDate}
      GROUP BY bucket
    ),
    playlist_counts AS (
      SELECT DATE("createdAt") AS bucket, COUNT(*)::int AS count
      FROM "playlists"
      WHERE "createdAt" >= ${startDate}
      GROUP BY bucket
    ),
    track_likes AS (
      SELECT DATE("createdAt") AS bucket, COUNT(*)::int AS count
      FROM "liked_tracks"
      WHERE "createdAt" >= ${startDate}
      GROUP BY bucket
    ),
    playlist_likes AS (
      SELECT DATE("createdAt") AS bucket, COUNT(*)::int AS count
      FROM "liked_playlists"
      WHERE "createdAt" >= ${startDate}
      GROUP BY bucket
    )
    SELECT
      series.day::date AS bucket,
      COALESCE(user_counts.count, 0)::int AS users,
      COALESCE(track_counts.count, 0)::int AS tracks,
      COALESCE(playlist_counts.count, 0)::int AS playlists,
      COALESCE(track_likes.count, 0)::int AS "trackLikes",
      COALESCE(playlist_likes.count, 0)::int AS "playlistLikes"
    FROM series
    LEFT JOIN user_counts ON user_counts.bucket = series.day::date
    LEFT JOIN track_counts ON track_counts.bucket = series.day::date
    LEFT JOIN playlist_counts ON playlist_counts.bucket = series.day::date
    LEFT JOIN track_likes ON track_likes.bucket = series.day::date
    LEFT JOIN playlist_likes ON playlist_likes.bucket = series.day::date
    ORDER BY series.day::date;
  `)
}

const getPendingTracks = () => {
  return prisma.track.findMany({
    where: {
      status: {
        in: ['PENDING', 'PROCESSING', 'REVIEWING']
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 4,
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
      posterKey: true,
      primaryArtist: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

const getPendingPlaylists = () => {
  return prisma.playlist.findMany({
    where: {
      status: {
        in: ['PENDING', 'REVIEWING', 'BLOCKED']
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 4,
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      posterKey: true,
      owner: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

const getPendingArtistApplications = () => {
  return prisma.userArtistApplication.findMany({
    where: {
      isApproved: null
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 4,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          profile: {
            select: {
              avatarKey: true
            }
          }
        }
      }
    }
  })
}

const getTopTracks = () => {
  return prisma.track.findMany({
    where: {
      status: 'PUBLISHED'
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
      posterKey: true,
      primaryArtist: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

const getTopPlaylists = () => {
  return prisma.playlist.findMany({
    take: 3,
    orderBy: [{ likes: 'desc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      name: true,
      likes: true,
      status: true,
      posterKey: true,
      _count: {
        select: {
          playlistTracks: true
        }
      },
      owner: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

type TGetActiveArtistCountArgs = {
  startDate: Date
  endDate?: Date
}

const getActiveArtistCount = async ({
  startDate,
  endDate
}: TGetActiveArtistCountArgs): Promise<number> => {
  const parameters =
    endDate !== undefined
      ? Prisma.sql`WHERE "createdAt" >= ${startDate} AND "createdAt" < ${endDate}`
      : Prisma.sql`WHERE "createdAt" >= ${startDate}`

  const [result] = await prisma.$queryRaw<Array<{ count: number }>>(
    Prisma.sql`
    SELECT COUNT(DISTINCT "primaryArtistId")::int AS count
    FROM "tracks"
    ${parameters}
  `
  )

  return result?.count ?? 0
}

const getTopArtistGroups = () => {
  return prisma.track.groupBy({
    by: ['primaryArtistId'],
    _count: {
      _all: true
    },
    _sum: {
      listens: true
    },
    orderBy: {
      _sum: {
        listens: 'desc'
      }
    },
    where: {
      status: 'PUBLISHED'
    },
    take: 3
  })
}

type TMapTopArtistsArgs = {
  groups: Awaited<ReturnType<typeof getTopArtistGroups>>
}

const mapTopArtists = async ({ groups }: TMapTopArtistsArgs) => {
  const artistIds = groups.map((group) => group.primaryArtistId)

  if (!artistIds.length) {
    return []
  }

  const artists = await prisma.user.findMany({
    where: {
      id: {
        in: artistIds
      }
    },
    select: {
      id: true,
      name: true,
      profile: {
        select: {
          avatarKey: true
        }
      }
    }
  })
  const artistMap = new Map(
    artists.map((artist) => [
      artist.id,
      { name: artist.name, avatarKey: artist.profile?.avatarKey ?? null }
    ])
  )

  return groups.map((group) => {
    const artistData = artistMap.get(group.primaryArtistId)
    return {
      id: group.primaryArtistId,
      name: artistData?.name ?? 'Unknown Artist',
      avatarKey: artistData?.avatarKey ?? null,
      totalTracks: Number(group._count._all),
      totalListens: Number(group._sum.listens ?? 0)
    }
  })
}
