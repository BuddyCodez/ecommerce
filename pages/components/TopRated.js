import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import axios from "axios";
const TopRated = ({ popular }) => {
  const [anime, setAnime] = useState(popular);
  const [page, setPage] = useState(1);
  const router = useRouter();
  function PushPage(item) {
    router.push({ pathname: "/anime", query: { animesearch: item.id } });
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
    <section className="top-rated">
      <div className="container">
        <p className="section-subtitle">Online Anime Streaming</p>
        <h2 className="h2 section-title">Top Trending Animes</h2>

        <ul className="movies-list" id="Trending">
          {anime?.results?.map((item) => {
            return (
              <li key={item.id + item.title}>
                <div className="movie-card">
                  <button onClick={() => PushPage(item.id)}>
                    <figure className="card-banner">
                      <img
                        src={item.image}
                        alt={item.title.english}
                      />
                    </figure>
                  </button>

                  <div className="title-wrapper">
                    <button onClick={() => PushPage(item)}>
                      <h3 className="card-title">{String(item.title.english).length > 25 ? String(item.title.english).slice(0, 25) + "..." : String(item.title.english)}</h3>
                    </button>

                    <time dateTime={item.releaseDate}>
                      {item.releaseDate}
                    </time>

                  </div>
                  <div className="card-meta">
                    <div className="badge badge-outline">1080p</div>

                    <div className="duration">
                      <ion-icon name="time-outline"></ion-icon>

                      <time dateTime={item.duration}>{item.duration} min</time>
                    </div>

                    <div className="rating">
                      <ion-icon name="star"></ion-icon>

                      <data>{(item.rating / 10)} / 10</data>
                    </div>
                  </div>
                </div>

              </li>
            );
          })}
        </ul>

      </div>
    </section >
  );
};
export default TopRated;
