import React, { useEffect, useState } from "react";
import { Heading, Box, Grid, Text } from "@chakra-ui/react";
import { getTicker } from "../axios/getTickerData.js";

const TickerSummary = (props) => {
  const { ticker } = props;
  const [tickerSummary, setTickerSummary] = useState({});

  useEffect(() => {
    getTicker(ticker).then((res) => {
      console.log(res.data);
      setTickerSummary(res.data.summaryDetail);
    }).catch(err => {
      console.error("Error fetching ticker summary:", err);
    });
  }, [ticker]);

  function intlFormat(num) {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
  }
  
  function makeFriendly(num) {
    if (!num) return "N/A";
    if (num >= 10000000) return intlFormat(num / 1000000) + "B";
    if (num >= 1000000) return intlFormat(num / 1000000) + "M";
    if (num >= 1000) return intlFormat(num / 1000) + "k";
    return intlFormat(num);
  }
  
  const SummaryItem = ({ label, value }) => (
    <Box p={3} borderWidth="1px" borderRadius="md" mb={3}>
      <Text fontSize="sm" color="gray.500">{label}</Text>
      <Heading as="h5" size="sm">{value}</Heading>
    </Box>
  );

  return (
    <Box mt={4}>
      <Heading as="h3" size="md" mb={4} textAlign="center">
        {ticker?.toUpperCase()} Financial Summary
      </Heading>
      
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <SummaryItem 
            label="Previous Close" 
            value={tickerSummary?.previousClose || "N/A"} 
          />
          <SummaryItem 
            label="Open" 
            value={tickerSummary?.open || "N/A"} 
          />
          <SummaryItem 
            label="Volume" 
            value={makeFriendly(tickerSummary?.volume)} 
          />
          <SummaryItem 
            label="Day High" 
            value={tickerSummary?.dayHigh || "N/A"} 
          />
        </Box>
        
        <Box>
          <SummaryItem 
            label="Market Cap" 
            value={makeFriendly(tickerSummary?.marketCap)} 
          />
          <SummaryItem 
            label="PE Ratio" 
            value={tickerSummary?.trailingPE ? parseFloat(tickerSummary.trailingPE).toFixed(2) : "N/A"} 
          />
          <SummaryItem 
            label="Avg. Volume" 
            value={makeFriendly(tickerSummary?.averageVolume)} 
          />
          <SummaryItem 
            label="Day Low" 
            value={tickerSummary?.dayLow || "N/A"} 
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default TickerSummary;