import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const client = new PrismaClient().$extends(withAccelerate())

export default client