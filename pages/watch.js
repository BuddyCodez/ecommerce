import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./layout/main";
import { BsFillSkipEndFill, BsFillSkipStartFill,} from "react-icons/bs";
const watch = () => {
  const { query } = useRouter();
  const [anime, setAnime] = useState([]);
  const [source, setSource] = useState([]);
  const [FilterdSource, setFilterdSource] = useState([]);
  const [videoQuality, setVideoQuality] = useState("720p");
  const router = useRouter();
  useEffect(() => {
    const getAnime = async () => {
      const url =
        "https://api.consumet.org/meta/anilist/info/" + query.anime;
      const res = await fetch(url);
      const data = await res.json();
      setAnime(data);
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
      console.log("source", source);

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
        </section>
      </article>
    </Layout>
  );
};
export default watch;
