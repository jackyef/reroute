import { PrismaClient } from '@prisma/client'

const {
  DATABASE_URL,

  // The followings are only available on vercel deployments
  PLANETSCALE_DB_USERNAME,
  PLANETSCALE_DB_PASSWORD,
  PLANETSCALE_DB_HOST,
  PLANETSCALE_SSL_CERT_PATH,
} = process.env

// Used on vercel deployments
const DB_URL = `mysql://${PLANETSCALE_DB_USERNAME}:${PLANETSCALE_DB_PASSWORD}@${PLANETSCALE_DB_HOST}/reroute?sslmode=require&sslaccept=strict&sslcert=${PLANETSCALE_SSL_CERT_PATH}`

const prisma = DATABASE_URL
  ? new PrismaClient()
  : new PrismaClient({
      datasources: {
        db: {
          url: DB_URL,
        },
      },
    })

export { prisma }
