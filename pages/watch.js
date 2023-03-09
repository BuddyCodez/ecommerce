import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./layout/main";
import { BsFillSkipEndFill, BsFillSkipStartFill, BsPlayCircle, } from "react-icons/bs";
import useSWR from 'swr'
import { MediaFullscreenButton, MediaOutlet, MediaPlayButton, MediaPlayer, MediaSeekButton, MediaTime, MediaTimeSlider } from "@vidstack/react";
import { Loading } from "@nextui-org/react";
import React from "react";
import { Dropdown } from "@nextui-org/react";
const watch = ({ anime, Episodes }) => {
  const [selected, setSelected] = React.useState(new Set(["480p"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { query } = useRouter();
  const [FilterdSource, setFilterdSource] = useState([]);
  const [videoQuality, setVideoQuality] = useState("360p");
  const [episodes, setEpisodes] = useState(Episodes);
  const { data, error } = useSWR("https://api.consumet.org/anime/gogoanime/watch/" + query?.id, fetcher);
  const source = data?.sources;
  const dub = query.id?.includes("dub");
  data ? null : <Loading />
  useEffect(() => {
    const getAnime = async () => {
      const queryId = query?.id.replace("-dub", "");
      const currentEP = episodes.filter((ep) => {
        return ep.id == queryId
      });
      const FilterNextEp = episodes.filter((ep) => {
        return ep.number > currentEP[0].number
      })
      setEpisodes(FilterNextEp);

      // const Player = document.querySelector("vm-player");
      // const res = await fetch("/api/skip?malid=" + anime?.malId + "&epnumber=" + currentEP[0].number + "&eplen=" + 0);
      // const data = await res.json();
      // const FilterOpenings = data.filter((item) => {
      //   return item.skipType === "op";
      // });
      // Player.addEventListener('vmCurrentTimeChange', event => {
      //   const skip = document.querySelector("#SkipBtn").checked;
      //   const currentTime = event.detail;
      //   if (skip && Math.floor(currentTime) >= Math.floor(FilterOpenings[0]?.interval?.startTime) && Math.floor(currentTime) < Math.floor(FilterOpenings[0]?.interval?.endTime)) {
      //     Player.currentTime = FilterOpenings[0]?.interval?.endTime;
      //   }
      //   if (Math.floor(currentTime) == Math.floor(event.duration)) {
      //     const epid = FilterNextEp[0].id.split("-episode")
      //     const id = epid[0] + "-dub-episode" + epid[1]
      //     window.location.href = "/watch?id=" + query.id.includes("dub") ? id : FilterNextEp[0].id + "&anime=" + anime.id;
      //   }
      // });
    };
    if (query.anime) {
      getAnime();

    }
  }, [anime]);
  useEffect(() => {
    const filter = async () => {
      console.log(source);
      const filterd = source?.filter((item) => {
        return item.quality === selectedValue;
      });
      setFilterdSource(filterd || []);
    };
    filter();
  }, [source, selected]);
  useEffect(() => {
    setTimeout(() => {
      setSelected(new Set(["360p"]));
    }, 3000);
  }, []);
  // useEffect(() => {
  //   const Player = document.querySelector("vm-player");
  //   const forward = document.querySelector("button.forward");
  //   const backward = document.querySelector("button.backward");
  //   forward.addEventListener("click", () => {
  //     console.log("forward");
  //     if (Player.currentTime <= Player.duration) {
  //       Player.currentTime += 10;
  //     }
  //   });
  //   backward.addEventListener("click", () => {
  //     console.log("backward");
  //     if (Player.currentTime >= 0) {
  //       Player.currentTime -= 10;
  //     }
  //   });
  // }, []);


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
                {FilterdSource[0]?.url ? <MediaPlayer
                  src={`https://cors.streamable.moe/${FilterdSource[0]?.url}`}
                  // src={FilterdSource[0]?.url}
                  poster={anime?.image}
                  
                  aspect-ratio={16 / 9}
                  autoplay
                >
                  <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center">
                    <svg
                      className="buffering:opacity-100 buffering:animate-spin h-24 w-24 text-white opacity-0 transition-opacity duration-200 ease-linear"
                      fill="none"
                      viewBox="0 0 120 120"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="8" />
                      <circle
                        className="opacity-75"
                        cx="60"
                        cy="60"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="10"
                        pathLength="100"
                        style={{
                          strokeDasharray: 100,
                          strokeDashoffset: 50,
                        }}
                      />
                    </svg>
                  </div>
                  <MediaOutlet />
                  <div className="media-ui">
                    <div
                      className="can-control:opacity-100 pointer-events-none absolute inset-0 z-10 flex h-full flex-col justify-between text-white opacity-0 transition-opacity duration-200 ease-linear"
                      role="group"
                      aria-label="Media Controls"
                    >
                      <MediaControlGroup>
                        <div className=" flex justify-end items-center " style={{ width: '100%' }}>
                          <div className=" max-sm:visible md:visible lg:hidden xl:hidden w-100">
                            <Dropdown
                              triggerType="listbox"
                              placement="bottom"
                              auto
                            >
                              <Dropdown.Button flat css={{ tt: "capitalize", color: 'white' }}

                              >
                                {selectedValue}
                              </Dropdown.Button>
                              <Dropdown.Menu
                                aria-label="Select Video Quality"
                                css={{ color: 'white' }}
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                onSelectionChange={setSelected}
                              >
                                <Dropdown.Item key="360p" >360p</Dropdown.Item>
                                <Dropdown.Item key="480p">480p</Dropdown.Item>
                                <Dropdown.Item key="720p">720p</Dropdown.Item>
                                <Dropdown.Item key="1080p">1080p</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </MediaControlGroup>
                      {/* <MediaControlGroup>Controls Middle</MediaControlGroup> */}
                      <MediaControlGroup>
                        <MediaSeekButton seconds={-10} />
                        <MediaPlayButton />
                        <MediaSeekButton seconds={+10} />
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} id='VideoSliderContainer'>
                          <div style={{ width: '100%' }}>
                            <MediaTimeSlider />
                          </div>
                          <MediaTime type="current" remainder />
                        </div>
                        <div className="w-100 flex justify-end" style={{ width: '100%' }}>
                          <div className="max-sm:hidden sm:opacity-0 visible ">
                            <Dropdown >
                              <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                                {selectedValue}
                              </Dropdown.Button>
                              <Dropdown.Menu
                                aria-label="Select Video Quality"
                                color="primary"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                onSelectionChange={setSelected}
                              >
                                <Dropdown.Item key="360p" >360p</Dropdown.Item>
                                <Dropdown.Item key="480p">480p</Dropdown.Item>
                                <Dropdown.Item key="720p">720p</Dropdown.Item>
                                <Dropdown.Item key="1080p">1080p</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <MediaFullscreenButton />
                        </div>
                      </MediaControlGroup>
                    </div>
                  </div>
                </MediaPlayer> : <div className="flex flex-col justify-center items-center gap-2">
                  <Loading />
                  <h1 className="section-subtitle text-2xl sm:text-md">
                    Loading Video Links {anime?.animeTitle}
                  </h1>
                </div>}


                {/* <vm-player contorls class="player" autoplay>
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
                        <vm-time-progress separator="/" />

                        <vm-volume-control></vm-volume-control>
                        <vm-control-spacer></vm-control-spacer>
                        <vm-fullscreen-control>
                        </vm-fullscreen-control>
                        <vm-settings-control></vm-settings-control>
                        <vm-contol>


                        </vm-contol>
                      </vm-control-group>
                    </vm-controls>
                  </vm-ui>
                </vm-player> */}
              </div>
            </div>
          </div>
          <div className="container flex-col mt-3">
            <label className="relative inline-flex items-center cursor-pointer text-info">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} id="SkipBtn" onChange={(e) => {
                const skipText = document.querySelector("#skipText");
                skipText.innerHTML = e.target.checked ? "ON" : "OFF";

              }} />

              <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-info " ></div>
              <span className="ml-3 text-sm font-mediu inline-block" >Skip Intro : <span className="text-red-600 inline-block" id="skipText">ON</span></span>
            </label>
            <p className="detail-subtitle">Next Up</p>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg:dark-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-info border rounded-lg dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Episode Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Episode Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Watch
                  </th>
                </tr>
              </thead>
              <tbody>
                {episodes?.map((ep) => {
                  const epid = ep.id.split("-episode")
                  const id = epid[0] + "-dub-episode" + epid[1]
                  return (
                    <tr className="border dark:bg-gray-800 border-gray-50  hover:bg-cyan-500 hover:text-black text-white" key={ep.id}>
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                        {ep.number}
                      </th>
                      <td className="w-max">
                        {ep.title}
                      </td>
                      <td className=" flex justify-center items-center hover:dark:text-cyan-700 text-info group-hover:text-cyan-300" style={{ height: "50px" }}>
                        <Link href={`/watch?id=${dub ? id : ep.id}&anime=${anime.id}`}>
                          <BsPlayCircle style={{ scale: "2.0", }} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>


          </div>


        </section>
      </article>
    </Layout>
  );
};
export default watch;
export async function getServerSideProps(context) {
  const { id, anime } = context.query;
  const url =
    "https://api.consumet.org/meta/anilist/info/" + anime;
  const animeData = await fetch(url).then((res) => res.json());
  const episodes = animeData.episodes;
  return {
    props: {
      Episodes: episodes,
      anime: animeData,
    },
  };
}
function MediaControlGroup({ children }) {
  return (
    <div className="can-control:pointer-events-auto pointer-events-none flex min-h-[48px] w-full p-2">
      {children}
    </div>
  );
}