import { prisma } from '.'

const main = async () => {
  try {
    console.log('No seed script available')
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
