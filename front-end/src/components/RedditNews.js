import React, { useEffect, useState } from "react";
import { Accordion, Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

//AIzaSyDtGOqrfZwmA62nRtILP9xi6vmovU3DF3U
const RedditNews = (prop) => {
  const [redditData, setRedditData] = useState([]);
  const [readMore, setReadMore] = useState(3);

  useEffect(() => {
    const URL = `https://www.googleapis.com/customsearch/v1?key=TOKEN&q=${prop.ticker}%20stock%20site:reddit.com%20after:2021`;
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setRedditData(json);
      });
  }, []);

  return (
    <>
      <Accordion width="400px" defaultIndex={[0]} allowMultiple>
        {redditData.items?.slice(0, readMore).map((news, idx) => (
          <>
            <LinkBox
              as="article"
              maxW="sm"
              p="5"
              borderWidth="1px"
              rounded="md"
            >
              <Heading size="md" my="2">
                <LinkOverlay href="#">{news?.title}</LinkOverlay>
              </Heading>
              <Text mb="3">{news?.snippet}</Text>
              <Box
                as="a"
                color="teal.400"
                href={news?.link}
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

export default RedditNews;
