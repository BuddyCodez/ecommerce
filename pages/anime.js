import Link from "next/link";
import Layout from "./layout/main";
import { useRouter } from "next/router";
import axios from "axios";
const Anime = ({ data }) => {
  const { query } = useRouter();
  const anime = data;
  return (
    <Layout>
      <main>
        <article>
          <section className="movie-detail">
            <div className="container">
              <figure className="movie-detail-banner">
                <img src={anime.image} alt={anime.title} />

                <button className="play-btn">
                  <ion-icon name="play-circle-outline"></ion-icon>
                </button>
              </figure>

              <div className="movie-detail-content">
                <p className="detail-subtitle">
                  {anime.totalEpisodes} Episodes
                </p>

                <h1 className="h1 detail-title">
                  <strong>{anime.title}</strong>
                </h1>

                <div className="meta-wrapper">
                  <div className="badge-wrapper">
                    <div className="badge badge-fill">{anime.status}</div>

                    <div className="badge badge-outline">HD</div>
                  </div>

                  {/* <div className="ganre-wrapper">
                    {anime.genres.forEach((index, genre) => {
                      return <a href="#">{genre}, </a>;
                    })}
                  </div> */}

                  <div className="date-time">
                    <div>
                      <ion-icon name="calendar-outline"></ion-icon>

                      <time dateTime={anime.releaseDate}>
                        {anime.releaseDate}
                      </time>
                    </div>
                  </div>
                </div>

                <p className="storyline">{anime.description}</p>
              </div>
            </div>
            <div className="episode-list">
              <h2 className="h2">Select Episode: {anime.totalEpisodes}</h2>
              <ul className="Episodes">
                {anime.episodes.map((episode) => {
                  return (
                    <li key={episode.id}>
                      <Link
                        className="btn btn-primary"
                        href={
                          "watch?id=" + episode.id + "&anime=" + query.anime
                        }
                      >
                        <ion-icon name="play-circle-outline"></ion-icon>
                        <span>Episode No: {episode.number}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
};
export default Anime;
export async function getServerSideProps(context) {
  const { query } = context;
  const url = "https://api.consumet.org/anime/zoro/info?id=" + query.anime;
  const { data } = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  console.log(data);
  return {
    props: {
      data,
    },
  };
}
