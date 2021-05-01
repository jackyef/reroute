import { updateRedirect } from '@/utils/github/updateRedirect'
import { NowRequest, NowResponse } from '@now/node'

export default async (req: NowRequest, res: NowResponse) => {
  const url = String(req.query.url || '')

  if (url) {
    try {
      // check if it's a valid URL
      // will throw an error if it's not
      new URL(url)

      const rerouteId = await updateRedirect(url)

      res.status(200)
      res.json({ rerouteId })
    } catch (err) {
      const debugInfo =
        process.env.NODE_ENV === 'development'
          ? {
              error: err.message,
              stack: err.stack,
            }
          : {}
      res.status(500).json({ message: '😱', ...debugInfo })
    }
  } else {
    res.status(403).json({ message: '😠' })
  }
}
