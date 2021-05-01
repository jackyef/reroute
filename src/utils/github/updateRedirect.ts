import { nanoid } from 'nanoid'
import fetch from 'node-fetch'

const ghRepoOwner = 'jackyef'
const ghRepoName = 'reroute'
const ghToken = process.env['GH_TOKEN'] || ''

const baseHeaders = {
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  Authorization: `token ${ghToken}`,
  'User-Agent': 'jackyef-gh-reroute',
}

// use GET to get content
// https://developer.github.com/v3/repos/contents/#get-repository-content
// use PUT to update content
// https://developer.github.com/v3/repos/contents/#create-or-update-file-contents
const ghContentEndpoint = `https://api.github.com/repos/${ghRepoOwner}/${ghRepoName}/contents/:path`

export const updateRedirect = async (url: string): Promise<string> => {
  const originalFileResponse = await fetch(
    ghContentEndpoint.replace(':path', 'vercel.json'),
    {
      headers: baseHeaders,
    },
  )
  const originalFileContentJson = await originalFileResponse.json()
  const originalFileContentString = Buffer.from(
    originalFileContentJson.content,
    'base64',
  ).toString('utf-8')
  const originalJson = JSON.parse(originalFileContentString)

  let rerouteId = nanoid(10)

  while (originalJson.redirects[rerouteId]) {
    rerouteId = nanoid(10)
  }

  const newJson = { ...originalJson }

  newJson.redirects.push({
    source: `/${rerouteId}`,
    destination: url,
  })

  const newContentString = JSON.stringify(newJson, null, 2)

  const response = await fetch(
    ghContentEndpoint.replace(':path', 'vercel.json'),
    {
      method: 'PUT',
      headers: baseHeaders,
      body: JSON.stringify({
        message: `chore: Add redirect for ${url}`,
        content: Buffer.from(newContentString, 'utf-8').toString('base64'),
        sha: originalFileContentJson.sha,
      }),
    },
  )

  // @ts-expect-error
  // eslint-disable-next-line
  const _json = await response.json()

  return rerouteId
}
