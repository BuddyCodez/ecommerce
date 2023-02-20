import Link from "next/link";
import Layout from "./layout/main";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { BsPlayBtn, BsPlayCircle } from "react-icons/bs";
import { Tabs } from "flowbite";
const Anime = ({ data, dub }) => {
  const { query } = useRouter();
  const anime = data;
  useEffect(() => {
    if (anime) {
      const movieDetail = document.querySelector(".movie-detail");
      movieDetail.style.background = `url(${anime?.cover}) no-repeat`;
      movieDetail.style.backgroundSize = 'cover';

    }
  }, []);
  useEffect(() => {
    const tabElements = [
      {
        id: 'sub',
        triggerEl: document.querySelector('#sub-tab'),
        targetEl: document.querySelector('#sub')
      },
      {
        id: 'dub',
        triggerEl: document.querySelector('#dub-tab'),
        targetEl: document.querySelector('#dub')
      },
    ];
    const options = {
      defaultTabId: 'sub',
      activeClasses: 'text-info hover:text-info dark:text-info-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
      inactiveClasses: 'text-gray-300 hover:text-gray-400 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
    };
    const tabs = new Tabs(tabElements, options);

  }, [])
  return (
    <Layout>
      <main>
        {anime?.id ?
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
                        return <span class="bg-transparent border border-info text-info text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-info transition-all hover:text-black cursor-pointer" >{genre}</span>
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

                  <p className="storyline">{String(anime?.description).replace("<br> <br> (Source: Crunchyroll)", " ")}</p>
                </div>
              </div>
            </section>
            <section className="tv-series">
              <div className="container">
                <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                  <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li class="mr-2" role="presentation">
                      <button class="inline-block p-4 border-b-2 rounded-t-lg" id="sub-tab" data-tabs-target="#sub" type="button" role="tab" aria-controls="sub" aria-selected="false">SUB</button>
                    </li>
                    <li class="mr-2" role="presentation">
                      <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dub-tab" data-tabs-target="#dub" type="button" role="tab" aria-controls="dub" aria-selected="false">DUB</button>
                    </li>                    </ul>
                </div>
                <div id="myTabContent">
                  <div class="hidden p-4 rounded-lg  dark:bg-gray-800" id="sub" role="tabpanel" aria-labelledby="sub-tab">
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

                            return (
                              <tr class="border dark:bg-gray-800 border-gray-50  hover:bg-cyan-500 hover:text-black text-white">
                                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                  {ep.number}
                                </th>
                                <td className="w-max">
                                  {ep.title}
                                </td>
                                <td className=" flex justify-center items-center hover:dark:text-cyan-700 text-info group-hover:text-cyan-300" style={{ height: "50px" }}>
                                  <Link href={`/watch?id=${ep.id}&anime=${anime.id}`}>
                                    <BsPlayCircle style={{ scale: "2.0", }}/>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}

                        </tbody>
                      </table>
                    </div>  </div>
                  <div class="hidden p-4 rounded-lg  dark:bg-gray-800" id="dub" role="tabpanel" aria-labelledby="dub-tab">
                    {dub ? (<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    </div>) : ("Dub UnAvailable")}
                  </div>
                </div>



              </div>
            </section>
            <Recommendations recommendations={anime?.recommendations} />
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
    if (query?.animeid) {
      const url = "https://api.consumet.org/meta/anilist/info/" + query.animeid + "?provider=gogoanime";
      console.log("URL", url);
      const res = await fetch(url);
      data = await res.json();
      console.log("Logs", data);
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

const Recommendations = ({ recommendations }) => {
  return (
    <>
      <section class="tv-series">
        <div class="container">

          <p class="section-subtitle">Recommendations</p>

          <h2 class="h2 section-title">Recommended Animes</h2>

          <ul class="movies-list">

            {recommendations?.map((anime) => {
              return (
                <li>
                  <div class="movie-card" key={anime.id}>

                    <Link href={`/anime?animeid=${anime.id}`}>
                      <figure class="card-banner">
                        <img src={anime.image} alt={anime.title.english} />
                      </figure>
                    </Link>

                    <div class="title-wrapper">
                      <Link href={`/anime?animeid=${anime.id}`}>
                        <h3 class="card-title">{anime.title.english}</h3>
                      </Link>

                      <time datetime={anime.episodes}>{anime.episodes} episodes</time>
                    </div>

                    <div class="card-meta">
                      <div class="badge badge-outline hover:bg-info hover:text-black cursor-pointer">{anime.status.toUpperCase()}</div>

                      <div class="duration">
                        <time datetime="PT47M">{anime.type == "TV" ? "Series" : anime.type}</time>
                      </div>

                      <div class="rating">
                        <ion-icon name="star"></ion-icon>

                        <data>{anime.rating / 10}</data>
                      </div>
                    </div>

                  </div>
                </li>
              )
            })}

          </ul>

        </div>
      </section>
    </>
  );
}