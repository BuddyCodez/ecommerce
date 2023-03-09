import { Card, Col, Row, Button, Text, Link } from "@nextui-org/react";
import { useRouter } from "next/router";
export const EpisodeCard = ({ episode, Epid, animeId }) => {
    const router = useRouter();
    return <Link
        href={`/watch?id=${Epid}&anime=${animeId}`}
    >
        <Card css={{ w: "100%", h: "300px" }} isHoverable onClick={
            (e) => {
                router.push(`/watch?id=${Epid}&anime=${animeId}`);
            }
        }>
            <Card.Header css={{ position: "absolute", zIndex: 1, bgBlur: '#00000011', }} >
                <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="secondary">
                        Episode Number: {episode?.number}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
                <Card.Image
                    src={episode?.image}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    alt={episode?.title}
                    showSkeleton
                />
            </Card.Body>
            <Card.Footer
                isBlurred
                css={{
                    position: "absolute",
                    bgBlur: "#00000066",
                    borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                }}
            >
                <Row>
                    <Col>
                        <Text color="#fff" >
                            Air Date: {new Date(episode.airDate).toLocaleDateString(
                                "en-US",
                                {

                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                }
                            )}
                        </Text>
                        <Text color="#fff" >
                            {episode?.title.length > 15 ? episode?.title.slice(0, 15) + "..." : episode?.title}
                        </Text>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    </Link>
};