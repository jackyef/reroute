import { NowRequest, NowResponse } from '@now/node'

export default async (req: NowRequest, res: NowResponse) => {
  const url = req.query.url || ''

  if (url) {
    // TODO: Update the `redirects` array in `vercel.json`
    try {
      res.status(200)
      res.json({ message: '' })
    } catch (err) {
      res
        .status(500)
        .json({ message: '😱', error: err.message, stack: err.stack })
    }
  } else {
    res.status(403).json({ message: '😠' })
  }
}
