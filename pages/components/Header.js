import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { Navbar, Button, Link, Text, Input } from "@nextui-org/react";
import { styled } from "@nextui-org/react"
import axios from "axios";
export const Box = styled("div", {
  boxSizing: "border-box",
});
import Logo from "../../public/images/logo.png";
const Header = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const loadRef = useRef(null);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const Caller = async () => {
    loadRef?.current?.continuousStart();
    const { data } = await axios.get(window.location.origin + "/api/navcategories", {
   
    });
    const filteredCategories = data?.data?.filter((category) => {
      return category?.title !== "Electronics";
    });
    setCategories(data);
    setDisplayCategories({ data: filteredCategories });
    loadRef?.current?.complete();
  };
  useEffect(() => {
    Caller();
  }, []);

  // Promise.all([isLoading, data, error]).then((values) => {
  //   // if there is no error, set categories
  //   if (!error) {
  //     setCategories(data);
  //     const filteredCategories = data?.data?.filter((category) => {
  //       return category?.title !== "Electronics";
  //     });
  //     setDisplayCategories({ data: filteredCategories });
  //   }
  //   loadRef?.current?.complete();
  //   return values;
  // });


  useEffect(() => {
    router.events.on("routeChangeStart", (e) => {
      loadRef?.current?.continuousStart()
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });

  return (
    <>
      <LoadingBar
        ref={loadRef}
        color="#52d6eb"
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Box
        css={{
          maxW: "100vw",
          width: "100%",
        }}
      >

        <header>

          <div class="header-top">

            <div class="container">

              <ul class="header-social-container">

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                </li>

              </ul>

              <div class="header-alert-news">
                <p>
                  <b>Free Shipping</b>
                  This Week Order Over - $55
                </p>
              </div>



            </div>

          </div>

          <div class="header-main">

            <div class="container">

              <a href="/" class="header-logo">
                {/* Ecommerce APP */}
                <img src="/images/logo.png" alt="ShopWave" width="120" height="36" />
              </a>

              <div class="header-search-container">

                <input type="search" name="search" class="search-field" placeholder="Enter your product name..." />

                <button class="search-btn">
                  <ion-icon name="search-outline"></ion-icon>
                </button>

              </div>

              <div class="header-user-actions">

                <button class="action-btn">
                  <ion-icon name="person-outline"></ion-icon>
                </button>

                <button class="action-btn">
                  <ion-icon name="heart-outline"></ion-icon>
                  <span class="count">0</span>
                </button>

                <button class="action-btn">
                  <ion-icon name="bag-handle-outline"></ion-icon>
                  <span class="count">0</span>
                </button>

              </div>

            </div>

          </div>

          <nav class="desktop-navigation-menu">

            <div class="container">

              <ul class="desktop-menu-category-list">

                <li class="menu-category">
                  <a href="#" class="menu-title">Home</a>
                </li>

                <li class="menu-category">
                  <a href="#" class="menu-title">Categories</a>

                  <div class="dropdown-panel">
                    {
                      categories?.data?.map((category, index) => {
                        return <>
                          <ul class="dropdown-panel-list" key={category?.title}>
                            <li class="menu-title">
                              <a href="#">{category?.title}</a>
                            </li>
                            {category?.subcategories?.map((subcategory) => {
                              return <li class="panel-list-item" key={subcategory?.title}>
                                <a href="#">{subcategory?.title}</a>
                              </li>
                            })
                            }
                            <li class="panel-list-item">
                              <a href="#">
                                <img src={categories?.data[0].images[index].url} alt="men's fashion" width="250" height="119" />
                              </a>
                            </li>

                          </ul>
                        </>;
                      })
                    }



                  </div>
                </li>
                {displayCategories?.data?.map((category, index) => {
                  return <>
                    <li class="menu-category" key={category?.title}>
                      <a href="#" class="menu-title">{category?.title}</a>
                      <ul class="dropdown-list">
                        {category?.subcategories?.map((subcategory) => {
                          return <li class="dropdown-item" key={subcategory?.title}>
                            <a href="#">{subcategory?.title}</a>
                          </li>
                        })
                        }
                      </ul>
                    </li>
                  </>;
                })}


                <li class="menu-category">
                  <a href="#" class="menu-title">Blog</a>
                </li>

                <li class="menu-category">
                  <a href="#" class="menu-title">Hot Offers</a>
                </li>

              </ul>

            </div>

          </nav>

          <div class="mobile-bottom-navigation">

            <button class="action-btn" data-mobile-menu-open-btn>
              <ion-icon name="menu-outline"></ion-icon>
            </button>

            <button class="action-btn">
              <ion-icon name="bag-handle-outline"></ion-icon>

              <span class="count">0</span>
            </button>

            <button class="action-btn">
              <ion-icon name="home-outline"></ion-icon>
            </button>

            <button class="action-btn">
              <ion-icon name="heart-outline"></ion-icon>

              <span class="count">0</span>
            </button>

            <button class="action-btn" data-mobile-menu-open-btn>
              <ion-icon name="grid-outline"></ion-icon>
            </button>

          </div>

          <nav class="mobile-navigation-menu  has-scrollbar" data-mobile-menu>

            <div class="menu-top">
              <h2 class="menu-title">Menu</h2>

              <button class="menu-close-btn" data-mobile-menu-close-btn>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>

            <ul class="mobile-menu-category-list">

              <li class="menu-category">
                <a href="#" class="menu-title">Home</a>
              </li>

              <li class="menu-category">

                <button class="accordion-menu" data-accordion-btn>
                  <p class="menu-title">Men's</p>

                  <div>
                    <ion-icon name="add-outline" class="add-icon"></ion-icon>
                    <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                  </div>
                </button>

                <ul class="submenu-category-list" data-accordion>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Shirt</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Shorts & Jeans</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Safety Shoes</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Wallet</a>
                  </li>

                </ul>

              </li>

              <li class="menu-category">

                <button class="accordion-menu" data-accordion-btn>
                  <p class="menu-title">Women's</p>

                  <div>
                    <ion-icon name="add-outline" class="add-icon"></ion-icon>
                    <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                  </div>
                </button>

                <ul class="submenu-category-list" data-accordion>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Dress & Frock</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Earrings</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Necklace</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Makeup Kit</a>
                  </li>

                </ul>

              </li>

              <li class="menu-category">

                <button class="accordion-menu" data-accordion-btn>
                  <p class="menu-title">Jewelry</p>

                  <div>
                    <ion-icon name="add-outline" class="add-icon"></ion-icon>
                    <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                  </div>
                </button>

                <ul class="submenu-category-list" data-accordion>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Earrings</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Couple Rings</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Necklace</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Bracelets</a>
                  </li>

                </ul>

              </li>

              <li class="menu-category">

                <button class="accordion-menu" data-accordion-btn>
                  <p class="menu-title">Perfume</p>

                  <div>
                    <ion-icon name="add-outline" class="add-icon"></ion-icon>
                    <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
                  </div>
                </button>

                <ul class="submenu-category-list" data-accordion>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Clothes Perfume</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Deodorant</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Flower Fragrance</a>
                  </li>

                  <li class="submenu-category">
                    <a href="#" class="submenu-title">Air Freshener</a>
                  </li>

                </ul>

              </li>

              <li class="menu-category">
                <a href="#" class="menu-title">Blog</a>
              </li>

              <li class="menu-category">
                <a href="#" class="menu-title">Hot Offers</a>
              </li>

            </ul>

            <div class="menu-bottom">

              <ul class="menu-category-list">

                <li class="menu-category">

                  <button class="accordion-menu" data-accordion-btn>
                    <p class="menu-title">Language</p>

                    <ion-icon name="caret-back-outline" class="caret-back"></ion-icon>
                  </button>

                  <ul class="submenu-category-list" data-accordion>

                    <li class="submenu-category">
                      <a href="#" class="submenu-title">English</a>
                    </li>

                    <li class="submenu-category">
                      <a href="#" class="submenu-title">Espa&ntilde;ol</a>
                    </li>

                    <li class="submenu-category">
                      <a href="#" class="submenu-title">Fren&ccedil;h</a>
                    </li>

                  </ul>

                </li>

                <li class="menu-category">
                  <button class="accordion-menu" data-accordion-btn>
                    <p class="menu-title">Currency</p>
                    <ion-icon name="caret-back-outline" class="caret-back"></ion-icon>
                  </button>

                  <ul class="submenu-category-list" data-accordion>
                    <li class="submenu-category">
                      <a href="#" class="submenu-title">USD &dollar;</a>
                    </li>

                    <li class="submenu-category">
                      <a href="#" class="submenu-title">EUR &euro;</a>
                    </li>
                  </ul>
                </li>

              </ul>

              <ul class="menu-social-container">

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                </li>

              </ul>

            </div>

          </nav>

        </header>
        {children}

      </Box>
    </>
  );
};
export default Header;
