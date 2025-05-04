import type { Playlist, Track, User } from '@mizzo/prisma'

type TStaticPlaylist = Pick<
  Playlist,
  'id' | 'name' | 'description' | 'posterKey'
>

export const APP_PICKS_PLAYLISTS: TStaticPlaylist[] = [
  {
    id: 'mizzo-app-picks-1',
    name: 'This is one',
    description: 'Relax and indulge with beautiful piano pieces',
    posterKey:
      'https://images.unsplash.com/photo-1465659398573-cc071d2531d0?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-app-picks-2',
    name: 'Reading Adventure',
    description: 'Soundtracks for epic journeys, and the reading adventures.',
    posterKey:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-app-picks-3',
    name: 'Quiet Moment',
    description: 'Gentle classical music to help you relax and reflect.',
    posterKey:
      'https://images.unsplash.com/photo-1473396413399-6717ef7c4093?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-app-picks-4',
    name: 'Deep Focus',
    description: 'Keep calm and focus with this music',
    posterKey:
      'https://images.unsplash.com/photo-1552086197-d3c2b4d8849a?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-app-picks-5',
    name: 'Instrumental Study',
    description: 'Focus with soft study music in the background.',
    posterKey:
      'https://images.unsplash.com/photo-1504654034213-87ab9a78aa12?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-app-picks-6',
    name: 'Focus Flow',
    description: 'Up tempo instrumental hip hop beats',
    posterKey:
      'https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-app-picks-7',
    name: 'Beats to think to',
    description: 'Focus with deep techno and tech house',
    posterKey:
      'https://images.unsplash.com/photo-1665410614258-4597c84e4cab?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-app-picks-8',
    name: 'Quiet Moment',
    description: 'Gentle classical music to help you relax and reflect.',
    posterKey:
      'https://images.unsplash.com/photo-1520166012956-add9ba0835cb?fit=crop&w=500&q=100'
  }
]

export const TRENDING_PLAYLISTS: TStaticPlaylist[] = [
  {
    id: 'mizzo-trending-1',
    name: 'Peaceful Piano',
    description: 'Relax and indulge with beautiful piano pieces',
    posterKey:
      'https://images.unsplash.com/photo-1581432079854-2f6d5678b478?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-trending-2',
    name: 'Deep Focus',
    description: 'Keep calm and focus with this music',
    posterKey:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-trending-3',
    name: 'Instrumental Study',
    description: 'Focus with soft study music in the background.',
    posterKey:
      'https://images.unsplash.com/photo-1529579202889-6e0d2424bf30?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-trending-4',
    name: 'Focus Flow',
    description: 'Up tempo instrumental hip hop beats',
    posterKey:
      'https://images.unsplash.com/photo-1488376986648-2512dfc6f736?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-trending-5',
    name: 'Reading Adventure',
    description: 'Soundtracks for epic journeys, and the reading adventures.',
    posterKey:
      'https://images.unsplash.com/photo-1596415948329-c6b70309b758?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-trending-6',
    name: 'Quiet Moment',
    description: 'Gentle classical music to help you relax and reflect.',
    posterKey:
      'https://images.unsplash.com/photo-1520166012956-add9ba0835cb?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-trending-7',
    name: 'Beats to think to',
    description: 'Focus with deep techno and tech house',
    posterKey:
      'https://images.unsplash.com/photo-1536849249744-44e01e7a089d?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-trending-8',
    name: 'Reading Adventure',
    description: 'Soundtracks for epic journeys, and the reading adventures.',
    posterKey:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fit=crop&w=500&q=100'
  }
]

export const INDIA_LISTENING_PLAYLISTS: TStaticPlaylist[] = [
  {
    id: 'mizzo-india-listening-1',
    name: 'Bollywood Bangers',
    description: 'Top chart-busting tracks from recent Bollywood releases',
    posterKey:
      'https://images.unsplash.com/photo-1534800891164-a1d96b5114e7?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-india-listening-2',
    name: 'Classical Hits',
    description:
      'Immerse yourself in the timeless beauty of Indian classical hits',
    posterKey:
      'https://images.unsplash.com/photo-1617676144530-034c4cc9d79a?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-india-listening-3',
    name: 'Devotional Bliss',
    description: 'Spiritual and devotional music to calm your mind and soul',
    posterKey:
      'https://images.unsplash.com/photo-1622030254668-543c6d779833?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-india-listening-4',
    name: 'Indie India',
    description: 'Discover the best independent artists from across India',
    posterKey:
      'https://images.unsplash.com/photo-1519412666065-94acb3f8838f?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-india-listening-5',
    name: 'Punjabi Beats',
    description: 'High-energy Punjabi tracks that will get you dancing',
    posterKey:
      'https://images.unsplash.com/photo-1676804899250-18a342d77e16?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-india-listening-6',
    name: 'Fusion Vibes',
    description: 'Where traditional Indian sounds meet modern arrangements',
    posterKey:
      'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-india-listening-7',
    name: 'Regional Hits',
    description: 'Discover the best regional hits from across India',
    posterKey:
      'https://images.unsplash.com/photo-1716534133771-8ab3d772f6cb?fit=crop&w=500&q=100'
  },
  {
    id: 'mizzo-india-listening-8',
    name: 'Sufi Sanctuary',
    description: 'Lose yourself in the spiritual depth of Sufi masterpieces',
    posterKey:
      'https://images.unsplash.com/photo-1475275166152-f1e8005f9854?fit=crop&w=500&q=100'
  }
]

export const playlistCollectionMap: Record<
  string,
  {
    heading: string
    playlists: TStaticPlaylist[]
  }
> = {
  app_picks: {
    heading: 'Mizzo Picks',
    playlists: APP_PICKS_PLAYLISTS
  },
  most_played: {
    heading: 'Most Played',
    playlists: TRENDING_PLAYLISTS
  },
  india_listening: {
    heading: 'India Listening',
    playlists: INDIA_LISTENING_PLAYLISTS
  }
}

type TGetStaticPlaylistResponse = Playlist & {
  owner: Pick<User, 'id' | 'name'>
  playlistTracks: (Track & {
    primaryArtist: Pick<User, 'id' | 'name'>
  })[]
}

export const getStaticPlaylist = (
  playlistId: string
): TGetStaticPlaylistResponse | null => {
  const allStaticPlaylists = Object.values(playlistCollectionMap).flatMap(
    (collection) => collection.playlists
  )

  const staticPlaylist = allStaticPlaylists.find((p) => p.id === playlistId)

  if (!staticPlaylist) {
    return null
  }

  return {
    id: staticPlaylist.id,
    name: staticPlaylist.name,
    description: staticPlaylist.description,
    posterKey: staticPlaylist.posterKey,
    likes: 0,
    isPublic: true,
    status: 'PUBLISHED',
    ownerId: 'mizzo',
    owner: {
      id: 'mizzo',
      name: 'Mizzo'
    },
    playlistTracks: [],
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
  }
}
