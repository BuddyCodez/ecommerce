import Link from "next/link";
import { useRouter } from "next/router";
const Footer = () => {
  const router = useRouter();
  const SearchGenre = (e) => {
    const genre = e.target.innerText.toLowerCase();
    router.push(`/search?genre=${genre}`, undefined, { shallow: true });
  };
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand-wrapper">
            <a href="./index.html" className="logo">
              <h1 className="logo-text">Animetronix</h1>
            </a>

            <ul className="footer-list">
              <li>
                <Link href="" className="footer-link">
                  Home
                </Link>
              </li>

              <li>
                <Link href="#" className="footer-link">
                  Genres
                </Link>
              </li>

              <li>
                <div className="dropdown dropdown-top dropdown-end">
                  <label tabIndex="0" className="footer-link">
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
                <Link href="#" className="footer-link">
                  Anime Movies
                </Link>
              </li>
            </ul>
          </div>

          <div className="divider"></div>

          <div className="quicklink-wrapper">
            <div className="spacer" />
            <ul className="social-list">
              <li>
                <a
                  href="https://www.facebook.com/udit.vegad.1"
                  className="social-link"
                >
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/udit_vegad/"
                  className="social-link"
                >
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>

              <li>
                <a href="https://discord.gg/h3Tcnpn3" className="social-link">
                  <ion-icon name="logo-discord"></ion-icon>
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/udit-vegad-544ab9236/"
                  className="social-link"
                >
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2023- 2024{" "}
            <a href="https://uditvegad.vercel.app">Udit Vegad</a>. All Rights
            Reserved
          </p>

          <p className="credit">
            Designed by <a href="https://uditvegad.vercel.app" className="text-info">Udit Vegad</a>
          </p>
        </div>
      </div>
    </footer>

  );
};
export default Footer;
