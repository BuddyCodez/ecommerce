import axios from "axios";
import FourZeroFour from "./404";
import { Card, Col, Grid, Row, Text } from "@nextui-org/react";
import Layout from "./layout/main";
import { useRouter } from "next/router";
export default function Trending({ anime }) {
    if (!anime) return (<FourZeroFour />)
    const router = useRouter();
    return (<>
        <Layout active='pop'>
            <section className="top-rated">
                <div className="container">
                    <h1 className="h2 section-title">Popular Animes</h1>
                    <p className="h2 section-subtitle">Top Popular Animes</p>
                </div>
                <Grid.Container gap={2} justify="center">
                    {anime?.results?.map((item, index) => (
                        <Grid xs={7} sm={3} key={index}>
                            <Card isPressable variant="bordered"
                                className="NextUiCard"
                                css={
                                    {
                                        maxWidth: '90vw',
                                        '@xs': {
                                            width: '90vw'
                                        }
                                    }
                                }
                                onPress={() => {
                                    router.push("/anime/" + item.id);
                                }}>
                                <Card.Body css={{ p: 0 }} >
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
                                                <span style={{ color: 'white' }}>Air Date:</span> {item.releaseDate}
                                            </Text>
                                        </Row>
                                    </Col>
                                </Card.Footer>
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
            </section>
        </Layout>
    </>)
}
export async function getServerSideProps(context) {
    const url = 'https://api.haikei.xyz/meta/anilist/popular';
    const { data } = await axios.get(url, {
        params: {
            page: 1,
            perPage: 35

        }
    });
    return {
        props: {
            anime: data
        }
    }
}
