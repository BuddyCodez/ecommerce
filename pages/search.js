import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Layout from "./layout/main";
const SearchResult = ({ anime, genre }) => {
  const { query } = useRouter();

  return (
    <Layout>
      <article>
        <section className="top-rated">
          <div className="container">
            {anime?.length > 0 ? (
              <h2 className="h2 section-title">
                {anime.length} Search Results for {query.query}
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
  );
};
export default SearchResult;
export async function getServerSideProps(context) {
  const query = context.query;
  console.log(query);
  if (query.genre) {
    if ((query.genre = "movie")) {
      const url =
        "https://gogoanime.consumet.stream/anime-movies"
      const { data } = await axios.get(url);
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
      const { data } = await axios.get(url);
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
    const url = "https://api.consumet.org/anime/gogoanime/" + query.query;
    const { data } = await axios.get(url);
    const anime = data;
    // console.log(anime);
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
        return (
          <li key={item.id + item.title}>
            <div className="movie-card">
              <Link href={"/anime?anime=" + item.id}>
                <figure className="card-banner">
                  <img src={item.image} alt={item.title} />
                </figure>
              </Link>

              <div className="title-wrapper">
                <Link href={"/anime?anime=" + item.id}>
                  <h3 className="card-title">{item.title}</h3>
                </Link>

                <span className="section-subtitle">
                  {String(item.subOrDub).toUpperCase()}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
