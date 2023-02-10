import '@/styles/style.css';
import '@/styles/global.css';
import '@/styles/others.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <Script src='/js/script.js' />
  </>
}
