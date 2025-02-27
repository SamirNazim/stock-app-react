import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Button, Stack, Box } from "@chakra-ui/react";
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Custom function that takes in number of days X and goes back X number of days from present day
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
      try {
        let response = await fetch(URL);
        response = await response.json();
        return response;
      } catch (error) {
        console.error("Error fetching chart data:", error);
        return { data: [] };
      }
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

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <>
      <div style={{ width: "30vw" }}>
        <Stack spacing={4} direction="row" align="center" mb={4}>
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
        
        <Box width="125px" mb={4}>
          <select 
            value={period}
            onChange={handlePeriodChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value="d">daily</option>
            <option value="w">weekly</option>
            <option value="m">monthly</option>
          </select>
        </Box>

        {chartData.data && chartData.data.length > 0 ? (
          <Line data={mappedData} />
        ) : (
          <Box p={4} textAlign="center">
            Loading chart data...
          </Box>
        )}
      </div>
    </>
  );
};

export default TickerPriceChart;