import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Layout from "./layout/main";
import Head from "next/head";
import Script from "next/script";
const SearchResult = ({ anime, genre }) => {
  const { query } = useRouter();

  return (
    <>
      <Layout>
        <article>
          <section className="top-rated">
            <div className="container">
              {anime?.length > 0 || anime.results?.length > 0 ? (
                <h2 className="h2 section-title">
                  {genre ? anime.length : anime.results.length}  Search Results for {query.query}
                </h2>
              ) : (
                <h2 className="h2 section-title">
                  {" "}
                  No Search Results for {query.query}
                </h2>
              )}

              {genre ? <Genre anime={anime} /> : <QuerySearch anime={anime} />}
            </div>
          </section>
        </article>
      </Layout>
    </>
  );
};
export default SearchResult;
export async function getServerSideProps(context) {
  const query = context.query;
  console.log(query);
  if (query.genre) {
    if ((query.genre = "movie")) {
      const url = "https://gogoanime.consumet.stream/anime-movies";
      const res = await fetch(url);
      const data = await res.json();
      const anime = data;
      console.log(anime);
      return {
        props: {
          anime,
          genre: true,
        },
      };
    } else {
      const url = "https://gogoanime.consumet.stream/genre/" + query.genre;
      const res = await fetch(url);
      const data = await res.json();
      const anime = data;
      console.log(anime);
      return {
        props: {
          anime,
          genre: true,
        },
      };
    }
  } else {
    const url = "https://api.consumet.org/meta/anilist/" + query.query;
    const res = await fetch(url);
    const data = await res.json();
    const anime = data;
    console.log(anime);
    return {
      props: {
        anime,
        genre: false,
      },
    };
  }
}

const Genre = ({ anime }) => {
  return (
    <ul className="movies-list">
      {anime?.map((item) => {
        return (
          <li key={item.animeId + item.animeTitle}>
            <div className="movie-card">
              <Link href={"/anime?anime=" + item.animeId}>
                <figure className="card-banner">
                  <img src={item.animeImg} alt={item.animeTitle} />
                </figure>
              </Link>

              <div className="title-wrapper">
                <Link href={"/anime?anime=" + item.animeId}>
                  <h3 className="card-title">{item.animeTitle}</h3>
                </Link>

                <span className="section-subtitle">
                  Release Date: {item.releasedDate}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
const QuerySearch = ({ anime }) => {
  return (
    <ul className="movies-list">
      {anime?.results?.map((item) => {
        console.log(item.title)
        return (
          <li key={item.id}>
            <div className="movie-card">
              <Link href={"/anime?animesearch=" + item.id}>
                <figure className="card-banner">
                  <img src={item.image} alt={item.title?.english} />
                </figure>
              </Link>

              <div className="title-wrapper">
                <Link href={"/anime?animesearch=" + item.id}>
                  {item.title?.english ? (<h3 className="card-title">{item.title?.english}</h3>) : <h3 className="card-title">{item.title?.userPreferred.length > 20 ? item.title?.userPreferred.slice(0,20) + ".." : item.title?.userPreferred}</h3>}
                 
                </Link>

                <span className="section-subtitle">
                  Rating: {item?.rating / 10}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
