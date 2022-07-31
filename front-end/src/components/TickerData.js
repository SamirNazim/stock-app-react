//565de02fe737475d8cce5237663b3f7a

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

const TickerData = () => {
  const { ticker } = useParams();
  const [tickerData, setTickerData] = useState([]);
  useEffect(() => {
    const URL = `http://localhost:8080/ticker/${ticker}`;

    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setTickerData(json);
      });
  }, [ticker]);

  return (
    <div>
      <StatGroup>
        <Stat>
          <StatLabel>Current Price</StatLabel>
          <StatNumber>
            {tickerData.financialData?.currentPrice}{" "}
            {tickerData.financialData?.financialCurrency}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                tickerData.financialData?.currentPrice -
                  tickerData.summaryDetail?.previousClose >
                0
                  ? "increase"
                  : "decrease"
              }
            />
            {(
              tickerData.financialData?.currentPrice -
              tickerData.summaryDetail?.previousClose
            ).toFixed(2)}{" "}
            {(
              ((tickerData.financialData?.currentPrice -
                tickerData.summaryDetail?.previousClose) /
                tickerData.summaryDetail?.previousClose) *
              100
            ).toFixed(2)}
            %
          </StatHelpText>
        </Stat>
      </StatGroup>
    </div>
  );
};

export default TickerData;
