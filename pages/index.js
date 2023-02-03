import Head from "next/head";
import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TopRated from "./components/TopRated";
export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>AnimePlus</title>
      </Head>
      <Header />
      <main>
        <article>
          <Hero />
          <TopRated />
        </article>
      </main>
    </>
  );
}
