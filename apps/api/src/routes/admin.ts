import { Router } from 'express'

import { getAdminDashboardSummary } from '../controllers/admin/get-admin-dashboard-summary'
import { getAllAdmins } from '../controllers/admin/get-all-admins'
import { getAllArtistApplications } from '../controllers/admin/get-all-artist-applications'
import { getAllPlaylists } from '../controllers/admin/get-all-playlists'
import { getAllTracks } from '../controllers/admin/get-all-tracks'
import { getAllUsers } from '../controllers/admin/get-all-users'
import { getUsersByEmail } from '../controllers/admin/get-users-by-email'
import { manageArtistApplication } from '../controllers/admin/manage-artist-application'
import { updateAdmin } from '../controllers/admin/update-admin'
import { updatePlaylist } from '../controllers/admin/update-playlist'
import { updateTrack } from '../controllers/admin/update-track'
import { updateUser } from '../controllers/admin/update-user'
import { isAdmin } from '../middlewares/administrator'

const router = Router()

router.get('/home/dashboard-summary', isAdmin, getAdminDashboardSummary)

router.get('/user/all', isAdmin, getAllUsers)

router.get('/user/email/:email', isAdmin, getUsersByEmail)

router.put('/user/:userId', isAdmin, updateUser)

router.get('/track/all', isAdmin, getAllTracks)

router.put('/track/:trackId', isAdmin, updateTrack)

router.get('/playlist/all', isAdmin, getAllPlaylists)

router.put('/playlist/:playlistId', isAdmin, updatePlaylist)

router.get('/admin/all', isAdmin, getAllAdmins)

router.put('/admin/:adminId', isAdmin, updateAdmin)

router.get('/artist-applications', isAdmin, getAllArtistApplications)

router.put('/artist-application/:userId', isAdmin, manageArtistApplication)

export { router as adminRouter }
