import axios from "axios";
import Head from "next/head";
import Hero from "./components/Hero";
import TopRated from "./components/TopRated";
import Layout from "./layout/main";
import News from "./components/News";
export default function Home({ popular, news}) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <title>Anime Avenue</title>
        <meta name="google-site-verification" content="d8Q9bSGyoBL8RSathwiLAJd3qbQhUcl_au7udJd5XZo" />
      </Head>
      <Layout>
        <article>
          <Hero />
          <TopRated popular={popular} />
          {news ? <News news={news}  /> : ""}
        </article>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  let popular;
  let newsData;
  try {
    const { data } = await axios.get("https://api.haikei.xyz/meta/anilist/popular");
    const { data: news } = await axios.get("https://api.consumet.org/news/ANN/recent-feeds");
    console.log("NEWS",news);
    newsData = news;
    popular = data;
  } catch (e) {
    popular = [];
    newsData = [];
  }
  // console.log(popular);
  return {
    props: {
      popular: popular,
      news: newsData,
    },

  };
}
