import { Button } from "@nextui-org/react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <p>Looking for a hub of all things anime? Look no further than <strong>Anime Avenue</strong>! Our vibrant community of passionate fans is dedicated to exploring the exciting world of Japanese animation, with the latest news, reviews, and recommendations for all your favorite shows. Whether you're a die-hard otaku or just dipping your toes into this amazing universe, <strong>Anime Avenue</strong> is the perfect place to start your journey. Join us today and discover your new obsession!</p>


          <div className="meta-wrapper">

            <div className="ganre-wrapper">
              <Link href="/search?genre=action">Action,</Link>
              <Link href="/search?genre=fantacy">Fantacy,</Link>
              <Link href="/search?genre=horror">Horror,</Link>
              <Link href="/search?genre=adventure">Adventure,</Link>
              <Link href="/search?genre=drama">Drama</Link>
            </div>

          
          </div>

          <Button shadow color="primary" auto icon={
            <ion-icon name="play-outline"></ion-icon>
          }
            ripple='true'
            id="NextBtn"
            style={
              {
                background: 'var(--nextui-colors-primary)',
                backgroundImage: 'none',
                color: 'black'
              }
            }
          >
            Watch Now
          </Button>
        </div>
      </div>
    </section >
  );
};
export default Hero;
