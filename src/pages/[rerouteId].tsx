import { Box, Heading, Paragraph, Text } from '@dracula/dracula-ui'

export default function Page() {
  return (
    <Box>
      <Heading as="h1" size="lg">
        Invalid{' '}
        <Text color="purpleCyan" size="lg">
          rerouted URL
        </Text>
        !
      </Heading>
      <Paragraph>
        We couldn&apos;t find that URL! Make sure you are using the right URL.
      </Paragraph>
    </Box>
  )
}

import { prisma } from '@/utils/db/client'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { rerouteId } = query

  if (rerouteId) {
    try {
      const route = await prisma.routes.findFirst({
        where: { id: String(rerouteId) },
      })

      if (route) {
        const { destination } = route

        return {
          redirect: {
            statusCode: 301,
            destination,
            basePath: false,
          },
          props: {},
        }
      }
    } catch {}
  }

  // Pass data to the page via props
  return { props: {} }
}
