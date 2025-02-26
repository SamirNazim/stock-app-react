import React from "react";
import { useEffect, useState } from "react";
import { Accordion, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
//https://newsapi.org/docs/endpoints/everything
const MainNews = (prop) => {
  const [newsData, setNewsData] = useState([]);
  const [readMore, setReadMore] = useState(3);

  useEffect(() => {
    const URL = `https://newsapi.org/v2/everything?q=${prop.ticker}&apiKey=TOKEN`;

    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setNewsData(json);
      });
  }, [prop.ticker]);
  return (
    <>
      <Accordion width="400px" defaultIndex={[0]} allowMultiple>
        {newsData.articles?.slice(0, readMore).map((news) => (
          <>
            <LinkBox
              as="article"
              maxW="sm"
              p="5"
              borderWidth="1px"
              rounded="md"
            >
              <Box as="time" dateTime={news.publishedAt}>
                {new Date(news.publishedAt).toLocaleDateString("en")}
              </Box>
              <Heading size="md" my="2">
                <LinkOverlay href="#">{news.title}</LinkOverlay>
              </Heading>
              <Text mb="3">{news.description}</Text>
              <Box
                as="a"
                color="teal.400"
                href={news.url}
                isExternal
                fontWeight="bold"
              >
                Link
              </Box>
            </LinkBox>
          </>
        ))}
        {readMore <= 20 && (
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => setReadMore(readMore + 3)}
          >
            Read More...
          </Button>
        )}
      </Accordion>
    </>
  );
};

export default MainNews;
