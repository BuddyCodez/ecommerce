import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle text-info">AniMatrix</p>

          <h1 className="h1 hero-title">
            Unlimited <strong>Animes</strong>, Ads Free Watching, & More.
          </h1>

          <div className="meta-wrapper">
            <div className="badge-wrapper">
              <div className="badge badge-fill">All</div>

              <div className="badge badge-outline">HD</div>
            </div>

            <div className="ganre-wrapper">
              <a href="#">Romance,</a>

              <a href="#">Drama</a>
            </div>

            <div className="date-time">
              <div>
                <ion-icon name="calendar-outline"></ion-icon>

                <time dateTime="2022">2022</time>
              </div>

              <div>
                <ion-icon name="time-outline"></ion-icon>

                <time dateTime="PT128M">128 min</time>
              </div>
            </div>
          </div>

          <Link className="btn btn-info" href="#Trending">
            <ion-icon name="play"></ion-icon>

            <span>Watch now</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
