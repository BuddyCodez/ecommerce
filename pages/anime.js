
import Layout from "./layout/main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Grid, Row, Col, Text, Badge, Switch, Loading, Image, Pagination, Input, Dropdown } from "@nextui-org/react";
import FourZeroFour from "./404";
import UseFetcher from "./utils/fetcher";
import React from "react";

const Anime = ({ data }) => {
  const episodeId = data?.episodes[0].id.split("-episode")
  const episodeUrl = episodeId ? episodeId[0] + "-dub-episode" + episodeId[1] : false
  let Fetcher = episodeUrl ? UseFetcher("https://api.consumet.org/anime/gogoanime/watch/" + episodeUrl) : { data: false, error: true, isLoading: false };
  let fetchDub = episodeUrl ? { isLoading: Fetcher[0] || false, data: Fetcher[1] || undefined, error: Fetcher[2] || undefined } : { data: false, error: true, isLoading: false };
  const [dub, setDub] = useState(false);
  const [mode, setMode] = useState("dub");
  const { query } = useRouter();
  const anime = data;
  if (!anime || !query.animeid) return <FourZeroFour />;
  const [episodes, setEpisodes] = useState(anime.episodes);
  function HandleInputSearch(element) {
    if (!element.target.value) return setEpisodes(data.episodes);
    let FilteredEp = []
    FilteredEp = anime.episodes.filter((e) => {
      return e.title.toLowerCase().includes(element.target.value);
    })
    setEpisodes(FilteredEp);
  }
  useEffect(() => {

    if (anime && query.animeid && anime.cover != null) {
      const movieDetail = document.querySelector(".movie-detail");
      movieDetail.style.background = `url(${anime?.cover}) no-repeat`;
      movieDetail.style.backgroundSize = 'cover';
      movieDetail.style.backgroundPosition = 'center';
    }
  }, []);
  useEffect(() => {
    console.log(fetchDub);
    if (!fetchDub.isLoading) {
      setDub(fetchDub.data && !fetchDub.error ? true : false);

    }
  }, [fetchDub.isLoading]);

  return (
    <Layout>
      <main>
        {anime?.id ?
          (<article>
            <section className="movie-detail">
              <div className="container">
                <figure className="movie-detail-banner">
                  <Image src={anime?.image} alt={anime?.title}
                    showSkeleton
                    maxDelay={10000}
                    height={500}
                  />


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
            <section className="tv-series">
              <div className="container">
                <label className="text-info flex items-center gap-2 mb-3 ">
                  {fetchDub.isLoading ? <div className="flex items-center justify-center gap-3">
                    <Loading />
                    <span>
                      Loading Episode Mode...
                    </span>
                  </div> :
                    <Switch
                      initialChecked={fetchDub.data ? true : false}
                      shadow
                      disabled={!fetchDub.error == undefined && !fetchDub.data?.message ? true : false}
                      id='Mode'
                      iconOn={
                        <span className=" capitalize text-info font-bold" style={
                          { fontSize: '7px' }
                        }>
                          Dub
                        </span>
                      }
                      iconOff={
                        <span className=" capitalize text-info font-bold" style={
                          { fontSize: '7px' }
                        }>
                          Sub
                        </span>
                      }
                      onChange={(e) => {
                        document.getElementById("textMode").innerHTML = e.target.checked ? "dub mode" : "sub mode";
                        setMode(e.target.checked ? "dub" : "sub");
                      }}
                    />
                  }
                  {fetchDub.isLoading ? null : <span className="ml-3 text-sm font-medium capitalize inline-block" id="textMode">{fetchDub?.data ? "dub mode" : "sub mode"}</span>
                  }
                </label>
                <div className="relative overflow-hidden sm:rounded-lg">
                  <span className="hero-subtitle h1">{anime?.title?.english} Episodes ({episodes.length}):</span>
                  <EpisodeView episodes={episodes} mode={mode} anime={anime} dub={dub} fetchDub={fetchDub} />
                </div>




              </div>
            </section>
            <Recommendations recommendations={anime?.recommendations} />
          </article>) : (
            <>
              <FourZeroFour />
            </>
          )
        }
      </main >
    </Layout >
  );
};
export default Anime;
export async function getServerSideProps(context) {
  const { query } = context;
  let data;

  try {
    if (query?.animeid) {
      const url = "https://api.consumet.org/meta/anilist/info/" + query.animeid + "?provider=gogoanime";
      console.log("URL", url);
      const res = await fetch(url);
      data = await res.json();

    } else {
      const url = "https://api.consumet.org/anime/gogoanime/info/" + query.anime;
      const res = await fetch(url);
      data = await res.json();

    }

  } catch (e) {
    // console.log(e);
    data = [];
  }
  if (!data) data = undefined;
  return {
    props: {
      data,
    },
  };
}
const EpisodeView = ({ episodes, dub, fetchDub, anime, mode }) => {
  const router = useRouter();
  const [selected, setSelected] = React.useState(new Set(["title"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const perPage = 25;
  const [Episodes, setEpisodes] = useState(episodes.slice(0, perPage));
  return (
    <>
      <Row justify="space-between" align="center" css={{ p: '$4' }}>
        <Text b>
          Search Episode by Name
        </Text>
        <Input labelPlaceholder="Enter Episode"
          color='primary'
          underlined
          style={{
            border: 'none',
            boxShadow: 'none',
            background: 'transparent'
          }}
          css={{
            background: 'transparent',
          }}
          labelRight={
            <>
              <Dropdown>
                <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                  {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  <Dropdown.Item key="title">Episode Name</Dropdown.Item>
                  <Dropdown.Item key="number">Episode Number</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          }
          clearable
          onChange={
            (e) => {
              e.target.value ? selectedValue == 'title' ? setEpisodes(episodes.filter(ep => ep.title.toLowerCase().includes(e.target.value.toLowerCase()))) : setEpisodes(episodes.filter(ep => String(ep.number) == e.target.value)) : setEpisodes(episodes.slice(0, perPage))
            }
          }
        />
      </Row>
      <Grid.Container gap={2} justify="flex-start" style={{ overflowY: 'hidden' }}>
        {episodes.length > perPage ? (
          Episodes.map((ep, index) => {
            const epid = ep.id.split("-episode");
            const id = epid[0] + "-dub-episode" + epid[1];
            if (!ep || episodes.length === 0) return "No Episodes Found!";
            return (
              <Grid xs={6} sm={3} key={index} alignItems='center' justify="center">

                <Card isPressable variant="bordered" color="primary"
                  onPress={() => {
                    router.push(`/watch?id=${!fetchDub.data?.message && mode == "dub" ? id : ep.id}&anime=${anime.id}`);
                  }}
                >
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={ep.image}
                      objectFit="cover"
                      width="100%"
                      height={140}
                      alt={ep.title}
                      showSkeleton={true}
                    />
                  </Card.Body>
                  <Card.Footer isBlurred
                    css={{
                      justifyItems: "flex-start"
                    }}

                  >
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>{ep.title}</Text>
                      {ep.airDate ? <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                        Air Date: {new Date(ep.airDate).toLocaleDateString(
                          "en-US",
                          {

                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }
                        )}
                      </Text> : null}
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            )
          })
        ) : (episodes.map((ep, index) => {
          const epid = ep.id.split("-episode");
          const id = epid[0] + "-dub-episode" + epid[1];
          if (!ep || episodes.length === 0) return "No Episodes Found!";
          return (
            <Grid xs={6} sm={3} key={index} alignItems='center' justify="center">

              <Card isPressable variant="bordered" color="primary"
                onPress={() => {
                  router.push(`/watch?id=${!fetchDub.data?.message && mode == "dub" ? id : ep.id}&anime=${anime.id}`);
                }}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={ep.image}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={ep.title}
                    showSkeleton={true}
                  />
                </Card.Body>
                <Card.Footer isBlurred
                  css={{
                    justifyItems: "flex-start"
                  }}

                >
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{ep.title}</Text>
                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                      Air Date: {new Date(ep.airDate).toLocaleDateString(
                        "en-US",
                        {

                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          )
        }))}
      </Grid.Container>
      <Row justify="center">
        {episodes.length > 25 ? <Pagination
          total={Math.ceil(episodes.length / perPage)}
          onChange={(page) => {
            let end = (perPage * page);
            setEpisodes(episodes.slice(end - perPage, end));
            console.log(end - perPage, end);
          }}
        /> : null}
      </Row>
    </>
  );
};

const Recommendations = ({ recommendations }) => {
  const router = useRouter();
  return (
    <>
      <section className="tv-series">
        <div className="container">

          <p className="section-subtitle">Recommendations</p>

          <h2 className="h2 section-title">Recommended Animes</h2>

          <Grid.Container gap={2} justify="center">
            {recommendations?.map((item, index) => (
              <Grid xs={7} sm={3} key={index}>
                <Card isPressable variant="bordered"
                  className='NextUiCard'
                  css={
                    {
                      "@xsMax": {
                        width: '90vw'
                      }
                    }
                  }
                  onPress={() => {
                    router.push({ pathname: "/anime", query: { animeid: item.id } });
                  }}
                  disableRipple={false}
                >
                  <Card.Body css={{ p: 0 }} >
                    <Card.Image
                      src={item.image}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      alt={item?.title?.english}
                      showSkeleton={true}
                    />
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: "flex-start" }} isBlurred={true}>
                    <Col wrap="wrap" justify="space-between" align="center" className="text-info">
                      <Text b css={{
                        fontFamily: 'poppins'
                      }}>{item?.title?.english}</Text>
                      <Row css={{
                        marginTop: '5px',
                      }}
                        justify="space-around"
                        align="center"
                      >
                        <Text css={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',

                          color: '$primary',
                          fontFamily: 'poppins',
                          verticalAlign: 'middle'
                        }}>
                          <span style={{ color: 'white' }}>Rating: &nbsp;&nbsp;</span> {item.rating / 10} <ion-icon name="star" style={{ padding: '5px' }}></ion-icon>
                        </Text>
                        <Text css={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '10px',
                          color: '$primary',
                          fontFamily: 'poppins',
                          verticalAlign: 'middle'
                        }}>
                          <span style={{ color: 'white' }}>Type:</span> {item.type}
                        </Text>
                      </Row>
                      <Row css={{
                        marginTop: '5px',
                      }}
                        justify="space-around"
                        align="center"
                      >
                        <Text >
                          <Badge enableShadow color='primary' disableOutline disableAnimation={false} css={{
                            color: 'Black',
                          }}>
                            {item.status.toUpperCase()}
                          </Badge>
                        </Text>

                        <Text css={
                          {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            color: '$primary',
                            fontFamily: 'poppins',
                            verticalAlign: 'middle'
                          }
                        }>
                          <span style={{ color: 'white' }}>Episodes:</span> {item.episodes}
                        </Text>
                      </Row>
                    </Col>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
          </Grid.Container>


        </div>
      </section>
    </>
  );
}

