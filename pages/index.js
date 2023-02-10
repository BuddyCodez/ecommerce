import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TopRated from "./components/TopRated";
import Layout from "./layout/main";
export default function Home({ popular }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>AniMatrix</title>
        <meta name="google-site-verification" content="d8Q9bSGyoBL8RSathwiLAJd3qbQhUcl_au7udJd5XZo" />
      </Head>
      <Layout>
        <article>
          <Hero />
          <TopRated popular={popular} />
        </article>
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const res = await axios.get("https://gogoanime.consumet.stream/top-airing", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  const popular = res.data;
  // console.log(popular);
  return {
    props: {
      popular,
    },
  };
}
