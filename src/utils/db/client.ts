// Prisma doesn't support `mysql2://` scheme, while planet scale uses it.
// Changing this to `mysql://` works though, so we are changing this before
// initializing the PrismaClient
process.env.DATABASE_URL = process.env.DATABASE_URL?.replace('mysql2', 'mysql')

// eslint-disable-next-line
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export { prisma }
