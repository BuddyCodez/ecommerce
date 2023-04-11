import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { Collapse } from "flowbite";
import { Navbar, Text, Dropdown, Input, useTheme, Spacer } from "@nextui-org/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { styled } from "@nextui-org/react"
import { BsSearch } from "react-icons/bs";
export const Box = styled("div", {
  boxSizing: "border-box",
});
const Header = ({ children, active }) => {
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const loadRef = useRef(null);
  const router = useRouter();
  const SearchGenre = async (e, url) => {
    window.location.href = url;
  };
  const IsActive = () => {
    if (active === "home") {
      return "Home";
    } else if (active === "trnd") {
      return "Trending";
    } else if (active === "abt") {
      return "About Us";
    } else if (active === "pop") {
      return "Popular";
    }
  }
  const Toggle = () => {
    const $targetEl = document.getElementById('targetEl');
    const $triggerEl = document.getElementById('triggerEl');
    const collapse = new Collapse($targetEl, $triggerEl, options);
    collapse.toggle();
  }
  const genres = ["Action", "Adventure", "Cars", "Comedy", "Drama", "Fantasy", "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];

  const Genres = genres.map(genre => {
    return {
      name: genre,
      href: `/search?genre=${genre.toLowerCase().replace(/ /g, '+')}`
    }
  });

  useEffect(() => {
    router.events.on("routeChangeStart", (e) => {
      loadRef?.current?.continuousStart()
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });
  const Submit = async (e) => {
    e.preventDefault();
    router.push(`/search?keyword=${query}`);
  };
  const { isDark } = useTheme(true);
  const collapseItems = [
    {
      name: 'Home', href: '/',
      icon: "home",

    },
    {
      name: 'Trending', href: '/trending', icon: "trending-up",
    },
    {
      name: 'About Us', href: '/about', icon: "information-circle",
    },
    {
      name: 'Popular', href: '/popular', icon: "star",
    },


  ];
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
        <Navbar isBordered={true} variant="floating"
        >
          <Navbar.Brand css={{ mr: "$4", width: '100%' }}>
            <Text b color="primary" css={{
              mr: "$11", "@xsMax": {
                ml: '$4'
              }
            }} >
              Anime Avenue
            </Text>
            <Navbar.Content hideIn="xs" variant="highlight-rounded" style={{
              color: 'white'
            }} >
              <Navbar.Link isActive={IsActive() == "Home" ? true : active == null || active == undefined ? true : false} href="/">
                Home
              </Navbar.Link>
              <Navbar.Link href="/trending" isActive={IsActive() == "Trending" ? true : false}>Trending</Navbar.Link>
              <Navbar.Link href="/popular" isActive={IsActive() == "Popular" ? true : false}>Popular</Navbar.Link>
              <Dropdown isBordered>
                <Navbar.Item>
                  <Dropdown.Button
                    auto
                    light
                    css={{
                      px: 0,
                      dflex: "center",
                      svg: { pe: "none" },
                      color: 'white'
                    }}
                    ripple={false}
                  >
                    Genres
                  </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu
                  aria-label="dropdown menu"
                  css={{
                    $$dropdownMenuWidth: "340px",
                    $$dropdownItemHeight: "70px",
                    "& .nextui-dropdown-item": {
                      py: "$4",
                      // dropdown item left icon
                      svg: {
                        color: "$secondary",
                        mr: "$4",
                      },
                      // dropdown item title
                      "& .nextui-dropdown-item-content": {
                        w: "100%",
                        fontWeight: "$semibold",
                      },
                    },
                  }}
                >
                  {Genres.map((genre) => {
                    return (
                      <Dropdown.Item
                        key={genre.name}
                        title={<Link href={genre.href}> {genre.name}</Link>}
                      >
                        <Link href={genre.href} />
                      </Dropdown.Item>

                    )
                  })}

                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
            <Navbar.Content

              css={{
                display: "none",
                visibility: "hidden",
                opacity: 0,
                "@xsMax": {
                  w: "100%",
                  jc: "space-between",
                  display: "block",
                  visibility: "visible",
                  opacity: 1,
                },
                "@smMin": {

                }
              }}

            >
              <Navbar.Item
                css={{
                  "@xsMax": {
                    w: "100%",
                    jc: "center",
                  },
                }}
              >
                <Input
                  ariaLabel="Search Anime"
                  clearable
                  contentLeft={
                    <BsSearch color="var(--nextui-gray-500)" width={20} />
                  }
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      Submit(e);
                    }
                  }}
                  contentLeftStyling={false}
                  color='primary'
                  style={{
                    border: 'none',
                    boxShadow: 'none',
                    background: 'var(--jet)',
                  }}
                  css={{
                    w: "100%",
                    "@xsMax": {
                      mw: "300px",
                      width: '80%'
                    },
                    "& .nextui-input-content--left": {
                      h: "100%",
                      ml: "$4",
                      dflex: "center",
                    },

                  }}

                  className=" focus:ring-transparent border-none shadow-none"
                  placeholder="Search Anime..."
                />
              </Navbar.Item>
            </Navbar.Content>

            <Navbar.Toggle showIn="xs" aria-label="toggle navigation" id="NavbarToggler" title="Toggle"
              css={{ width: '25px' }}
            />
          </Navbar.Brand>
          <Navbar.Content
            hideIn='xs'
            css={{
              "@xsMax": {
                w: "100%",
                jc: "space-between",
              },

            }}

          >
            <Navbar.Item
              css={{
                "@xsMax": {
                  w: "100%",
                  jc: "center",
                },
              }}
            >
              <Input
                ariaLabel="Search Anime"
                clearable
                contentLeft={
                  <BsSearch color="var(--nextui-gray-500)" />
                }
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    Submit(e);
                  }
                }}
                contentLeftStyling={false}
                color='primary'
                style={{
                  border: 'none',
                  boxShadow: 'none',
                  background: 'var(--jet)',
                  width: '100%'
                }}
                css={{
                  w: "100%",
                  "@xsMax": {
                    mw: "300px",
                    width: '100%'
                  },
                  "& .nextui-input-content--left": {
                    h: "100%",
                    ml: "$4",
                    dflex: "center",
                  },

                }}

                className=" focus:ring-transparent border-none shadow-none"
                placeholder="Search Anime..."
              />
            </Navbar.Item>
          </Navbar.Content>
          <Navbar.Collapse style={{
            overflowY: 'hidden'
          }}>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem key={item.name}>
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href={item?.href || '#'}
                >

                  <span className="inline-block">
                    <ion-icon name={item?.icon}></ion-icon>
                  </span>
                  &nbsp;
                  <span className="inline-block">{item?.name}</span>
                </Link>

              </Navbar.CollapseItem>
            ))}
            <Navbar.CollapseItem>
              <Dropdown
                css={{
                  fontSize: '1.3rem',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                }}
              >
                <Dropdown.Button light color='default'
         
                  iconRight={
                    <ion-icon name="chevron-down-outline"></ion-icon>
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
            </Navbar.CollapseItem>
          </Navbar.Collapse>
        </Navbar>
        {children}
      </Box>
    </>
  );
};
export default Header;
