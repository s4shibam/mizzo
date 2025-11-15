import { exec } from 'child_process'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as readline from 'readline'
import { promisify } from 'util'

import { Prisma, Status } from '@prisma/client'
import bcryptjs from 'bcryptjs'

import {
  S3_DIRECTORIES,
  s3DeleteFolder,
  s3UploadObject,
  sqsPurgeQueue,
  type TS3Directory
} from '@mizzo/aws'
import { prisma } from '@mizzo/prisma'

import {
  SEED_ADMIN_WITH_PROFILE,
  SEED_PLAYLIST_TRACKS,
  SEED_PLAYLISTS,
  SEED_TRACKS,
  SEED_USER_ARTIST_APPLICATIONS,
  SEED_USERS_WITH_PROFILE
} from './data'

const execAsync = promisify(exec)

const TEMP_DIR = path.join(process.cwd(), '.temp')

// Batch processing configuration for tracks
const TRACK_BATCH_SIZE = 50

// Hash password using bcryptjs
const hashPassword = async ({
  password
}: {
  password: string
}): Promise<string> => {
  return await bcryptjs.hash(password, 10)
}

// Ask for user permission before running the seed script
const askPermission = async (): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(
      '\n🚨 WARNING: This will delete all existing data and reseed the database.\n' +
        'Do you want to continue? (y/n): ',
      (answer) => {
        rl.close()
        resolve(answer.toLowerCase() === 'y')
      }
    )
  })
}

// Check if yt-dlp is installed
const checkYtDlpInstalled = async (): Promise<boolean> => {
  try {
    await execAsync('yt-dlp --version')
    return true
  } catch {
    return false
  }
}

// Ask for password suffix
const askPasswordSuffix = async (): Promise<string | undefined> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(
      '\n🔐 Enter password suffix to append to username (press Enter to skip): ',
      (answer) => {
        rl.close()
        resolve(answer)
      }
    )
  })
}

// Download image from URL
const downloadImage = async ({
  url,
  outputPath
}: {
  url: string
  outputPath: string
}): Promise<void> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`)
    }
    const buffer = Buffer.from(await response.arrayBuffer())
    await fs.writeFile(outputPath, buffer)
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error)
    throw error
  }
}

// Download audio from YouTube using yt-dlp
const downloadYouTubeAudio = async ({
  url,
  outputPath
}: {
  url: string
  outputPath: string
}): Promise<void> => {
  try {
    // Download as mp3 at 128Kb/s
    const command = `yt-dlp -x --audio-format mp3 --audio-quality 128K -o "${outputPath}" "${url}"`
    await execAsync(command)
  } catch (error) {
    console.error(`Error downloading audio from ${url}:`, error)
    throw error
  }
}

// Get file extension from URL
const getFileExtension = ({ url }: { url: string }): string => {
  // For Spotify CDN images, default to jpg
  if (url.includes('scdn.co')) {
    return 'jpg'
  }
  const match = url.match(/\.([a-z0-9]+)(?:[?#]|$)/i)
  return match ? match[1] : 'jpg'
}

// Extract YouTube video ID from URL
const getYouTubeVideoId = ({ url }: { url: string }): string | null => {
  const videoId = url.split('?v=')[1]

  if (!videoId) {
    return null
  }

  return videoId
}

// Get YouTube thumbnail URLs
const getYouTubeThumbnailUrl = ({
  youtubeUrl
}: {
  youtubeUrl: string
}): string[] | null => {
  const videoId = getYouTubeVideoId({ url: youtubeUrl })
  if (!videoId) {
    return null
  }

  return [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  ]
}

// Upload file to S3
const uploadToS3 = async ({
  filePath,
  s3Directory,
  fileName,
  contentType
}: {
  filePath: string
  s3Directory: TS3Directory
  fileName: string
  contentType: string
}): Promise<string> => {
  try {
    const buffer = await fs.readFile(filePath)
    const s3Key = `${s3Directory}/${fileName}`

    await s3UploadObject({
      s3Key,
      buffer,
      contentType
    })
    return s3Key
  } catch (error) {
    console.error(`Error uploading to S3: ${filePath}`, error)
    throw error
  }
}

// Get audio duration using ffprobe
const getAudioDuration = async ({
  filePath
}: {
  filePath: string
}): Promise<number> => {
  try {
    const { stdout } = await execAsync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`
    )
    return Math.round(parseFloat(stdout.trim()))
  } catch (error) {
    console.error(`Error getting audio duration for ${filePath}:`, error)
    return 0
  }
}

// Clean up temporary directory
const cleanupTempDir = async (): Promise<void> => {
  try {
    await fs.rm(TEMP_DIR, { recursive: true, force: true })
  } catch (error) {
    console.error('Error cleaning up temp directory:', error)
  }
}

// Ensure temporary directory exists
const ensureTempDir = async (): Promise<void> => {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true })
  } catch (error) {
    console.error('Error creating temp directory:', error)
    throw error
  }
}

// Process and upload user avatar
const processUserAvatar = async ({
  userId,
  avatarUrl
}: {
  userId: string
  avatarUrl: string
}): Promise<string | null> => {
  try {
    const ext = getFileExtension({ url: avatarUrl })
    const tempPath = path.join(TEMP_DIR, `avatar-${userId}.${ext}`)

    console.log(`  Downloading avatar for user ${userId}...`)
    await downloadImage({ url: avatarUrl, outputPath: tempPath })

    console.log(`  Uploading avatar to S3...`)
    const s3Key = await uploadToS3({
      filePath: tempPath,
      s3Directory: 'user-data',
      fileName: `${userId}.${ext}`,
      contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`
    })

    // Clean up temp file
    await fs.unlink(tempPath)

    return s3Key
  } catch (error) {
    console.error(`Error processing avatar for user ${userId}:`, error)
    return null
  }
}

// Process and upload playlist poster
const processPlaylistPoster = async ({
  playlistId,
  posterUrl
}: {
  playlistId: string
  posterUrl: string
}): Promise<string | null> => {
  try {
    const ext = getFileExtension({ url: posterUrl })
    const tempPath = path.join(TEMP_DIR, `playlist-${playlistId}.${ext}`)

    console.log(`  Downloading poster for playlist ${playlistId}...`)
    await downloadImage({ url: posterUrl, outputPath: tempPath })

    console.log(`  Uploading poster to S3...`)
    const s3Key = await uploadToS3({
      filePath: tempPath,
      s3Directory: 'playlist-poster',
      fileName: `${playlistId}.${ext}`,
      contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`
    })

    // Clean up temp file
    await fs.unlink(tempPath)

    return s3Key
  } catch (error) {
    console.error(`Error processing poster for playlist ${playlistId}:`, error)
    return null
  }
}

// Process and upload track poster (thumbnail)
const processTrackPoster = async ({
  trackId,
  youtubeUrl
}: {
  trackId: string
  youtubeUrl: string
}): Promise<string | null> => {
  try {
    // Get YouTube thumbnail URLs
    const thumbnailUrls = getYouTubeThumbnailUrl({ youtubeUrl })
    if (!thumbnailUrls) {
      console.log(`  No thumbnail URL found for track ${trackId}`)
      return null
    }

    const tempPath = path.join(TEMP_DIR, `track-poster-${trackId}.jpg`)

    console.log(`    Downloading thumbnail for track ${trackId}...`)

    try {
      await downloadImage({ url: thumbnailUrls[0], outputPath: tempPath })
    } catch (error) {
      console.log(`    720p thumbnail failed, trying 360p thumbnail ...`)
      const videoId = getYouTubeVideoId({ url: youtubeUrl })
      if (videoId) {
        await downloadImage({ url: thumbnailUrls[1], outputPath: tempPath })
      } else {
        throw error
      }
    }

    console.log(`    Uploading thumbnail to S3...`)
    const s3Key = await uploadToS3({
      filePath: tempPath,
      s3Directory: 'track-poster',
      fileName: `${trackId}.jpg`,
      contentType: 'image/jpeg'
    })

    // Clean up temp file
    await fs.unlink(tempPath)

    return s3Key
  } catch (error) {
    console.error(`Error processing thumbnail for track ${trackId}:`, error)
    return null
  }
}

// Process and upload track audio
const processTrack = async ({
  trackId,
  youtubeUrl
}: {
  trackId: string
  youtubeUrl: string
}): Promise<{
  trackKey: string | null
  posterKey: string | null
  duration: number
}> => {
  let trackKey: string | null = null
  let posterKey: string | null = null
  let duration = 0 // Default duration

  try {
    // Process thumbnail first (faster operation)
    posterKey = await processTrackPoster({ trackId, youtubeUrl })

    // Process audio
    const tempAudioPath = path.join(TEMP_DIR, `track-${trackId}.mp3`)

    console.log(`    Downloading audio from YouTube for track ${trackId}...`)
    await downloadYouTubeAudio({ url: youtubeUrl, outputPath: tempAudioPath })

    console.log(`  Getting audio duration...`)
    duration = await getAudioDuration({ filePath: tempAudioPath })

    console.log(`  Uploading audio to S3...`)
    trackKey = await uploadToS3({
      filePath: tempAudioPath,
      s3Directory: 'raw-track',
      fileName: `${trackId}.mp3`,
      contentType: 'audio/mpeg'
    })

    await fs.unlink(tempAudioPath)

    return { trackKey, posterKey, duration }
  } catch (error) {
    console.error(`Error processing track ${trackId}:`, error)
    return { trackKey, posterKey, duration }
  }
}

// Clear all S3 storage folders
const clearS3Storage = async (): Promise<void> => {
  console.log('\n📂 Clearing S3 storage...')

  try {
    const folders = Object.values(S3_DIRECTORIES)

    for (const folder of folders) {
      console.log(`  Deleting ${folder}...`)
      const result = await s3DeleteFolder({ folderPath: folder })
      console.log(`  ✓ Deleted ${result.deletedCount} objects from ${folder}`)
    }

    console.log('✅ S3 storage cleared successfully')
  } catch (error) {
    console.error('❌ Error clearing S3 storage:', error)
    throw error
  }
}

// Clear SQS queue
const clearSQSQueue = async (): Promise<void> => {
  console.log('\n📨 Clearing SQS queue...')

  try {
    const result = await sqsPurgeQueue()

    if (result) {
      console.log('✅ SQS queue cleared successfully')
    } else {
      console.log('⚠️  SQS queue purge failed')
    }
  } catch (error) {
    console.error('❌ Error clearing SQS queue:', error)
    throw error
  }
}

// Clear all existing data from the database
const clearDatabase = async (): Promise<void> => {
  console.log('\n📦 Clearing existing database data...')

  try {
    // Delete in correct order to respect foreign key constraints
    await prisma.notification.deleteMany()
    await prisma.playlistTrack.deleteMany()
    await prisma.likedPlaylist.deleteMany()
    await prisma.likedTrack.deleteMany()
    await prisma.playlist.deleteMany()
    await prisma.track.deleteMany()
    await prisma.userArtistApplication.deleteMany()
    await prisma.userResetToken.deleteMany()
    await prisma.userProfile.deleteMany()
    await prisma.otp.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Database cleared successfully')
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    throw error
  }
}

// Seed users and user profiles
const seedUsers = async ({
  passwordSuffix
}: {
  passwordSuffix?: string
}): Promise<void> => {
  console.log('\n👥 Seeding users and profiles...')

  try {
    const usersToCreate: Prisma.UserCreateManyInput[] = []
    const profilesToCreate: Prisma.UserProfileCreateManyInput[] = []

    // Add admin user
    const password = SEED_ADMIN_WITH_PROFILE.username + passwordSuffix
    const adminPassword = await hashPassword({ password })

    usersToCreate.push({
      id: SEED_ADMIN_WITH_PROFILE.id,
      name: SEED_ADMIN_WITH_PROFILE.name,
      email: SEED_ADMIN_WITH_PROFILE.email,
      password: adminPassword,
      isAdmin: true,
      isArtist: true,
      isPremiumUser: true,
      isPublicProfile: true,
      createdAt: SEED_ADMIN_WITH_PROFILE.createdAt,
      updatedAt: SEED_ADMIN_WITH_PROFILE.createdAt
    })

    profilesToCreate.push({
      userId: SEED_ADMIN_WITH_PROFILE.id,
      bio: SEED_ADMIN_WITH_PROFILE.bio,
      facebook: 'https://www.facebook.com/' + SEED_ADMIN_WITH_PROFILE.username,
      instagram:
        'https://www.instagram.com/' + SEED_ADMIN_WITH_PROFILE.username,
      twitter: 'https://www.twitter.com/' + SEED_ADMIN_WITH_PROFILE.username
    })

    // Process artist users with avatars
    let processedCount = 0
    for (const userData of SEED_USERS_WITH_PROFILE) {
      processedCount++
      console.log(
        `\nProcessing user ${processedCount}/${SEED_USERS_WITH_PROFILE.length}: ${userData.name}`
      )

      const password = userData.username + passwordSuffix
      const hashedPassword = await hashPassword({ password })

      // Download and upload avatar
      const avatarKey = await processUserAvatar({
        userId: userData.id,
        avatarUrl: userData.avatarUrl
      })

      usersToCreate.push({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        isAdmin: false,
        isArtist: true,
        isPremiumUser: false,
        isPublicProfile: true,
        createdAt: userData.createdAt,
        updatedAt: userData.createdAt
      })

      profilesToCreate.push({
        userId: userData.id,
        avatarKey,
        bio: userData.bio,
        facebook: 'https://www.facebook.com/' + userData.username,
        instagram: 'https://www.instagram.com/' + userData.username,
        twitter: 'https://www.twitter.com/' + userData.username
      })
    }

    // Bulk insert users and profiles
    console.log('\n💾 Bulk inserting users...')
    await prisma.user.createMany({ data: usersToCreate })

    console.log('💾 Bulk inserting profiles...')
    await prisma.userProfile.createMany({ data: profilesToCreate })

    console.log(`✅ Created ${usersToCreate.length} users with profiles`)
  } catch (error) {
    console.error('❌ Error seeding users:', error)
    throw error
  }
}

// Seed user artist applications
const seedArtistApplications = async (): Promise<void> => {
  console.log('\n🎨 Seeding artist applications...')

  try {
    const applicationsToCreate: Prisma.UserArtistApplicationCreateManyInput[] =
      SEED_USER_ARTIST_APPLICATIONS.map((app) => ({
        userId: app.userId,
        message: app.message,
        isApproved: true,
        idProofType: app.idProofType,
        idProofKey: null,
        createdAt: app.createdAt
      }))

    await prisma.userArtistApplication.createMany({
      data: applicationsToCreate
    })

    console.log(`✅ Created ${applicationsToCreate.length} artist applications`)
  } catch (error) {
    console.error('❌ Error seeding artist applications:', error)
    throw error
  }
}

// Process tracks in batches with concurrency control
const processTracksBatch = async ({
  tracks,
  batchNumber,
  totalBatches
}: {
  tracks: typeof SEED_TRACKS
  batchNumber: number
  totalBatches: number
}): Promise<{
  tracksToCreate: Prisma.TrackCreateManyInput[]
  trackSecondaryArtists: Array<{ trackId: string; artistId: string }>
}> => {
  console.log(
    `\n📦 Processing batch ${batchNumber}/${totalBatches} (${tracks.length} tracks)`
  )

  const tracksToCreate: Prisma.TrackCreateManyInput[] = []
  const trackSecondaryArtists: Array<{ trackId: string; artistId: string }> = []

  // Process tracks in parallel within the batch
  const trackPromises = tracks.map(async (trackData, index) => {
    const trackNumber = (batchNumber - 1) * TRACK_BATCH_SIZE + index + 1
    console.log(`📀 Processing track ${trackNumber}: ${trackData.title}`)

    try {
      // Process track media
      const { trackKey, posterKey, duration } = await processTrack({
        trackId: trackData.id,
        youtubeUrl: trackData.youtubeUrl
      })

      const trackToCreate: Prisma.TrackCreateManyInput = {
        id: trackData.id,
        primaryArtistId: trackData.primaryArtistId,
        title: trackData.title,
        language: trackData.language.toLowerCase(),
        tags: trackData.tags,
        duration,
        posterKey,
        trackKey,
        isPublic: true,
        likes: Math.floor(Math.random() * 1_00_000),
        listens: Math.floor(Math.random() * 10_00_000),
        createdAt: trackData.createdAt
      }

      // Collect secondary artists for this track
      const secondaryArtists = trackData.secondaryArtists.map((artistId) => ({
        trackId: trackData.id,
        artistId
      }))

      console.log(`✅ Completed track: ${trackData.title}`)
      return { trackToCreate, secondaryArtists }
    } catch (error) {
      console.error(`❌ Failed to process track: ${trackData.title}`, error)
      // Return a track with minimal data if processing fails
      return {
        trackToCreate: {
          id: trackData.id,
          primaryArtistId: trackData.primaryArtistId,
          title: trackData.title,
          language: trackData.language.toLowerCase(),
          tags: trackData.tags,
          duration: 0,
          posterKey: null,
          trackKey: null,
          status: Status.FAILED, // Mark as failed if processing failed
          isPublic: false,
          likes: 0,
          listens: 0,
          createdAt: trackData.createdAt
        },
        secondaryArtists: trackData.secondaryArtists.map((artistId) => ({
          trackId: trackData.id,
          artistId
        }))
      }
    }
  })

  // Wait for all tracks in this batch to complete
  const results = await Promise.all(trackPromises)

  // Collect results
  for (const result of results) {
    tracksToCreate.push(result.trackToCreate)
    trackSecondaryArtists.push(...result.secondaryArtists)
  }

  console.log(`✅ Completed batch ${batchNumber}/${totalBatches}`)
  return { tracksToCreate, trackSecondaryArtists }
}

/**
 * Seed tracks with batch processing for better performance
 */
const seedTracks = async (): Promise<void> => {
  console.log('\n🎵 Seeding tracks...')

  try {
    // Configuration for batch processing
    const totalTracks = SEED_TRACKS.length
    const totalBatches = Math.ceil(totalTracks / TRACK_BATCH_SIZE)

    console.log(
      `📊 Processing ${totalTracks} tracks in ${totalBatches} batches of ${TRACK_BATCH_SIZE}`
    )

    const allTracksToCreate: Prisma.TrackCreateManyInput[] = []
    const allTrackSecondaryArtists: Array<{
      trackId: string
      artistId: string
    }> = []

    // Process tracks in batches
    for (let i = 0; i < totalBatches; i++) {
      const startIndex = i * TRACK_BATCH_SIZE
      const endIndex = Math.min(startIndex + TRACK_BATCH_SIZE, totalTracks)
      const batchTracks = SEED_TRACKS.slice(startIndex, endIndex)

      const { tracksToCreate, trackSecondaryArtists } =
        await processTracksBatch({
          tracks: batchTracks,
          batchNumber: i + 1,
          totalBatches
        })

      allTracksToCreate.push(...tracksToCreate)
      allTrackSecondaryArtists.push(...trackSecondaryArtists)
    }

    // Bulk insert all tracks
    console.log('\n💾 Bulk inserting all tracks...')
    await prisma.track.createMany({ data: allTracksToCreate })

    // Connect secondary artists
    if (allTrackSecondaryArtists.length > 0) {
      console.log('🔗 Connecting secondary artists...')
      for (const { trackId, artistId } of allTrackSecondaryArtists) {
        await prisma.track.update({
          where: { id: trackId },
          data: {
            secondaryArtists: {
              connect: { id: artistId }
            }
          }
        })
      }
    }

    const successfulTracks = allTracksToCreate.filter(
      (track) => track.status === Status.PUBLISHED
    ).length
    const failedTracks = allTracksToCreate.length - successfulTracks

    console.log(
      `✅ Created ${allTracksToCreate.length} tracks (${successfulTracks} successful, ${failedTracks} failed)`
    )
  } catch (error) {
    console.error('❌ Error seeding tracks:', error)
    throw error
  }
}

/**
 * Seed playlists
 */
const seedPlaylists = async (): Promise<void> => {
  console.log('\n🎧 Seeding playlists...')

  try {
    const playlistsToCreate: Prisma.PlaylistCreateManyInput[] = []

    let processedCount = 0
    for (const playlistData of SEED_PLAYLISTS) {
      processedCount++
      console.log(
        `\nProcessing playlist ${processedCount}/${SEED_PLAYLISTS.length}: ${playlistData.name}`
      )

      // Download and upload poster
      const posterKey = await processPlaylistPoster({
        playlistId: playlistData.id,
        posterUrl: playlistData.posterUrl
      })

      playlistsToCreate.push({
        id: playlistData.id,
        ownerId: playlistData.ownerId,
        name: playlistData.name,
        description: playlistData.description,
        status: 'PUBLISHED',
        isPublic: true,
        likes: Math.floor(Math.random() * 5000),
        posterKey,
        createdAt: playlistData.createdAt
      })
    }

    // Bulk insert playlists
    console.log('\n💾 Bulk inserting playlists...')
    await prisma.playlist.createMany({ data: playlistsToCreate })

    console.log(`✅ Created ${playlistsToCreate.length} playlists`)
  } catch (error) {
    console.error('❌ Error seeding playlists:', error)
    throw error
  }
}

/**
 * Seed playlist tracks
 */
const seedPlaylistTracks = async (): Promise<void> => {
  console.log('\n🔗 Seeding playlist tracks...')

  try {
    const playlistTracksToCreate: Prisma.PlaylistTrackCreateManyInput[] =
      SEED_PLAYLIST_TRACKS.map((pt) => ({
        playlistId: pt.playlistId,
        trackId: pt.trackId,
        createdAt: new Date()
      }))

    await prisma.playlistTrack.createMany({
      data: playlistTracksToCreate
    })

    console.log(
      `✅ Created ${playlistTracksToCreate.length} playlist-track relationships`
    )
  } catch (error) {
    console.error('❌ Error seeding playlist tracks:', error)
    throw error
  }
}

/**
 * Seed additional engagement data (likes, etc.)
 */
const seedEngagementData = async (): Promise<void> => {
  console.log('\n💬 Seeding engagement data...')

  try {
    // Get all users and tracks for generating likes
    const users = await prisma.user.findMany({ select: { id: true } })
    const tracks = await prisma.track.findMany({ select: { id: true } })
    const playlists = await prisma.playlist.findMany({ select: { id: true } })

    const likedTracksToCreate: Prisma.LikedTrackCreateManyInput[] = []
    const likedPlaylistsToCreate: Prisma.LikedPlaylistCreateManyInput[] = []

    // Generate some random likes (each user likes 10-30 tracks)
    for (const user of users) {
      const numTrackLikes = Math.floor(Math.random() * 21) + 10 // 10-30
      const shuffledTracks = tracks.sort(() => 0.5 - Math.random())

      for (let i = 0; i < Math.min(numTrackLikes, tracks.length); i++) {
        likedTracksToCreate.push({
          userId: user.id,
          trackId: shuffledTracks[i].id,
          createdAt: new Date()
        })
      }

      // Each user likes 3-8 playlists
      const numPlaylistLikes = Math.floor(Math.random() * 6) + 3 // 3-8
      const shuffledPlaylists = playlists.sort(() => 0.5 - Math.random())

      for (let i = 0; i < Math.min(numPlaylistLikes, playlists.length); i++) {
        likedPlaylistsToCreate.push({
          userId: user.id,
          playlistId: shuffledPlaylists[i].id,
          createdAt: new Date()
        })
      }
    }

    console.log('💾 Bulk inserting liked tracks...')
    await prisma.likedTrack.createMany({
      data: likedTracksToCreate,
      skipDuplicates: true
    })

    console.log('💾 Bulk inserting liked playlists...')
    await prisma.likedPlaylist.createMany({
      data: likedPlaylistsToCreate,
      skipDuplicates: true
    })

    console.log(
      `✅ Created engagement data (${likedTracksToCreate.length} track likes, ${likedPlaylistsToCreate.length} playlist likes)`
    )
  } catch (error) {
    console.error('❌ Error seeding engagement data:', error)
    throw error
  }
}

// Main function
const main = async () => {
  try {
    console.log('🚀 Starting database seed process...\n')

    // Ask for permission
    const hasPermission = await askPermission()
    if (!hasPermission) {
      console.log('\n❌ Seed process cancelled by user')
      process.exit(0)
    }

    // Check if yt-dlp is installed
    console.log('\n🔍 Checking yt-dlp installation...')
    const isYtDlpInstalled = await checkYtDlpInstalled()

    if (!isYtDlpInstalled) {
      console.log('❌ yt-dlp is not installed. Please install it first.')
      process.exit(1)
    }
    console.log('✅ yt-dlp is installed')

    // Ask for password suffix
    const passwordSuffix = await askPasswordSuffix()
    if (passwordSuffix) {
      console.log(`✅ Password suffix set: "${passwordSuffix}"`)
    } else {
      console.log('✅ No password suffix (passwords will be same as usernames)')
    }

    // Ensure temp directory exists
    await ensureTempDir()

    // Execute seeding steps
    await clearS3Storage()
    await clearSQSQueue()
    await clearDatabase()
    await seedUsers({ passwordSuffix })
    await seedArtistApplications()
    await seedTracks()
    await seedPlaylists()
    await seedPlaylistTracks()
    await seedEngagementData()

    console.log('\n✨ Database seeding completed successfully! ✨\n')
  } catch (error) {
    console.error('\n❌ Error during seeding:', error)
    process.exit(1)
  } finally {
    // Clean up
    await cleanupTempDir()
    await prisma.$disconnect()
  }
}

main()
