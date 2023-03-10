import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "./layout/main";
import useSWR from 'swr'
import { MediaFullscreenButton, MediaOutlet, MediaPlayButton, MediaPlayer, MediaSeekButton, MediaTime, MediaTimeSlider } from "@vidstack/react";
import { Badge, Button, Checkbox, Container, Grid, Image, Input, Loading, Row, Text } from "@nextui-org/react";
import React from "react";
import { Dropdown } from "@nextui-org/react";
import Link from "next/link";
const watch = ({ anime, Episodes }) => {
  const [selected, setSelected] = React.useState(new Set(["480p"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { query } = useRouter();
  const router = useRouter();
  const [FilterdSource, setFilterdSource] = useState([]);
  const [videoQuality, setVideoQuality] = useState("360p");
  const [episodes, setEpisodes] = useState(Episodes);
  const { data, error } = useSWR("https://api.consumet.org/anime/gogoanime/watch/" + query?.id, fetcher);
  const source = data?.sources;
  const dub = query.id?.includes("dub");
  data ? null : <Loading />
  const [currentEp, setCurrentEp] = useState(null);
  const player = useRef(null);
  useEffect(() => {
    const getAnime = async () => {
      const queryId = query?.id.replace("-dub", "");
      const currentEP = episodes.filter((ep) => {
        return ep.id == queryId
      });
      setCurrentEp(currentEP[0]);
      const FilterNextEp = episodes.filter((ep) => {
        return ep.number > currentEP[0].number
      })

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
  useEffect(() => {
    const { paused } = !player.current?.state;
    return player.subscribe(({ currentTime }) => {
      console.log(currentTime);
    });
  }, []);

  return (
    <Layout>
      <article>
        <section>
          <Row gap={2} justify='center' align="start" wrap="wrap" css={{
            p: '$0',
            m: '$0',
            '@lgMin': {
              height: '100vh',
              p: '$5',
            }

          }}>
            <Container fluid css={
              {
                maxWidth: '100%',
                height: '80%',
                p: '$0',
                background: 'var(--rich-black-fogra-29)',
                overflowY: 'auto',
                '@lgMin': {
                  width: '40%'
                }
              }
            }>
              <div className="flex flex-col justify-center items-center gap-2"
              >
                {FilterdSource[0]?.url ? <MediaPlayer
                  src={`https://cors.haikei.xyz/${FilterdSource[0]?.url}`}
                  // src={FilterdSource[0]?.url}
                  poster={currentEp.image}
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
                          <MediaTime type="current" />
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
              </div>
              <Row align="center" justify="space-between" wrap="wrap"
                css={
                  {
                    p: '$5',
                    background: 'Black'
                  }
                }>
                <Checkbox.Group
                  orientation="horizontal"
                  color="primary"
                  defaultValue={["play", "skip"]}>
                  <Checkbox value="play">Auto Play</Checkbox>
                  <Checkbox value="skip">Skip Intro</Checkbox>
                </Checkbox.Group>
                <Button flat color='primary' icon={
                  <ion-icon name="play-skip-forward"></ion-icon>
                } css={{ color: 'white' }}
                  onPress={() => {
                    if (currentEp?.number === anime?.episodes?.length) return;
                    const nextEp = anime?.episodes?.find((ep) => ep.number === currentEp?.number + 1)
                    router.push(`/watch?anime=${anime?.id}&id=${nextEp?.number}`)
                  }}
                >
                  Next Ep
                </Button>
              </Row>
              <Row align="center" justify="space-between" wrap="wrap"
                css={
                  {
                    p: '$10'
                  }
                }>
                <Container fluid css={{
                  p: '$0', maxWidth: '100%', width: '50%',
                }}>
                  <Text color='white'>
                    Currently Watching:
                  </Text>
                  <Text color='primary'>
                    Episode {currentEp?.number}
                  </Text>
                </Container>
                <Container fluid css={{
                  p: '$0', maxWidth: '100%', width: '50%',
                }}>
                  <Text color='white'>
                    Servers :
                  </Text>

                </Container>
              </Row>
            </Container>
            <Container fluid css={{
              maxWidth: '100%',
              background: 'var(--rich-black-fogra-39)',
              height: '80%',
              p: '$5',
              overflowY: 'auto',
              '@lgMin': {
                width: '30%'
              }
            }}>
              <div className="w-full h-12 flex justify-between items-center px-5 bg-gray-900 mb-2">
                <h1>List of Episodes:</h1>
                <Input placeholder="Search Ep #" color='primary'
                  clearable
                  onChange={(e) => {
                    e.target.value ? setEpisodes(Episodes.filter((ep) => {
                      return String(ep.number) == e.target.value
                    })) : setEpisodes(Episodes);
                  }}
                  contentLeft={
                    <ion-icon name="search" size="small" />
                  }
                  style={{
                    border: 'none',
                    boxShadow: 'none',
                    background: 'var(--jet)',
                    color: 'var(--white)',
                  }} />
              </div>
              <div className="flex justify-center items-center flex-wrap gap-2 px-8 transition-all">
                {episodes?.map((ep, index) => (
                  <Link href={dub ?
                    ep.id.split("-episode")[0] + "-dub-episode" + ep.id.split("-episode")[1]
                    : ep.id
                  }
                    className={ep.number == currentEp?.number ? "rounded p-2 px-10 hover:bg-info cursor-pointer bg-info" : "rounded p-2 px-10 hover:bg-info cursor-pointer bg-gray-800"}>
                    {ep?.number}
                  </Link>
                ))}
              </div>
            </Container>

            <Container fluid css={{
              maxWidth: '100%',
              height: '80%',
              p: '$0',
              '@lgMin': {
                width: '30%'
              }
            }}>
              <section className="movie-detail">
                <div className="container">
                  <figure className="movie-detail-banner">
                    <Image src={anime?.image} alt={anime?.title}
                      showSkeleton
                      maxDelay={10000}
                      height='auto'
                    />
                  </figure>

                  <div className="movie-detail-content">

                    <h1 className="detail-title text-lg">
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
                        {anime?.genres?.map((genre) => {
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

                    <p className="storyline">{String(anime?.description).replaceAll("<br>", "\n").replaceAll("<i>", "").replaceAll("</i>", "").replaceAll("(Source: Crunchyroll)", "")}</p>
                  </div>
                </div>
              </section>
            </Container>

          </Row>



        </section>
      </article>
    </Layout>
  );
};
export default watch;
export async function getServerSideProps(context) {
  const { id, anime } = context.query;
  const url =
    "https://api.consumet.org/meta/anilist/info/" + anime + "?dub=true";
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