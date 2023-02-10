import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
const Header = () => {
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const SearchGenre = (e) => {
    const genre = e.target.innerText.toLowerCase();
    window.location.href = `/search?genre=${genre}`;
  };
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
    window.location.href = `/search?query=${query}`;
  };
  return (
    <>
      <LoadingBar
        color="#52d6eb"
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <header className="header" data-header style={{ zIndex: "99999" }}>
        <div className="container">
          <div className="overlay" data-overlay></div>

          <a href="/" className="logo">
            <h3>AniMatrix</h3>
          </a>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!query) return;
                  Submit(e);
                }
              }}
            />
            {query ? (
              <Link className="search-btn" href={`/search?query=${query}`}>
                <ion-icon name="search-outline"></ion-icon>
              </Link>
            ) : (
              ""
            )}
          </div>

          <button className="menu-open-btn" data-menu-open-btn>
            <ion-icon name="reorder-two"></ion-icon>
          </button>

          <nav className="navbar" data-navbar>
            <div className="navbar-top">
              <button onClick={Submit} className="logo">
                <h3>AnimePlus</h3>
              </button>

              <button className="menu-close-btn" data-menu-close-btn>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>

            <ul className="navbar-list">
              <li>
                <Link href="/" className="btn btn-outline btn-info">
                  Home
                </Link>
              </li>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex="0" className="btn btn-outline btn-info">
                    Genres
                  </label>
                  <ul
                    tabIndex="0"
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button onClick={(e) => SearchGenre(e)}>Action</button>
                    </li>
                    <li>
                      <button onClick={(e) => SearchGenre(e)}>Drama</button>
                    </li>
                    <li>
                      <button onClick={(e) => SearchGenre(e)}>Comedy</button>
                    </li>
                    <li>
                      <button onClick={(e) => SearchGenre(e)}>Horror</button>
                    </li>
                    <li>
                      <button onClick={(e) => SearchGenre(e)}>Thriller</button>
                    </li>
                    <li>
                      <button onClick={(e) => SearchGenre(e)}>Sci-Fi</button>
                    </li>
                    <li>
                      <a onClick={(e) => SearchGenre(e)}>Romance</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link href="/#Trending" className=" btn btn-outline btn-info">
                  Trending
                </Link>
              </li>

              <li>
                <Link
                  href="/search?genre=movie"
                  className=" btn btn-outline btn-info"
                >
                  Anime Movies
                </Link>
              </li>

              <li>
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input mobileOnly"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (!query) return;
                      Submit(e);
                    }
                  }}
                />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
