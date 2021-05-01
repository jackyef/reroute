import { Box } from '@dracula/dracula-ui'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <main>
        <Box p="md">{children}</Box>
      </main>
      <style jsx>{`
        main {
          max-width: 960px;
          margin: 0 auto;
        }
      `}</style>
    </>
  )
}
