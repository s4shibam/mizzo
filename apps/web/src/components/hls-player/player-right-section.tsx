import { Tooltip } from 'antd'
import Link from 'next/link'
import {
  LuCircleArrowUp,
  LuCirclePlus,
  LuCircleX,
  LuPictureInPicture2,
  LuVolume2,
  LuVolumeX
} from 'react-icons/lu'

import type { Playlist } from '@/types/playlist'

import { AddToPlaylistButton } from '../common/add-to-playlist-button'

const playlistLinks: { [key: string]: string } = {
  'my-uploads': '/studio/content',
  'liked-songs': '/liked-songs'
}

type PlayerRightSectionProps = {
  volume: number
  isMuted: boolean
  activePlaylist?: Playlist
  activeTrackId: string
  activeTrackTitle: string
  handleVolumeChange: (newVolume: number) => void
  toggleMute: () => void
  stop: () => void
  onTogglePip: () => void
}

export const PlayerRightSection = ({
  volume,
  isMuted,
  activePlaylist,
  activeTrackId,
  activeTrackTitle,
  handleVolumeChange,
  toggleMute,
  stop,
  onTogglePip
}: PlayerRightSectionProps) => {
  const handleVolumeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    handleVolumeChange(newVolume)
  }

  return (
    <div className="ml-auto flex items-center gap-3">
      <div className="ml-auto flex items-center gap-1">
        <button aria-label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
          {isMuted ? (
            <LuVolumeX className="size-5" />
          ) : (
            <LuVolume2 className="size-5" />
          )}
        </button>

        <div className="relative h-1 w-12 cursor-pointer overflow-hidden rounded-full bg-zinc-200 md:w-20">
          <div
            className="bg-primary absolute h-1"
            style={{
              width: `${volume * 100}%`
            }}
          />
          <input
            className="absolute z-10 h-1 w-full cursor-pointer opacity-0"
            max={1}
            min={0}
            step={0.01}
            type="range"
            value={volume}
            onChange={handleVolumeInputChange}
          />
        </div>
      </div>

      {activePlaylist?.id &&
        !activePlaylist.id.startsWith('search-results') &&
        !activePlaylist.id.startsWith('top-tracks') && (
          <Tooltip title="Go to Playlist">
            <Link
              href={
                playlistLinks[activePlaylist.id] ??
                `/playlist/${activePlaylist?.id}`
              }
            >
              <LuCircleArrowUp className="size-5 rotate-45 cursor-pointer" />
            </Link>
          </Tooltip>
        )}

      <AddToPlaylistButton
        trackId={activeTrackId}
        trackTitle={activeTrackTitle}
      >
        <Tooltip title="Add to Playlist">
          <LuCirclePlus className="size-5 cursor-pointer" />
        </Tooltip>
      </AddToPlaylistButton>

      <Tooltip title="Picture in Picture">
        <LuPictureInPicture2
          className="hover:text-primary size-5 cursor-pointer"
          onClick={onTogglePip}
        />
      </Tooltip>

      <Tooltip placement="left" title="Close Player">
        <LuCircleX
          className="size-5 cursor-pointer text-red-500 hover:text-red-600"
          onClick={stop}
        />
      </Tooltip>
    </div>
  )
}
