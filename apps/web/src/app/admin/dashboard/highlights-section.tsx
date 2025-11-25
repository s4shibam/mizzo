import type { TabsProps } from 'antd'
import { Card, Tabs, Tag, Tooltip } from 'antd'
import { FiLayers } from 'react-icons/fi'
import { LuListMusic, LuMicVocal, LuMusic2 } from 'react-icons/lu'

import ARTIST_AVATAR_PLACEHOLDER from '@/assets/placeholders/artist-avatar.webp'
import PLAYLIST_POSTER_PLACEHOLDER from '@/assets/placeholders/playlist-poster.webp'
import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { EntityColumn } from '@/components/dashboard/entity-column'
import { ReviewList } from '@/components/dashboard/review-list'
import type { TAdminDashboardSummary } from '@/hooks/api/admin'
import { formatNumberCompact, s3GetUrlFromKey } from '@/lib/utils'
import type { TStatus } from '@/types/index'

type AdminHighlightsSectionProps = {
  totalTrackListens: number
  topEntities?: TAdminDashboardSummary['topEntities']
  reviewQueues?: TAdminDashboardSummary['reviewQueues']
}

export const AdminHighlightsSection = ({
  topEntities,
  reviewQueues,
  totalTrackListens
}: AdminHighlightsSectionProps) => {
  const reviewTabs: TabsProps['items'] = [
    {
      key: 'tracks',
      label: `Tracks (${reviewQueues?.tracks.length ?? 0})`,
      children: (
        <ReviewList
          emptyMessage="No tracks waiting for review"
          items={reviewQueues?.tracks.map((item) => ({
            id: item.id,
            title: item.title,
            meta: item.artistName,
            status: item.status,
            date: item.submittedAt,
            imageUrl: s3GetUrlFromKey(item.posterKey),
            fallbackImage: TRACK_POSTER_PLACEHOLDER
          }))}
        />
      )
    },
    {
      key: 'playlists',
      label: `Playlists (${reviewQueues?.playlists.length ?? 0})`,
      children: (
        <ReviewList
          emptyMessage="No playlists waiting for review"
          items={reviewQueues?.playlists.map((item) => ({
            id: item.id,
            title: item.name,
            meta: item.ownerName,
            status: item.status,
            date: item.submittedAt,
            imageUrl: s3GetUrlFromKey(item.posterKey),
            fallbackImage: TRACK_POSTER_PLACEHOLDER
          }))}
        />
      )
    },
    {
      key: 'artists',
      label: `Applications (${reviewQueues?.artistApplications.length ?? 0})`,
      children: (
        <ReviewList
          emptyMessage="No pending applications"
          items={reviewQueues?.artistApplications.map((item) => ({
            id: String(item.id),
            title: item.name,
            meta: 'Artist application',
            status: 'REVIEWING' as TStatus,
            date: item.submittedAt,
            imageUrl: s3GetUrlFromKey(item.avatarKey),
            fallbackImage: ARTIST_AVATAR_PLACEHOLDER
          }))}
        />
      )
    }
  ]

  const tracks = topEntities?.tracks ?? []
  const artists = topEntities?.artists ?? []
  const playlists = topEntities?.playlists ?? []

  return (
    <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <Card className="relative overflow-hidden border bg-white" size="small">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-zinc-500">Top performers</p>
            <h3 className="text-lg font-semibold">High-impact content</h3>
          </div>
          <Tag className="rounded-full" color="green">
            {formatNumberCompact(totalTrackListens)} Lifetime Plays
          </Tag>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <EntityColumn
            className="bg-gradient-to-br from-blue-50 to-transparent"
            emptyMessage="No tracks"
            icon={LuMusic2}
            items={tracks.map((track, idx) => ({
              fallbackImage: TRACK_POSTER_PLACEHOLDER,
              href: `/track/${track.id}?as=admin`,
              imageKey: track.posterKey,
              meta: track.artist.name,
              name: track.title,
              rank: idx + 1,
              stats: [
                { value: formatNumberCompact(track.listens), label: 'Plays' },
                { value: formatNumberCompact(track.likes), label: 'Likes' }
              ]
            }))}
            title="Tracks"
          />

          <EntityColumn
            className="bg-gradient-to-br from-purple-50 to-transparent"
            emptyMessage="No artists"
            icon={LuMicVocal}
            items={artists.map((artist, idx) => ({
              fallbackImage: ARTIST_AVATAR_PLACEHOLDER,
              href: `/artist/${artist.id}?as=admin`,
              imageKey: artist.avatarKey,
              meta: `${formatNumberCompact(artist.totalTracks)} Tracks`,
              name: artist.name,
              rank: idx + 1,
              stats: [
                {
                  label: 'Listens',
                  value: formatNumberCompact(artist.totalListens)
                }
              ]
            }))}
            title="Artists"
          />

          <EntityColumn
            className="bg-gradient-to-br from-cyan-50 to-transparent"
            emptyMessage="No playlists"
            icon={LuListMusic}
            items={playlists.map((playlist, idx) => {
              return {
                fallbackImage: PLAYLIST_POSTER_PLACEHOLDER,
                href: `/playlist/${playlist.id}?as=admin`,
                imageKey: playlist.posterKey,
                meta: playlist.owner.name,
                name: playlist.name,
                rank: idx + 1,
                stats: [
                  {
                    label: 'Likes',
                    value: formatNumberCompact(playlist.likes)
                  },
                  {
                    label: 'Tracks',
                    value: formatNumberCompact(playlist.trackCount)
                  }
                ]
              }
            })}
            title="Playlists"
          />
        </div>
      </Card>

      <Card className="relative overflow-hidden border bg-white" size="small">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-zinc-500">Review queue</p>
            <h3 className="text-lg font-semibold">Moderation focus</h3>
          </div>
          <Tooltip title="Assets that require manual review or approvals">
            <FiLayers className="text-primary size-5" />
          </Tooltip>
        </div>
        <Tabs defaultActiveKey="tracks" items={reviewTabs} />
      </Card>
    </section>
  )
}
