import Link from "next/link";
import Layout from "./layout/main";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { BsPlayBtn, BsPlayCircle } from "react-icons/bs";
const Anime = ({ data, dub }) => {
  const { query } = useRouter();
  const anime = data;
  useEffect(() => {
    if (anime.length > 0) {
      document.querySelector(".movie-detail").style.background = `url(${anime?.trailer?.thumbnail})`
    }
  }, []);
  return (
    <Layout>
      <main>
        {anime ?
          (<article>
            <section className="movie-detail">
              <div className="container">
                <figure className="movie-detail-banner">
                  <img src={anime?.image} alt={anime?.title} />

                  <button className="play-btn">
                    <ion-icon name="play-circle-outline"></ion-icon>
                  </button>
                </figure>

                <div className="movie-detail-content">
                  <p className="detail-subtitle">
                    {anime?.totalEpisodes} Episodes
                  </p>

                  <h1 className="h1 detail-title">
                    <strong>{anime?.title?.english}</strong>
                  </h1>
                  {anime?.subOrDub ? (
                    <h1 className="detail-subtitle">
                      <strong>{anime?.subOrDub.toUpperCase()}</strong>
                    </h1>
                  ) : ""}
                  <h1 className="detail-subtitle">
                    <strong>{dub ? "DUB Available" : "DUB Unavailable"}</strong>
                  </h1>

                  <div className="meta-wrapper">
                    <div className="badge-wrapper">
                      <div className="badge badge-fill">{anime?.status}</div>
                      {anime?.duration ? (<div className="badge badge-info">
                        {anime?.duration} Min
                      </div>) : ""}

                      <div className="badge badge-outline badge-info">HD</div>
                    </div>

                    <div className="ganre-wrapper">
                      {anime?.genres?.map((genre, index) => {
                        return <a className="cursor-pointer">{index == anime.genres.length - 1 ? genre : genre + ","}</a>
                      })}

                    </div>

                    <div className="date-time">
                      <div>
                        <ion-icon name="calendar-outline"></ion-icon>

                        <time dateTime={anime?.releaseDate}>
                          Release Date: {anime?.releaseDate}
                        </time>
                      </div>
                    </div>
                  </div>

                  <p className="storyline">{anime?.description}</p>
                </div>
              </div>
            </section>
            <section className="tv-series">
              <div className="container">

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg:dark-gray-700">
                    <thead class="text-xs text-gray-700 uppercase bg-info border rounded-lg dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Episode Number
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Episode Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Watch
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {anime?.episodes?.map((ep) => {
                        const epid = ep.id.split("-episode")
                        const id = epid[0] + "-dub-episode" + epid[1]
                        return (
                          <tr class="border dark:bg-gray-800 border-gray-50  hover:bg-gray-400 hover:text-black text-white">
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                              {ep.number}
                            </th>
                            <td className="w-max">
                              {ep.title}
                            </td>
                            <td className=" flex justify-center items-center" style={{ height: "50px" }}>
                              <Link href={`/watch?id=${dub ? id : ep.id}&anime=${anime.id}`}>
                                <BsPlayCircle style={{ scale: "2.0", }} className=" hover:dark:text-info text-info" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}

                    </tbody>
                  </table>
                </div>


              </div>
            </section>
          </article>) : (
            <>
              <h1>No Anime Found or Server may be down.</h1>
            </>
          )
        }
      </main>
    </Layout>
  );
};
export default Anime;
export async function getServerSideProps(context) {
  const { query } = context;
  let data;
  let dubAvailable = false;

  try {
    if (query?.animesearch) {
      const url = "https://api.consumet.org/meta/anilist/info/" + query.animesearch;
      const res = await axios.get(url, { params: { provider: "gogoanime" } });
      data = await res.data;
      const episodeId = data.episodes[0].id.split("-episode")
      const episodeUrl = episodeId[0] + "-dub-episode" + episodeId[1]
      console.log(episodeUrl)
      let duburl;
      try {
        duburl = "https://api.consumet.org/anime/gogoanime/watch/" + episodeUrl;
        const res = await fetch(duburl);
        if (res.status == 200) {
          dubAvailable = true;
        }
      } catch (e) {
        duburl = "";
        dubAvailable = false
      }
    } else {
      const url = "https://api.consumet.org/anime/gogoanime/info/" + query.anime;
      const res = await fetch(url);
      data = await res.json();

    }

  } catch (e) {
    console.log(e);
    data = [];
  }
  // console.log(data);
  return {
    props: {
      data,
      dub: dubAvailable
    },
  };
}
