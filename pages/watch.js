import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "./layout/main";

const watch = ({ anime, url, query }) => {
  const [videoQuality, setVideoQuality] = useState("360p");
  const FilterdSource = url.sources.filter((source) => {
    return source.quality === videoQuality;
  });
  console.log(FilterdSource);
  useEffect(() => {
    const submenu = document.querySelector('vm-submenu[label="Quality"]');
    const radioGroup = submenu.querySelector("vm-menu-radio-group");
    console.log(radioGroup);
    radioGroup.addEventListener("click", (event) => {
      const radio = event.target;
      submenu.hint = radio.value;
      setVideoQuality(radio.value);
    });
  });
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
                {anime.animeTitle}
              </h1>
              <div className="flex flex-col justify-center items-center gap-2">
                <vm-player contorls style={{ width: "450px" }}>
                  <vm-hls cross-origin="true" poster={anime.image}>
                    <source
                      data-src={FilterdSource[0].url}
                      type="application/x-mpegURL"
                    />
                  </vm-hls>
                  <vm-default-ui no-click-to-play no-settings>
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
                    </vm-settings>
                  </vm-default-ui>
                </vm-player>
                <div className="episode-list">
                  <h2 className="h2">Select Episode: {anime.totalEpisodes}</h2>
                  <ul className="Episodes">
                    {anime.episodes.map((episode) => {
                      return (
                        <li key={episode.episodeId}>
                          <Link
                            className="btn btn-primary"
                            href={
                              "watch?id=" +
                              episode.episodeId +
                              "&anime=" +
                              query.anime
                            }
                          >
                            <ion-icon name="play-circle-outline"></ion-icon>
                            <span>Episode No: {episode.episodeNum}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};
export default watch;
export async function getServerSideProps(context) {
  const { query } = context;
  const uri = "https://api.consumet.org/anime/gogoanime/watch/" + query.id;
  const { data } = await axios.get(uri, {
    params: { server: "gogocdn" },
  });
  const url = data;
  const res2 = await axios.get(
    `https://api.consumet.org/anime/gogoanime/info/${query.anime}`
  );
  const anime = await res2.data;
  console.log(anime);
  return {
    props: {
      url,
      anime,
      query,
    },
  };
}
