import * as readline from 'readline'

import { prisma } from '@mizzo/prisma'

async function getUserConfirmation(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'y')
    })
  })
}

const publishTracks = async () => {
  try {
    console.log('🚀 Starting track publishing process...\n')

    // Count total tracks with REVIEWING status
    const totalReviewingTracks = await prisma.track.count({
      where: {
        status: 'REVIEWING'
      }
    })

    if (totalReviewingTracks === 0) {
      console.log('✅ No tracks found with REVIEWING status')
      return
    }

    console.log(
      `📊 Found ${totalReviewingTracks} tracks with REVIEWING status\n`
    )

    // Warning and confirmation
    console.log('⚠️  WARNING: This action will:')
    console.log(
      `   - Update ${totalReviewingTracks} tracks from REVIEWING to PUBLISHED status`
    )
    console.log('   - Set updatedAt to createdAt + 18 hours for each track')
    console.log('   - This action cannot be undone\n')

    const confirmed = await getUserConfirmation(
      'Do you want to proceed? (y/n): '
    )

    if (!confirmed) {
      console.log('\n❌ Operation cancelled by user')
      return
    }

    console.log('\n🔄 Processing tracks...')

    // Update all tracks with REVIEWING status to PUBLISHED
    const result = await prisma.track.updateMany({
      where: {
        status: 'REVIEWING'
      },
      data: {
        status: 'PUBLISHED',
        updatedAt: new Date()
      }
    })

    const successCount = result.count

    console.log(`\n🎉 Successfully published ${successCount} tracks!`)
  } catch (error) {
    console.error('\n❌ Error publishing tracks:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// CLI execution
publishTracks()
  .then(() => {
    console.log('✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
