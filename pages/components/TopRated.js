import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import axios from "axios";
import { Badge, Card, Col, Grid, Row, Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
const TopRated = ({ popular }) => {
  const [anime, setAnime] = useState(popular);
  const [page, setPage] = useState(1);
  const router = useRouter();
  function PushPage(item) {
    router.push({ pathname: "/anime", query: { animeid: item.id } });
  }

  return (
    <section className="top-rated">
      <div className="container">
        <p className="section-subtitle">Online Anime Streaming</p>
        <h2 className="h2 section-title">Top Trending Animes</h2>
        <div className="sectionAll">
          <Button light color="primary" auto ripple={true}
            iconRight={<ion-icon name="arrow-forward-outline"></ion-icon>}
            onPress={() => {
              router.push("/trending");
            }}
          >
            View All
          </Button>
        </div>
        <Grid.Container gap={1} justify="center" >
          {anime?.results?.map((item, index) => (
            <Grid xs={7} sm={3} key={index}>
              <Card isPressable variant="bordered" onPress={() => {
                router.push({ pathname: "/anime", query: { animeid: item.id } });
              }}
                disableRipple={false}
                className='NextUiCard'
                
                css={
                  {
                    "@xsMin": {
                      maxWidth: '90vw',
                      width: '90vw'
                    }
                  }
                }
              >
                <Card.Body css={{
                  p: 0,
                }} >
                  <Card.Image
                    src={item.image}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    alt={item?.title?.english}
                    showSkeleton={true}
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }} isBlurred={true}>
                  <Col wrap="wrap" justify="space-between" align="center" className="text-info">
                    <Text b css={{
                      fontFamily: 'poppins'
                    }}>{item?.title?.english}</Text>
                    <Row css={{
                      marginTop: '5px',
                    }}
                      justify="space-around"
                      align="center"
                    >
                      <Text css={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                        color: '$primary',
                        fontFamily: 'poppins',
                        verticalAlign: 'middle'
                      }}>
                        <span style={{ color: 'white' }}>Rating: &nbsp;&nbsp;</span> {item.rating / 10} <ion-icon name="star" style={{ padding: '5px' }}></ion-icon>
                      </Text>
                      <Text css={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        color: '$primary',
                        fontFamily: 'poppins',
                        verticalAlign: 'middle'
                      }}>
                        <span style={{ color: 'white' }}>Type:</span> {item.type}
                      </Text>
                    </Row>
                    <Row css={{
                      marginTop: '5px',
                    }}
                      justify="space-around"
                      align="center"
                    >
                      <Text >
                        <Badge enableShadow color='primary' disableOutline disableAnimation={false} css={{
                          color: 'Black',
                        }}>
                          {item.duration} Mins
                        </Badge>
                      </Text>
                      <Text css={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        color: '$primary',
                        fontFamily: 'poppins',
                        verticalAlign: 'middle'
                      }}>
                        <span style={{ color: 'white' }}>Air Date:</span> {item.releaseDate}
                      </Text>
                    </Row>
                  </Col>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>

      </div>
    </section >
  );
};
export default TopRated;
