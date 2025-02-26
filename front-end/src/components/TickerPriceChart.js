import React from "react";
import { Line } from "react-chartjs-2";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

//Custom function that takes in number of days X and goes back X number of days from present day (i.e. 15 days from 2022/07/31)
const updateChartTimeFrame = (length = 0) => {
  if (length === 999) {
    return new Date(new Date().getFullYear(), 0, 1);
  } else {
    let now = new Date();
    return new Date(now.setDate(now.getDate() - length));
  }
};

const TickerPriceChart = () => {
  const [chartData, setChartData] = useState([]);
  const { ticker } = useParams();

  const [startDate, setStartDate] = useState(186);
  const [period, setPeriod] = useState("w");

  useEffect(() => {
    let URL;
    if (startDate === undefined) {
      URL = `http://localhost:8080/chart/data?symbol=${ticker}&end="${updateChartTimeFrame(
        0
      )}"&period=${period}`;
    } else {
      URL = `http://localhost:8080/chart/data?symbol=${ticker}&start="${updateChartTimeFrame(
        startDate
      )}"&end="${updateChartTimeFrame(0)}"&period=${period}`;
    }

    const fetchData = async () => {
      let response = await fetch(URL);
      response = await response.json();
      return response;
    };

    fetchData().then((data) => {
      setChartData(data);
    });
  }, [startDate, period, ticker]);

  const mappedData = {
    labels: chartData.data
      ?.map((test) => {
        let myDate = new Date(test.date);
        return myDate.toLocaleDateString();
      })
      .reverse(),
    datasets: [
      {
        label: chartData.symbol?.toUpperCase(),

        data: chartData.data?.map((test) => test.close).reverse(),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <>
      <div style={{ width: "30vw" }}>
        <Stack spacing={4} direction="row" align="center">
          <Button colorScheme="teal" size="sm" onClick={() => setStartDate(5)}>
            5d
          </Button>
          <Button colorScheme="teal" size="sm" onClick={() => setStartDate(15)}>
            15d
          </Button>
          <Button colorScheme="teal" size="sm" onClick={() => setStartDate(31)}>
            1mo
          </Button>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => {
              setStartDate(186);
            }}
          >
            6mo
          </Button>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => setStartDate(999)}
          >
            YTD
          </Button>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => setStartDate(undefined)}
          >
            Max
          </Button>
        </Stack>
        <Stack width="125px" onClick={(event) => setPeriod(event.target.value)}>
          <Select>
            <option value="d">daily</option>
            <option value="w">weekly</option>
            <option value="m">monthly</option>
          </Select>
        </Stack>

        {/* 
        //DOES NOT WORK:: Test Function to show stock gain/loss depending on timeline selection (i.e. AMD has gained 23% in the last month)
        
        {timelineGain && (
          <Stat>
            <StatLabel>Timeline </StatLabel>
            <StatNumber>{timelineGain.toFixed(2)}</StatNumber>
            <StatHelpText>
              <Stat.UpIndicator type={timelineGain > 0 ? "increase" : "decrease"} />
              {(
                (timelineGain /
                  chartData?.data[Object.keys(chartData["data"]).length - 1]
                    .close) *
                100
              ).toFixed(2)}
              %
            </StatHelpText>
          </Stat>
        )} */}
        <Line data={mappedData} />
      </div>
    </>
  );
};

export default TickerPriceChart;
