import React, { useEffect, useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { getTicker } from "../axios/getTickerData.js";
const TickerSummary = (props) => {
  const { ticker } = props;
  const [tickerSummary, setTickerSummary] = useState([]);

  useEffect(() => {
    getTicker(ticker).then((res) => {
      console.log(res.data);
      setTickerSummary(res.data.summaryDetail);
    });
  }, []);

  function intlFormat(num) {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
  }
  function makeFriendly(num) {
    if (num >= 10000000) return intlFormat(num / 1000000) + "B";
    if (num >= 1000000) return intlFormat(num / 1000000) + "M";
    if (num >= 1000) return intlFormat(num / 1000) + "k";
    return intlFormat(num);
  }
  return (
    <div>
      <TableContainer>
        <Table variant="simple" style={{ display: "flex" }}>
          <TableCaption>
            {ticker.toUpperCase()}'s Financial Summary
          </TableCaption>
          <div className="ticker-summary-left-table">
            <Tbody>
              <Tr>
                <Td>Previous Close</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.previousClose}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>

            <Tbody>
              <Tr>
                <Td>Open</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.open}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>

            <Tbody>
              <Tr>
                <Td>Volume</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {makeFriendly(tickerSummary?.volume)}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>

            <Tbody>
              <Tr>
                <Td>Day High</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.dayHigh}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>
          </div>

          <div className="ticker-summary-right-table">
            <Tbody>
              <Tr>
                <Td>Market Cap</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {makeFriendly(tickerSummary?.marketCap)}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>

            <Tbody>
              <Tr>
                <Td>PE Ratio</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {parseInt(tickerSummary?.trailingPE).toFixed(2)}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>

            <Tbody>
              <Tr>
                <Td>Avg. Volume</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {makeFriendly(tickerSummary?.averageVolume)}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>

            <Tbody>
              <Tr>
                <Td>Day Low</Td>
                <Td>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.dayLow}
                  </Heading>
                </Td>
              </Tr>
            </Tbody>
          </div>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TickerSummary;
