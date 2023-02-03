const Header = () => {
  return (
    <header className="header" data-header>
      <div className="container">
        <div className="overlay" data-overlay></div>

        <a href="/" className="logo">
          <img
            src="/images/Brand.png"
            alt="AnimePlus logo"
            style={{ width: "70%" }}
          />
        </a>
        <div class="search-wrapper">
          <div class="input-holder">
            <input
              type="text"
              class="search-input"
              placeholder="Type to search"
            />
            <button class="search-icon" onclick="searchToggle(this, event);">
              <span></span>
            </button>
          </div>
          <span class="close" onclick="searchToggle(this, event);"></span>
        </div>
        <div className="header-actions">
          <div class="search-wrapper">
            <div class="input-holder">
              <input
                type="text"
                class="search-input"
                placeholder="Type to search"
              />
              <button class="search-icon" onclick="searchToggle(this, event);">
                <span></span>
              </button>
            </div>
            <span class="close" onclick="searchToggle(this, event);"></span>
          </div>

          <button className="search-btn">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>

        <button className="menu-open-btn" data-menu-open-btn>
          <ion-icon name="reorder-two"></ion-icon>
        </button>

        <nav className="navbar" data-navbar>
          <div className="navbar-top">
            <a href="/" className="logo">
              <img
                src="/images/Brand.png"
                alt="AnimePlus logo"
                style={{ width: "70%" }}
              />
            </a>

            <button className="menu-close-btn" data-menu-close-btn>
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          <ul className="navbar-list">
            <li>
              <a href="" className="navbar-link">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="navbar-link">
                Movie
              </a>
            </li>

            <li>
              <a href="#" className="navbar-link">
                Tv Show
              </a>
            </li>

            <li>
              <a href="#" className="navbar-link">
                Web Series
              </a>
            </li>

            <li>
              <a href="#" className="navbar-link">
                Pricing
              </a>
            </li>
          </ul>

          <ul className="navbar-social-list">
            <li>
              <a href="#" className="navbar-social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="navbar-social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="navbar-social-link">
                <ion-icon name="logo-pinterest"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="navbar-social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="navbar-social-link">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
