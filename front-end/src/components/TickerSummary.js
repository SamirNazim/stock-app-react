import React, { useEffect, useState } from "react";
import { Table, TableCaption } from "@chakra-ui/react";
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
      <Table.Root>
        <Table variant="simple" style={{ display: "flex" }}>
          <TableCaption>
            {ticker.toUpperCase()}'s Financial Summary
          </TableCaption>
          <div className="ticker-summary-left-table">
            <Table.Body>
              <Table>
                <Table.Row>Previous Close</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.previousClose}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>

            <Table.Body>
              <Table>
                <Table.Row>Open</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.open}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>

            <Table.Body>
              <Table>
                <Table.Row>Volume</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {makeFriendly(tickerSummary?.volume)}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>

            <Table.Body>
              <Table>
                <Table.Row>Day High</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.dayHigh}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>
          </div>

          <div className="ticker-summary-right-table">
            <Table.Body>
              <Table>
                <Table.Row>Market Cap</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {makeFriendly(tickerSummary?.marketCap)}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>

            <Table.Body>
              <Table>
                <Table.Row>PE Ratio</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {parseInt(tickerSummary?.trailingPE).toFixed(2)}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>

            <Table.Body>
              <Table>
                <Table.Row>Avg. Volume</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {makeFriendly(tickerSummary?.averageVolume)}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>

            <Table.Body>
              <Table>
                <Table.Row>Day Low</Table.Row>
                <Table.Row>
                  <Heading as="h5" size="sm">
                    {tickerSummary?.dayLow}
                  </Heading>
                </Table.Row>
              </Table>
            </Table.Body>
          </div>
        </Table>
      </Table.Root>
    </div>
  );
};

export default TickerSummary;
