import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Layout from "./layout/main";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
const SearchResult = ({ anime, genre }) => {
  const { query } = useRouter();
  const [animes, setAnimes] = useState(anime);
  const [loading, setLoading] = useState(null);
  async function HandlePageShift(type) {
    let page = animes.currentPage
    setLoading(true);
    if (type == "prev" && page > 1) {
      page -= 1;
    } else if (type == "next" && animes.hasNextPage) {
      page += 1;
    }
    const url = "https://api.consumet.org/meta/anilist/" + query.keyword;
    const { data } = await axios.get(url, {
      params: {
        page: page
      }
    });
    console.log(data);
    setAnimes(data);
    setLoading(false);
  }

  return (
    <>
      <Layout>
        <article>
          <section className="top-rated">
            {loading ? (
              <div className="container flex w-max h-max justify-center items-center">
                <div role="status">
                  <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-700 animate-spin dark:text-gray-800 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                <h4>Please wait Loading...</h4>
              </div>
            ) : (<div className="container">
              {animes?.length > 0 || animes.results?.length > 0 ? (
                <h2 className="h2 section-title">
                  {genre ? animes.length : animes?.results?.length}  Search Results for {query.query}
                </h2>
              ) : (
                <h2 className="h2 section-title">
                  {" "}
                  No Search Results for {query.query}
                </h2>
              )}
              <p className=" section-subtitle">Current Page: {animes?.currentPage}</p>
              {genre ? <Genre anime={animes} /> : <QuerySearch anime={animes} />}
              <div className="flex justify-center">
                {animes?.currentPage == 1 ? <button type="button" class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-white border border-gray-300 rounded-lg hover:bg-gray-400 hover:text-gray-700 bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-not-allowed" disabled>
                  <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                  Previous
                </button> : <button
                  onClick={() => HandlePageShift("prev")}
                  type="button" class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-white border border-gray-300 rounded-lg hover:bg-gray-400 hover:text-gray-700 bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                  Previous
                </button>}
                {animes?.hasNextPage ? <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-gray-300 rounded-lg hover:bg-gray-400 hover:text-gray-700 bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => HandlePageShift("next")}
                >
                  Next
                  <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button> : <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-gray-300 rounded-lg hover:bg-gray-400 hover:text-gray-700 bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-not-allowed"
                  disabled
                >
                  Next
                  <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>}
              </div>
            </div>)}
          </section>
        </article>
      </Layout>
    </>
  );
};
export default SearchResult;
export async function getServerSideProps(context) {
  const query = context.query;
  console.log(query);
  if (query.genre) {
    if ((query.genre == "movie")) {
      const url = "https://gogoanime.consumet.stream/anime-movies";
      const res = await fetch(url);
      const data = await res.json();
      const anime = data;
      console.log(anime);
      return {
        props: {
          anime,
          genre: true,
        },
      };
    } else {
      const url = "https://gogoanime.consumet.stream/genre/" + query.genre;
      const { data } = await axios.get(url);
      const anime = data;
      console.log(anime);
      return {
        props: {
          anime,
          genre: true,
        },
      };
    }
  } else {
    const url = "https://api.consumet.org/meta/anilist/" + query.keyword;
    const res = await fetch(url);
    const data = await res.json();
    const anime = data;
    console.log(anime);
    return {
      props: {
        anime,
        genre: false,
      },
    };
  }
}

const Genre = ({ anime }) => {
  return (
    <ul className="movies-list">
      {anime?.map((item) => {
        return (
          <li key={item.animeId + item.animeTitle}>
            <div className="movie-card">
              <Link href={"/anime?anime=" + item.animeId}>
                <figure className="card-banner">
                  <img src={item.animeImg} alt={item.animeTitle} />
                </figure>
              </Link>

              <div className="title-wrapper">
                <Link href={"/anime?anime=" + item.animeId}>
                  <h3 className="card-title">{item.animeTitle}</h3>
                </Link>

                <span className="section-subtitle">
                  Release Date: {item.releasedDate}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
const QuerySearch = ({ anime }) => {
  return (
    <ul className="movies-list">
      {anime?.results?.map((item) => {

        return (
          <li key={item.id}>
            <div className="movie-card">
              <Link href={"/anime/" + item.id}>
                <figure className="card-banner">
                  <img src={item.image} alt={item.title?.english} />
                </figure>
              </Link>

              <div className="title-wrapper">
                <Link href={"/anime/" + item.id}>
                  {item.title?.english ? (<h3 className="card-title">{item.title?.english}</h3>) : <h3 className="card-title">{item.title?.userPreferred.length > 20 ? item.title?.userPreferred.slice(0, 20) + ".." : item.title?.userPreferred}</h3>}

                </Link>

                <span className="section-subtitle">
                  Rating: {item?.rating / 10}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
