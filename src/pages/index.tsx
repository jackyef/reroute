import { FormEventHandler, useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Paragraph,
  Text,
} from '@dracula/dracula-ui'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLInputElement>(null)

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
          const redirectResponse = await fetch(`/${rerouteId}`, {
            redirect: 'manual',
          })

          return (
            redirectResponse.status === 308 ||
            redirectResponse.type === 'opaqueredirect'
          )
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

  const handleCopyUrl = () => {
    /* Get the text field */
    const tempInput = resultRef.current

    if (!tempInput) return

    // Set the value
    tempInput.value = result

    /* Select the text field */
    tempInput.select()
    tempInput.setSelectionRange(0, 99999) /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand('copy')

    setShowTooltip(true)

    setTimeout(() => {
      setShowTooltip(false)
    }, 3000)
  }

  return (
    <>
      <Box>
        <Heading as="h1" size="2xl">
          reroute
        </Heading>

        <Paragraph>
          Type in an URL to get a <Text color="purpleCyan">rerouted URL</Text>{' '}
          ✨
        </Paragraph>

        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            type="url"
            placeholder="Type in an URL..."
            color="purple"
            size="large"
            variant="outline"
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
            <>
              <Divider my="md" color="purple" />
              <Paragraph color="white">
                All done! Here is your{' '}
                <Text color="purpleCyan">rerouted URL</Text> ✨
              </Paragraph>

              <div className="resultContainer">
                <Input
                  ref={resultRef}
                  type="text"
                  readOnly
                  value={result}
                  color="green"
                  size="large"
                  variant="outline"
                  onClick={handleCopyUrl}
                />
                <span className={`tooltip ${showTooltip ? 'shown' : ''}`}>
                  {' '}
                  <Badge mt="lg" color="cyan" variant="subtle">
                    Copied!
                  </Badge>
                </span>
              </div>
            </>
          )}
        </form>
      </Box>
      <style jsx>{`
        .resultContainer {
          position: relative;
        }

        .tooltip {
          position: absolute;
          right: 0;
          top: 200%;
          opacity: 0;
          transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
        }

        .tooltip.shown {
          opacity: 1;
        }
      `}</style>
    </>
  )
}
