import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
const Header = () => {
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });
  const Submit = () => {
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      <LoadingBar
        color="#52d6eb"
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <header className="header" data-header>
        <div className="container">
          <div className="overlay" data-overlay></div>

          <Link href="/" className="logo">
            <h3>AnimePlus</h3>
          </Link>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!query) return;
                  Submit();
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
                <Link href="/" className="navbar-link">
                  Home
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-link">
                  Movie
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-link">
                  Tv Show
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-link">
                  Web Series
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-link">
                  Pricing
                </Link>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (!query) return;
                      Submit();
                    }
                  }}
                />
              </li>
            </ul>

            <ul className="navbar-social-list">
              <li>
                <Link href="#" className="navbar-social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-social-link">
                  <ion-icon name="logo-pinterest"></ion-icon>
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </Link>
              </li>

              <li>
                <Link href="#" className="navbar-social-link">
                  <ion-icon name="logo-youtube"></ion-icon>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
