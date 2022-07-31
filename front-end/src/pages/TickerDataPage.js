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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

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
          <TabList>
            <Tab>Summary</Tab>
            <Tab>Earnings (EPS)</Tab>
            <Tab>Reddit News</Tab>
            <Tab>Main News</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TickerSummary ticker={ticker} />
            </TabPanel>
            <TabPanel>
              <TickerEarningsSummary ticker={ticker} />
            </TabPanel>
            <TabPanel>
              <RedditNews ticker={ticker} />
            </TabPanel>
            <TabPanel>
              <MainNews ticker={ticker} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default TickerDataPage;
