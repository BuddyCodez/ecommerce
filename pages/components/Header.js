import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { Collapse } from "flowbite";
const Header = () => {
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const SearchGenre = (e) => {
    const genre = e.target.innerText.toLowerCase();
    window.location.href = `/search?genre=${genre}`;
  };
  const Toggle = () => {
    const $targetEl = document.getElementById('targetEl');
    const $triggerEl = document.getElementById('triggerEl');
    const collapse = new Collapse($targetEl, $triggerEl, options);
    collapse.toggle();
  }
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });
  const Submit = async (e) => {
    e.preventDefault();
    window.location.href = `/search?keyword=${query}`;
  };
  return (
    <>
      <LoadingBar
        color="#52d6eb"
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <header className="bg-gray-900" style={{position: 'fixed', zIndex: "99999", width: "100vw" }}>

        <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900" style={{width: "100%",}}>
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <a href="/" className="flex items-center">
              <span className="self-center text-xl font-bold italic whitespace-nowrap text-info ">Animetronix</span>
            </a>
            <div className="flex md:order-2">
              <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark: focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Search</span>
              </button>
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key == 'Enter') Submit(e); }}
                />
              </div>
              <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark: dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                <span className="sr-only" id="triggerEl" onClick={Toggle}>Open menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 transition-all" id="navbar-search">
              <div className="relative mt-3 md:hidden">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key == 'Enter') Submit(e); }}
                />
              </div>
              <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-900 dark:border-gray-700 text-white" id="targetEl" >
                <li>
                  <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-info rounded md:bg-transparent md:text-info md:p-0 dark:text-white" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link href="#Trending" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-info md:p-0 md:dark:hover:text-white dark:text-gray-400 dark: dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Trending</Link>
                </li>
                <li>
                  <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark: md:dark:hover:bg-transparent">Genres <svg className="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>

                  <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                      <li>
                        <button className="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 dark:text-gray-400 md:dark:hover:text-white  hover:text-info md:dark:hover:bg-transparent" onClick={(e) => SearchGenre(e)}>Action</button>
                      </li>
                      <li>
                        <button className="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 dark:text-gray-400 md:dark:hover:text-info  hover:text-info md:dark:hover:bg-transparent" onClick={(e) => SearchGenre(e)}>Drama</button>
                      </li>
                      <li>
                        <button className="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 dark:text-gray-400 md:dark:hover:text-info  hover:text-info md:dark:hover:bg-transparent" onClick={(e) => SearchGenre(e)}>Comedy</button>
                      </li>
                      <li>
                        <button className="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 dark:text-gray-400 md:dark:hover:text-info  hover:text-info md:dark:hover:bg-transparent" onClick={(e) => SearchGenre(e)}>Horror</button>
                      </li>
                      <li>
                        <button className="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 dark:text-gray-400 md:dark:hover:text-info  hover:text-info md:dark:hover:bg-transparent" onClick={(e) => SearchGenre(e)}>Thriller</button>
                      </li>
                      <li>
                        <button className="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 dark:text-gray-400 md:dark:hover:text-info  hover:text-info md:dark:hover:bg-transparent" onClick={(e) => SearchGenre(e)}>Sci-Fi</button>
                      </li>
                      <li>
                        <button className="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-info md:p-0 dark:text-gray-400 md:dark:hover:text-info  dark:hover:text-info md:dark:hover:bg-transparent" onClick={(e) => SearchGenre(e)}>Romance</button>
                      </li>
                    </ul>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </header>
    </>
  );
};
export default Header;
