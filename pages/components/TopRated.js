import { useEffect, useState } from "react";

const TopRated = () => {
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(2);
  const LoadMore = () => {
    fetch(`https://gogoanime.consumet.stream/popular?page=${page}`)
      .then((response) => response.json())
      .then((animelist) => {
        let newAnime = [...anime, ...animelist];
        setAnime(newAnime);
        console.log("Page2", animelist);
        setPage(page + 1);
      });
  };
  useEffect(() => {
    fetch("https://gogoanime.consumet.stream/popular")
      .then((response) => response.json())
      .then((animelist) => {
        setAnime(animelist);
        console.log(animelist);
      });
  }, []);
  return (
    <section className="top-rated">
      <div className="container">
        <p className="section-subtitle">Online Streaming</p>

        <h2 className="h2 section-title">Top Rated Animes</h2>

        <ul className="movies-list">
          {anime?.map((item) => {
            return (
              <li key={item.animeId + item.animeTitle}>
                <div className="movie-card">
                  <a href="./movie-details.html">
                    <figure className="card-banner">
                      <img
                        src={item.animeImg}
                        alt="Sonic the Hedgehog 2 movie poster"
                      />
                    </figure>
                  </a>

                  <div className="title-wrapper">
                    <a href="./movie-details.html">
                      <h3 className="card-title">{item.animeTitle}</h3>
                    </a>

                    <time dateTime={item.releasedDate}>
                      Release Date: {item.releasedDate}
                    </time>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="More">
          <button className="btn btn-primary" onClick={LoadMore}>
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};
export default TopRated;
