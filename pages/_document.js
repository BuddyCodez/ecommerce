import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <title>AnimePlus - All in one Anime Collection</title>

      <link
        rel="shortcut icon"
        href="/images/favicon.svg"
        type="image/svg+xml"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
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
      <Head />
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
        <script src="/js/script.js"></script>
      </body>
    </Html>
  );
}
