import { Router } from 'express'

import { searchPlaylistByPlaylistId } from '../controllers/search/search-playlist-by-playlist-id'
import { searchPlaylistsAsCollection } from '../controllers/search/search-playlists-as-collection'
import { searchPlaylistsByPlaylistName } from '../controllers/search/search-playlists-by-playlist-name'
import { searchPlaylistsByUserId } from '../controllers/search/search-playlists-by-user-id'
import { searchTrackByTrackId } from '../controllers/search/search-track-by-track-id'
import { searchTracksByTrackName } from '../controllers/search/search-tracks-by-track-name'
import { searchTracksByUserId } from '../controllers/search/search-tracks-by-user-id'
import { searchUserByUserId } from '../controllers/search/search-user-by-user-id'
import { searchUsersByUserName } from '../controllers/search/search-users-by-user-name'
import { addRequestorDetails } from '../middlewares/requestor'

const router = Router()

// Base route : /api/v1/search

// Users
router.get('/user/:userId', searchUserByUserId)
router.get('/user/name/:search', searchUsersByUserName)

// Tracks
router.get('/track/:trackId', addRequestorDetails, searchTrackByTrackId)
router.get('/track/name/:search', searchTracksByTrackName)
router.get('/user/:userId/track', searchTracksByUserId)

// Playlists
router.get('/playlist/collections/:search', searchPlaylistsAsCollection)
router.get('/playlist/name/:search', searchPlaylistsByPlaylistName)
router.get(
  '/playlist/:playlistId',
  addRequestorDetails,
  searchPlaylistByPlaylistId
)
router.get('/user/:userId/playlist', searchPlaylistsByUserId)

export { router as searchRouter }
