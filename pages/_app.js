import '@/styles/style.css';
import '@/styles/global.css';
import '@/styles/others.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo, LogoJsonLd } from 'next-seo';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import 'vidstack/styles/defaults.css';
export default function App({ Component, pageProps }) {
  const theme = createTheme({
    type: 'dark',
    theme: {
      colors: {
        primary: 'hsl(var(--in))',
        primaryShadow: 'hsl(var(--in))',
      }
    }
  })
  return <>
    <LogoJsonLd url='https://animematrix.vercel.app/' logo='https://animematrix.vercel.app/images/BrandedLogo.png' />
    <DefaultSeo
      title='Anime Avenue - All in one anime platform'
      description='Welcome to Anime Avenue - your ultimate destination for all things anime! Find the latest news, reviews, and recommendations for your favorite shows, as well as new discoveries. Join our passionate community of anime fans and explore the fascinating world of Japanese animation like never before. Start your journey on Anime Avenue today!'
      canonical='https://animematrix.vercel.app/'
      openGraph={{
        title: 'Anime Avenue - All in one anime platform',
        description: 'Welcome to Anime Avenue - your ultimate destination for all things anime! Find the latest news, reviews, and recommendations for your favorite shows, as well as new discoveries. Join our passionate community of anime fans and explore the fascinating world of Japanese animation like never before. Start your journey on Anime Avenue today!',
        images: [
          {
            url: 'https://animematrix.vercel.app/images/BrandedLogo.png',
            alt: 'Anime Avenue'
          }
        ],
        type: 'article',
        article: {
          tags: ['Anime Avenue', 'Anime Avenue', 'Anime Avenue', 'anime', 'manga', 'light novel', 'lightnovel', 'light novels', 'lightnovels', 'anime platform', 'anime platform']
        },
        url: 'https://animematrix.vercel.app/',
        site_name: 'Anime Avenue - All in one anime platform',

      }} />
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
    <Analytics />
    <Script src='/js/script.js' />
  </>
}
