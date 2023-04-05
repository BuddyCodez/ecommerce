import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "@/pages/layout/main";
import useSWR from 'swr'
import { FullscreenArrowIcon, MediaFullscreenButton, MediaOutlet, MediaPlayButton, MediaPlayer, MediaSeekButton, MediaTime, MediaTimeSlider } from "@vidstack/react";
import { Badge, Button, Card, Checkbox, Col, Container, Grid, Image, Input, Loading, Row, Text } from "@nextui-org/react";
import React from "react";
import { Dropdown } from "@nextui-org/react";
import Link from "next/link";
export default function WatchEpisode({ params, anime, Episodes, episodeId, currentEp }) {
    const [selected, setSelected] = React.useState(new Set(["360p"]));
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const router = useRouter();
    const [FilterdSource, setFilterdSource] = useState([]);
    // const [videoQuality, setVideoQuality] = useState("360p");
    const [skip, setSkip] = useState(null);
    const [skipSelected, setSkipSelected] = useState(["play", "skip"]);
    const [episodes, setEpisodes] = useState(Episodes);
    const { data, error } = useSWR("https://api.haikei.xyz/anime/gogoanime/watch/" + episodeId, fetcher);
    const source = data?.sources;
    const dub = true;
    data ? null : <Loading />
    const player = useRef(null);
    const HandleFullScreen = async () => {
        try {
            console.log(player?.current);
            player?.current?.requestFullscreen();
        } catch (e) {
            console.log(e);
        }
        try {
            await player?.current?.exitFullscreen();
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        const filter = async () => {
            console.log(selectedValue);
            const filterd = source?.filter((item) => {
                return item.quality === selectedValue;
            });
            setFilterdSource(filterd || []);
        };
        filter();

    }, [source, selected]);

    useEffect(() => {
        if (!FilterdSource[0]?.url) return;
        let SKIP = [];
        const SkipTiminigs = async () => {
            const timings = await fetch("/api/skip?malid=" + anime?.malId + "&epnumber=" + currentEp?.number + "&eplen=" + 0);
            const data = await timings.json();
            console.log(data);
            SKIP = data;
        }
        SkipTiminigs();
        return player?.current.subscribe(({ currentTime }) => {
            if (skipSelected.includes("skip") && SKIP?.length > 0) {
                // console.log("Skip Mode Is On");
                let op = SKIP?.filter((item) => {
                    return item.skipType === "op";
                })
                op = op ? op[0] : null;
                if (currentTime >= op?.interval.startTime && currentTime <= op?.interval.endTime) {
                    player.current.currentTime = op?.interval.endTime;
                }
            }
        });
    }, [FilterdSource[0]?.url])
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

                                    autoplay
                                    fullscreenOrientation="landscape-secondary"
                                    ref={player}
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
                                                    <FullscreenArrowIcon onClick={HandleFullScreen} />
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
                                    ariaLabel="Select Video Quality"
                                    defaultValue={["play", "skip"]}
                                    css={{ fontSize: '0.5rem' }}
                                    value={skipSelected}
                                    onChange={(value) => {
                                        setSkipSelected(value)

                                    }}

                                >
                                    <Checkbox value="play"><Text size={12}>Auto Play</Text></Checkbox>
                                    <Checkbox value="skip"><Text size={12}>Skip Intro</Text></Checkbox>
                                </Checkbox.Group>
                                <Button flat color='primary' icon={
                                    <ion-icon name="play-skip-forward"></ion-icon>
                                } css={{ color: 'white' }}
                                    auto
                                    onPress={() => {
                                        if (currentEp?.number === anime?.episodes?.length) return;
                                        const nextEp = anime?.episodes?.find((ep) => ep.number === currentEp?.number + 1)
                                        router.push(`/watch/${anime?.id}/${nextEp?.number}`)
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
                                    ariaLabel="Search"
                                    width="170px"
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
                                    <Card css={{ w: "80%", h: "200px" }} key={ep?.id}>

                                        <Card.Body css={{ p: 0 }}>
                                            <Card.Image
                                                src={ep?.image}
                                                objectFit="cover"
                                                width="100%"
                                                height="100%"
                                                alt={ep?.title}
                                            />
                                        </Card.Body>
                                        <Card.Footer
                                            isBlurred
                                            css={{
                                                position: "absolute",
                                                bgBlur: "#0f111466",
                                                borderTop: "$borderWeights$light solid $gray800",
                                                bottom: 0,
                                                zIndex: 1,
                                            }}
                                        >
                                            <Row>
                                                <Col>
                                                    <Row>

                                                        <Col>
                                                            <Text color="#d1d1d1" size={12}>
                                                                {ep?.title}
                                                            </Text>
                                                            <Text color="#d1d1d1" size={12}>
                                                                Episode {ep?.number}
                                                                {ep?.number === currentEp.number ? ' (current)' :
                                                                    ep?.number === Episodes[Episodes.length - 1]?.number ? ' (last)' : null
                                                                }
                                                            </Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <Row justify="flex-end">
                                                        <Button
                                                            flat
                                                            auto
                                                            rounded
                                                            css={{ color: "$primary", bg: "#94f9f026" }}
                                                            onPress={() => {
                                                                router.push(`/watch/${anime?.id}/${ep?.number}`);
                                                            }}
                                                        >
                                                            <ion-icon name="play-outline"></ion-icon>
                                                            &nbsp;
                                                            <Text
                                                                css={{ color: "inherit", display: 'inline-block' }}
                                                                size={12}
                                                                weight="bold"
                                                                transform="uppercase"

                                                            >
                                                                Watch Now
                                                            </Text>
                                                        </Button>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
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
}
function MediaControlGroup({ children }) {
    return (
        <div className="can-control:pointer-events-auto pointer-events-none flex min-h-[48px] w-full p-2">
            {children}
        </div>
    );
}
export async function getServerSideProps(context) {
    const { anime, episode } = context.query;
    if (!anime) context.res.redirect("/");
    if (anime && !episode) context.res.redirect(`/watch/${anime}/1`);
    const data = await fetch("https://api.haikei.xyz/meta/anilist/info/" + anime + "?dub=true").then(res => res.json());
    const episodeId = data?.episodes?.find((ep) => ep.number == episode)?.id;
    // console.log(data?.episodes)
    return {
        props: {
            params: context.query,
            anime: data,
            Episodes: data?.episodes || [],
            currentEp: data?.episodes?.find((ep) => ep.number == episode) || "",
            episodeId: episodeId || "",
        }
    }

}

