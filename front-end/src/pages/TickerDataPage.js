import React from "react";
import TickerData from "../components/TickerData";
import TickerPriceChart from "../components/TickerPriceChart";
import RedditNews from "../components/RedditNews";
import MainNews from "../components/MainNews";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import TickerEarningsSummary from "../components/TickerEarningsSummary.js";
import TickerSummary from "../components/TickerSummary.js";
import { Tabs } from "@chakra-ui/react";

axios.defaults.withCredentials = true;

const TickerDataPage = () => {
  const { ticker } = useParams();

  const sendRequest = async () => {
    const res = await axios("http://localhost:8080/api/user", {
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <TickerData />
      <TickerPriceChart />
      <div className="rowC">
        <Tabs variant="soft-rounded" colorScheme="green">
          <Tabs.List>
            <Tabs>Summary</Tabs>
            <Tabs>Earnings (EPS)</Tabs>
            <Tabs>Reddit News</Tabs>
            <Tabs>Main News</Tabs>
          </Tabs.List>
          <Tabs.Content>
            <TickerSummary ticker={ticker} />
          </Tabs.Content>
          <Tabs.Content>
            <TickerEarningsSummary ticker={ticker} />
          </Tabs.Content>
          <Tabs.Content>
            <RedditNews ticker={ticker} />
          </Tabs.Content>
          <Tabs.Content>
            <MainNews ticker={ticker} />
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
};

export default TickerDataPage;
