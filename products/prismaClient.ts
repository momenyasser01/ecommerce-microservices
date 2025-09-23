import { PrismaClient } from '@prisma/client'

declare global {
  var prismaClient: PrismaClient | undefined
}

const prisma = globalThis.prismaClient || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaClient = prisma
}

if (prisma) console.log('Prisma client initialized')

export default prisma
