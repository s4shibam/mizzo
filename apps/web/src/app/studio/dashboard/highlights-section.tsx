import { Card, Tag, Tooltip } from 'antd'
import { FiLayers } from 'react-icons/fi'
import { LuListMusic, LuMusic2 } from 'react-icons/lu'

import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { EntityColumn } from '@/components/dashboard/entity-column'
import { ReviewList } from '@/components/dashboard/review-list'
import type { TArtistDashboardSummary } from '@/hooks/api/artist'
import { formatNumberCompact, s3GetUrlFromKey } from '@/lib/utils'

type TArtistHighlightsSectionProps = {
  totalTrackListens: number
  topEntities?: TArtistDashboardSummary['topEntities']
  reviewQueue?: TArtistDashboardSummary['reviewQueue']
}

export const ArtistHighlightsSection = ({
  topEntities,
  reviewQueue,
  totalTrackListens
}: TArtistHighlightsSectionProps) => {
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

        <div className="grid grid-cols-2 gap-4">
          <EntityColumn
            className="bg-gradient-to-br from-blue-50 to-transparent"
            emptyMessage="No tracks"
            icon={LuMusic2}
            items={(topEntities?.tracks ?? []).map((track, idx) => ({
              fallbackImage: TRACK_POSTER_PLACEHOLDER,
              href: `/track/${track.id}`,
              imageKey: track.posterKey,
              meta: new Date(track.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }),
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
            className="bg-gradient-to-br from-cyan-50 to-transparent"
            emptyMessage="No playlists"
            icon={LuListMusic}
            items={(topEntities?.playlists ?? []).map((playlist, idx) => ({
              fallbackImage: TRACK_POSTER_PLACEHOLDER,
              href: `/playlist/${playlist.id}`,
              imageKey: playlist.posterKey,
              meta: 'Featured playlist',
              name: playlist.name,
              rank: idx + 1,
              stats: [
                {
                  value: formatNumberCompact(playlist.likes),
                  label: 'Likes'
                },
                { value: playlist.trackCount, label: 'Tracks' }
              ]
            }))}
            title="Playlists"
          />
        </div>
      </Card>

      <Card className="relative overflow-hidden border bg-white" size="small">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-zinc-500">Review queue</p>
            <h3 className="text-lg font-semibold">Pending releases</h3>
          </div>
          <Tooltip title="Tracks awaiting moderation or processing">
            <FiLayers className="text-primary size-5" />
          </Tooltip>
        </div>
        <ReviewList
          emptyMessage="No pending submissions"
          items={(reviewQueue ?? []).map((track) => ({
            id: track.id,
            title: track.title,
            status: track.status,
            date: track.submittedAt,
            imageUrl: s3GetUrlFromKey(track.posterKey),
            fallbackImage: TRACK_POSTER_PLACEHOLDER
          }))}
        />
      </Card>
    </section>
  )
}
