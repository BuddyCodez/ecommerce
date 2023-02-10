import '@/styles/style.css';
import '@/styles/global.css';
import '@/styles/others.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <Analytics />
    <Script src='/js/script.js' />
  </>
}
