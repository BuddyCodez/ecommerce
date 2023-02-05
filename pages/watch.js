import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./layout/main";
const watch = () => {
  const { query } = useRouter();
  const [anime, setAnime] = useState([]);
  const [source, setSource] = useState([]);
  const [FilterdSource, setFilterdSource] = useState([]);
  const [videoQuality, setVideoQuality] = useState("720p");
  useEffect(() => {
    const getAnime = async () => {
      const url =
        "https://api.consumet.org/anime/gogoanime/info/" + query.anime;
      const { data } = await axios.get(url);
      setAnime(data);
      console.log(data);
    };
    const getAnimeSource = async () => {
      const url = "https://api.consumet.org/anime/gogoanime/watch/" + query.id;
      const { data } = await axios.get(url);
      setSource(data.sources);
      setTimeout(() => {
        setVideoQuality("360p");
      }, 3000);
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
      console.log("source",source);
      
      const filterd = source.filter((item) => {
        return item.quality === videoQuality;
      });
      console.log(filterd);
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
                  <vm-default-ui no-click-to-play no-settings>
                    <vm-spinner></vm-spinner>
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
                      <vm-menu-item label="Next Episode" hint="next"></vm-menu-item>
                    </vm-settings>
                  </vm-default-ui>
                </vm-player>
              </div>
            </div>
          </div>
        </section>
        <section className="tv-series">
          <div className="container">
            <div className="episode-list">
              <h2 className="h2">Select Episode: {anime?.totalEpisodes}</h2>
              <ul className="Episodes">
                {anime?.episodes?.map((episode) => {
                  if (episode.id > query.id) return;
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
          </div>
        </section>
      </article>
    </Layout>
  );
};
export default watch;
