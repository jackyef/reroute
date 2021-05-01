import { AppProps } from 'next/app'

import { Layout } from '@/components/Layout/Layout'

import '@dracula/dracula-ui/styles/dracula-ui.css'
import '@/styles/global.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
