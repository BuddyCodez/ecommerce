import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown } from "@nextui-org/react";
const Footer = () => {
  const router = useRouter();
  const SearchGenre = (e) => {
    const genre = e.target.innerText.toLowerCase();
    router.push(`/search?genre=${genre}`);
  };
  const genres = ["Action", "Adventure", "Cars", "Comedy", "Drama", "Fantasy", "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];

  const Genres = genres.map(genre => {
    return {
      name: genre,
      href: `/search?genre=${genre.toLowerCase().replace(/ /g, '+')}`
    }
  });
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
                <Link href="/popular" className="footer-link">
                  Popular Animes
                </Link>
              </li>

              <li>
                <Dropdown>
                  <Dropdown.Button light color='default' iconRight={
                    <ion-icon name="chevron-up-outline"></ion-icon>
                  }

                  >Genres</Dropdown.Button>
                  <Dropdown.Menu aria-label="Genre Select">
                    {
                      Genres.map(genre => {
                        return (
                          <Dropdown.Item key={genre.name} >
                            <Link href={genre.href} className="footer-link"> {genre.name} </Link>
                          </Dropdown.Item>
                        )
                      })
                    }
                  </Dropdown.Menu>
                </Dropdown>
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
    </footer >

  );
};
export default Footer;
