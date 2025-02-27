import React, { useState } from "react";
import TickerData from "../components/TickerData";
import TickerPriceChart from "../components/TickerPriceChart";
import RedditNews from "../components/RedditNews";
import MainNews from "../components/MainNews";
import { useParams } from "react-router-dom";
import axios from "axios";
import TickerEarningsSummary from "../components/TickerEarningsSummary.js";
import TickerSummary from "../components/TickerSummary.js";
import { Box, Button, Stack } from "@chakra-ui/react";

axios.defaults.withCredentials = true;

const TickerDataPage = () => {
  const { ticker } = useParams();
  const [activeTab, setActiveTab] = useState("summary");

  // Render the active component based on the selected tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case "summary":
        return <TickerSummary ticker={ticker} />;
      case "earnings":
        return <TickerEarningsSummary ticker={ticker} />;
      case "reddit":
        return <RedditNews ticker={ticker} />;
      case "news":
        return <MainNews ticker={ticker} />;
      default:
        return <TickerSummary ticker={ticker} />;
    }
  };

  return (
    <div>
      <TickerData />
      <TickerPriceChart />
      <div className="rowC" style={{ marginTop: "20px" }}>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Stack direction="row" spacing={4} mb={4}>
            <Button
              colorScheme={activeTab === "summary" ? "green" : "gray"}
              onClick={() => setActiveTab("summary")}
            >
              Summary
            </Button>
            <Button
              colorScheme={activeTab === "earnings" ? "green" : "gray"}
              onClick={() => setActiveTab("earnings")}
            >
              Earnings (EPS)
            </Button>
            <Button
              colorScheme={activeTab === "reddit" ? "green" : "gray"}
              onClick={() => setActiveTab("reddit")}
            >
              Reddit News
            </Button>
            <Button
              colorScheme={activeTab === "news" ? "green" : "gray"}
              onClick={() => setActiveTab("news")}
            >
              Main News
            </Button>
          </Stack>
          <Box mt={4}>
            {renderActiveComponent()}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default TickerDataPage;