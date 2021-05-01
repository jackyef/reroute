import { FormEventHandler, useRef, useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Input,
  Paragraph,
  Text,
} from '@dracula/dracula-ui'

const isDev = process.env.NODE_ENV === 'development'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const submittedUrl = inputRef.current?.value

    setError('')
    setResult('')

    if (submittedUrl) {
      setIsLoading(true)

      const response = await fetch(`/api/add-redirect?url=${submittedUrl}`)

      if (response.ok) {
        const { rerouteId }: { rerouteId: string } = await response.json()

        const isRedirectApplied = async () => {
          const redirectResponse = await fetch(
            isDev ? `https://reroute.vercel.app/${rerouteId}` : `/${rerouteId}`,
          )

          return redirectResponse.status === 308
        }

        const checkRedirectStatus = async () => {
          const isApplied = await isRedirectApplied()

          if (!isApplied) {
            // Try again in 5000ms
            setTimeout(checkRedirectStatus, 5000)
          } else {
            // All done! Show a message to user
            setResult(
              `${window.location.protocol}//${window.location.host}/${rerouteId}`,
            )
            setIsLoading(false)
            setError('')
          }
        }

        checkRedirectStatus()
      } else {
        setIsLoading(false)
        setError('Failed adding a reroute configuration. Please try again!')
      }
    }
  }

  return (
    <Box>
      <Heading as="h1" size="2xl">
        reroute
      </Heading>

      <Paragraph>
        Type in an URL to get a <Text color="purpleCyan">rerouted URL</Text> ✨
      </Paragraph>

      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="url"
          placeholder="Type in an URL..."
          color="purple"
          size="large"
          mb="md"
        />

        <Button
          type="submit"
          color={!isLoading ? 'yellowPink' : 'animated'}
          disabled={isLoading}
          // variant={isLoading ? 'normal' : 'outline'}
        >
          reroute!
        </Button>

        {isLoading && (
          <Paragraph color="purpleCyan">
            Writing redirect config, this may take a while...
          </Paragraph>
        )}

        {error && <Paragraph color="red">{error}</Paragraph>}

        {result && (
          <Paragraph color="cyanGreen">
            All done! Your rerouted URL is: {result}
          </Paragraph>
        )}
      </form>
    </Box>
  )
}
