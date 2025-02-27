import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const TickerData = () => {
  const { ticker } = useParams();
  const [tickerData, setTickerData] = useState({});
  
  useEffect(() => {
    const URL = `http://localhost:8080/ticker/${ticker}`;

    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setTickerData(json);
      })
      .catch(err => console.error("Error fetching ticker data:", err));
  }, [ticker]);

  const isPositiveChange = tickerData.financialData?.currentPrice - 
    tickerData.summaryDetail?.previousClose > 0;
  
  const priceChange = (
    tickerData.financialData?.currentPrice - 
    tickerData.summaryDetail?.previousClose
  )?.toFixed(2);
  
  const percentChange = (
    ((tickerData.financialData?.currentPrice - 
      tickerData.summaryDetail?.previousClose) / 
      tickerData.summaryDetail?.previousClose) * 100
  )?.toFixed(2);

  return (
    <div>
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Current Price
        </Text>
        
        <Text fontSize="2xl">
          {tickerData.financialData?.currentPrice}{" "}
          {tickerData.financialData?.financialCurrency}
        </Text>
        
        <Flex alignItems="center" mt={1}>
          <Text
            color={isPositiveChange ? "green.500" : "red.500"}
            fontSize="md"
          >
            {isPositiveChange ? "▲" : "▼"} {priceChange} ({percentChange}%)
          </Text>
        </Flex>
      </Box>
    </div>
  );
};

export default TickerData;