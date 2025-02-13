import { Router } from 'express'

import { addTrackToPlaylist } from '../controllers/playlist/add-track-to-playlist'
import { createPlaylist } from '../controllers/playlist/create-playlist'
import { deletePlaylistById } from '../controllers/playlist/delete-playlist-by-id'
import { getLikeStatusOfPlaylist } from '../controllers/playlist/get-like-status-of-playlist'
import { getLikedPlaylists } from '../controllers/playlist/get-liked-playlists'
import { getLikedTracks } from '../controllers/playlist/get-liked-tracks'
import { getMyPlaylists } from '../controllers/playlist/get-my-playlists'
import { removeTrackFromPlaylist } from '../controllers/playlist/remove-track-from-playlist'
import { toggleLikeOfPlaylist } from '../controllers/playlist/toggle-like-of-playlist'
import { togglePublicViewOfPlaylist } from '../controllers/playlist/toggle-public-view-of-playlist'
import { updatePlaylist } from '../controllers/playlist/update-playlist'
import { isAuthenticatedUser } from '../middlewares/user-authentication'

const router = Router()

// Create playlist
router.post('/create', isAuthenticatedUser, createPlaylist)

// Update playlist details
router.put('/:playlistId', isAuthenticatedUser, updatePlaylist)

// Add a new track to playlist
router.post('/add-track', isAuthenticatedUser, addTrackToPlaylist)

// Get playlists created by user
router.get('/my-playlists', isAuthenticatedUser, getMyPlaylists)

// Get liked tracks
router.get('/liked-tracks', isAuthenticatedUser, getLikedTracks)

// Get liked playlists
router.get('/liked-playlists', isAuthenticatedUser, getLikedPlaylists)

// Check like status
router.get('/:playlistId/like', isAuthenticatedUser, getLikeStatusOfPlaylist)

// Toggle like (like <-> unlike)
router.put('/:playlistId/like', isAuthenticatedUser, toggleLikeOfPlaylist)

// Toggle public visibility
router.put(
  '/:playlistId/public-view',
  isAuthenticatedUser,
  togglePublicViewOfPlaylist
)

// Remove a track from a playlist
router.delete('/remove-track', isAuthenticatedUser, removeTrackFromPlaylist)

// Delete playlist by ID
router.delete('/:playlistId', isAuthenticatedUser, deletePlaylistById)

export { router as playlistRouter }
