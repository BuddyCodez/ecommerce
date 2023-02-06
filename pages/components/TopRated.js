import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
const TopRated = ({ popular }) => {
  const [anime, setAnime] = useState(popular);
  const [page, setPage] = useState(1);
  const router = useRouter();
  function PushPage(item) {
    router.push({ pathname: "/anime", query: { anime: item } });
  }
  function Change(type) {
    fetch(`https://gogoanime.consumet.stream/popular?page=${page}`)
      .then((response) => response.json())
      .then((animelist) => {
        setAnime(animelist);
        if (page > 1) {
         type == "next" ? setPage(page + 1) : setPage(page - 1);
        }
      });
  }


  return (
    <section className="top-rated" id="Trending">
      <div className="container">
        <p className="section-subtitle">Online Anime Streaming</p>

        <h2 className="h2 section-title">Top Airing Animes</h2>

        <ul className="movies-list">
          {anime?.map((item) => {
            return (
              <li key={item.animeId + item.animeTitle}>
                <div className="movie-card">
                  <button onClick={() => PushPage(item.animeId)}>
                    <figure className="card-banner">
                      <img
                        src={item.animeImg}
                        alt="Sonic the Hedgehog 2 movie poster"
                      />
                    </figure>
                  </button>

                  <div className="title-wrapper">
                    <button onClick={() => PushPage(item.animeId)}>
                      <h3 className="card-title">{item.animeTitle}</h3>
                    </button>

                    <time dateTime={item.releasedDate}>
                      Release Date: {item.releasedDate}
                    </time>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
};
export default TopRated;
