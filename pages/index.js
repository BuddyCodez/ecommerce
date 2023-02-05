import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TopRated from "./components/TopRated";
export default function Home({ popular }) {
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
          <TopRated popular={popular} />
        </article>
      </main>
    </>
  );
}
export async function getStaticProps() {
  const res = await axios.get("https://gogoanime.consumet.stream/popular");
  const popular = res.data;
  console.log(popular);
  return {
    props: {
      popular,
    },
  };
}
