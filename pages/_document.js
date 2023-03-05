import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta name="google-site-verification" content="d8Q9bSGyoBL8RSathwiLAJd3qbQhUcl_au7udJd5XZo" />
          <link
            rel="shortcut icon"
            href="/images/BrandedLogo.png"
            type="image/svg+xml"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css"
          />

          <link
            rel="preconnect"
            href="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          />
          <link
            rel="preconnect"
            href="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body id="top">
          <Main />
          <NextScript />
          <script
            type="module"
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          ></script>
          <script
            noModule
            src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          ></script>
          <script
            type="module"
            src="https://cdn.jsdelivr.net/npm/@vime/core@^5/dist/vime/vime.esm.js"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;