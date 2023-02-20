import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./layout/main";
import { BsFillSkipEndFill, BsFillSkipStartFill, BsPlayCircle, } from "react-icons/bs";
const watch = () => {
  const { query } = useRouter();
  const [anime, setAnime] = useState([]);
  const [source, setSource] = useState([]);
  const [FilterdSource, setFilterdSource] = useState([]);
  const [videoQuality, setVideoQuality] = useState("720p");
  const [episodes, setEpisodes] = useState(null);
  const dub = query.id?.includes("dub")
  useEffect(() => {
    const getAnime = async () => {
      const url =
        "https://api.consumet.org/meta/anilist/info/" + query.anime;
      const res = await fetch(url);
      const data = await res.json();
      setAnime(data);
      const queryId = query?.id.replace("-dub", "");
      console.log(queryId);
      const currentEP = data?.episodes.filter((ep) => {
        return ep.id == queryId
      });
      const FilterNextEp = data?.episodes.filter((ep) => {
        return ep.number > currentEP[0].number
      })
      setEpisodes(FilterNextEp);
    };
    const getAnimeSource = async () => {
      const url = "https://api.consumet.org/anime/gogoanime/watch/" + query.id;
      const res = await fetch(url);
      const data = await res.json();
      setSource(data.sources);
      setVideoQuality("360p");
      setTimeout(() => {
        setVideoQuality("480p");
      }, 5000);
    };
    if (query.anime) {
      getAnime();
    }
    if (query.id) {
      getAnimeSource();
    }
  }, [query]);
  useEffect(() => {
    const filter = async () => {
      const filterd = source.filter((item) => {
        return item.quality === videoQuality;
      });
      setFilterdSource(filterd);
    };
    filter();
  }, [source, videoQuality]);
  useEffect(() => {
    const submenu = document.querySelector('vm-submenu[label="Quality"]');
    const radioGroup = submenu.querySelector("vm-menu-radio-group");
    radioGroup.addEventListener("click", (event) => {
      const radio = event.target;
      submenu.hint = radio.value;
      setVideoQuality(radio.value);
    });
  }, []);
  useEffect(() => {
    const Player = document.querySelector("vm-player");
    const forward = document.querySelector("button.forward");
    const backward = document.querySelector("button.backward");
    forward.addEventListener("click", () => {
      console.log("forward");
      if (Player.currentTime <= Player.duration) {
        Player.currentTime += 10;
      }
    });
    backward.addEventListener("click", () => {
      console.log("backward");
      if (Player.currentTime >= 0) {
        Player.currentTime -= 10;
      }
    });
  }, []);

  return (
    <Layout>
      <article>
        <section className="movie-detail">
          <div className="container">
            <div
              className="player-wrapper flex flex-col justify-center items-center"
              style={{ width: "100%" }}
            >
              <h1 className="section-subtitle text-2xl sm:text-md">
                {anime?.animeTitle}
              </h1>
              <div className="flex flex-col justify-center items-center gap-2">
                <vm-player contorls class="player" autoplay>
                  <vm-hls crossOrigin="true" poster={anime?.image}>
                    <source
                      data-src={FilterdSource[0]?.url}
                      type="application/x-mpegURL"
                    />
                  </vm-hls>
                  <vm-ui>
                    <vm-loading-screen></vm-loading-screen>
                    <vm-spinner></vm-spinner>
                    <vm-controls full-width>
                      <vm-control-group>
                        <vm-scrubber-control></vm-scrubber-control>
                      </vm-control-group>

                      <vm-control-group space="both">
                        <vm-control>
                          <vm-tooltip direction='right'>Backward 10s</vm-tooltip>
                          <button className="backward">
                            <BsFillSkipStartFill className="icon" />
                          </button>
                        </vm-control>
                        <vm-playback-control></vm-playback-control>
                        <vm-control>
                          <vm-tooltip>Forward 10s</vm-tooltip>
                          <button className="forward">
                            <BsFillSkipEndFill className="icon" />
                          </button>
                        </vm-control>

                        <vm-volume-control></vm-volume-control>
                        <vm-control-spacer></vm-control-spacer>
                        <vm-fullscreen-control>

                        </vm-fullscreen-control>
                        <vm-contol>

                          <vm-settings-control>
                            <vm-settings>
                              <vm-submenu label="Quality" hint="360p">
                                <vm-menu-radio-group value="1">
                                  <vm-menu-radio
                                    label="360"
                                    value="360p"
                                  ></vm-menu-radio>
                                  <vm-menu-radio
                                    label="480p"
                                    value="480p"
                                  ></vm-menu-radio>
                                  <vm-menu-radio
                                    label="720p"
                                    value="720p"
                                  ></vm-menu-radio>
                                  <vm-menu-radio
                                    label="1080p"
                                    value="1080p"
                                  ></vm-menu-radio>
                                </vm-menu-radio-group>
                              </vm-submenu>
                              <vm-menu-item label="Forward" hint="10s"></vm-menu-item>
                              <vm-menu-item label="Backward" hint="10s"></vm-menu-item>
                              <vm-menu-item
                                label="Next Episode"
                                hint="next"
                              ></vm-menu-item>
                              <vm-menu-item
                                label="Previous Episode"
                                hint="prevs"
                              ></vm-menu-item>
                            </vm-settings>
                          </vm-settings-control>
                        </vm-contol>
                      </vm-control-group>
                    </vm-controls>
                  </vm-ui>
                </vm-player>
              </div>
            </div>
          </div>
          <div className="container flex-col mt-3">
            <p className="h1 section-title">Next Episodes in List</p>
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
                      {episodes?.map((ep) => {

                        return (
                          <tr class="border dark:bg-gray-800 border-gray-50  hover:bg-cyan-500 hover:text-black text-white" key={ep.id}>
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                              {ep.number}
                            </th>
                            <td className="w-max">
                              {ep.title}
                            </td>
                            <td className=" flex justify-center items-center hover:dark:text-cyan-700 text-info group-hover:text-cyan-300" style={{ height: "50px" }}>
                              <Link href={`/watch?id=${ep.id}&anime=${anime.id}`}>
                                <BsPlayCircle style={{ scale: "2.0", }} />
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
                      {episodes?.map((ep) => {
                        const epid = ep.id.split("-episode")
                        const id = epid[0] + "-dub-episode" + epid[1]
                        return (
                          <tr class="border dark:bg-gray-800 border-gray-50  hover:bg-gray-400 hover:text-black text-white" key={ep.id}>
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
      </article>
    </Layout>
  );
};
export default watch;
