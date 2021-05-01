import { FormEventHandler, useRef, useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Input,
  Paragraph,
  Text,
} from '@dracula/dracula-ui'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const submittedUrl = inputRef.current?.value

    if (submittedUrl) {
      console.log({ submittedUrl })

      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
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
      </form>
    </Box>
  )
}
