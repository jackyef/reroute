import { prisma } from '@/utils/db/client'
import { NowRequest, NowResponse } from '@now/node'
import { nanoid } from 'nanoid'

const isDev = process.env.NODE_ENV === 'development'

export default async (req: NowRequest, res: NowResponse) => {
  const { query } = req
  const url = String(query.url || '')

  if (url) {
    try {
      // check if it's a valid URL
      // will throw an error if it's not
      new URL(url)

      const rerouteId = nanoid(10)

      await prisma.routes.create({
        data: {
          id: rerouteId,
          destination: url,
        },
      })

      res.status(200)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.json({ rerouteId })
    } catch (err) {
      console.error('DB_URL', process.env.DATABASE_URL)
      const debugInfo = isDev
        ? {
            error: err.message,
            stack: err.stack,
          }
        : {}
      res.status(500).json({ message: '😱', ...debugInfo })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.status(403).json({ message: '😠' })
  }
}
