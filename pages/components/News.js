import { Container } from "@nextui-org/react";
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";

export default function News({ news }) {
    return (<>
        <Container style={{ marginTop: '20px' }}>
            <h1>News</h1>
            <div className="news">
                {news?.map((item) => {
                    <Card css={{ p: "$6", mw: "400px" }}>
                        <Card.Header>
                            <img
                                alt="nextui logo"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width="34px"
                                height="34px"
                            />
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        Next UI
                                    </Text>
                                </Grid>
                                <Grid xs={12}>
                                    <Text css={{ color: "$accents8" }}>nextui.org</Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                            <Text>
                                Make beautiful websites regardless of your design experience.
                            </Text>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                icon
                                color="primary"
                                target="_blank"
                                href="https://github.com/nextui-org/nextui"
                            >
                                Visit source code on GitHub.
                            </Link>
                        </Card.Footer>
                    </Card>
                })}
            </div>
        </Container>

    </>);
}
