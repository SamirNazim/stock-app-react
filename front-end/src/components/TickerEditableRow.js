import React, { useState } from "react";
import { Link, Box, Text, Button, Flex, Input, HStack } from "@chakra-ui/react";

const TickerEditableRow = (props) => {
  const { data, saveTicker, deleteTicker } = props;
  const [qty, setQty] = useState(data?.qty);
  const [avgPrice, setAvgPrice] = useState(data?.avgprice);

  const isPriceUp = data?.currentprice - data?.previousclose > 0;
  const isTotalGainUp = data?.currentprice - data?.avgprice > 0;
  
  const dailyChangePercent = (
    ((data?.currentprice - data?.previousclose) / data?.previousclose) * 100
  ).toFixed(2);
  
  const totalChangePercent = (
    ((data?.currentprice - data?.avgprice) / data?.avgprice) * 100
  ).toFixed(2);

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const handleAvgPriceChange = (e) => {
    setAvgPrice(e.target.value);
  };

  return (
    <tr>
      <td>
        <Link href={`/company/${data.ticker}`} color="blue.500">
          {data?.ticker}
        </Link>
      </td>
      <td>
        <Input
          size="sm"
          type="number"
          value={qty}
          onChange={handleQtyChange}
          width="80px"
        />
      </td>
      <td>
        <Input
          size="sm"
          type="number"
          value={avgPrice}
          onChange={handleAvgPriceChange}
          width="100px"
        />
      </td>
      <td>${data?.currentprice}</td>
      <td>
        <Box>
          <Text fontWeight="medium">
            ${(data?.currentprice - data?.previousclose).toFixed(2)}
          </Text>
          <Flex alignItems="center">
            <Text 
              color={isPriceUp ? "green.500" : "red.500"}
              fontSize="sm"
            >
              {isPriceUp ? "▲" : "▼"} {dailyChangePercent}%
            </Text>
          </Flex>
        </Box>
      </td>
      <td>
        <Box>
          <Text fontWeight="medium">
            ${((data?.currentprice - data?.avgprice) * data?.qty).toFixed(2)}
          </Text>
          <Flex alignItems="center">
            <Text 
              color={isTotalGainUp ? "green.500" : "red.500"}
              fontSize="sm"
            >
              {isTotalGainUp ? "▲" : "▼"} {totalChangePercent}%
            </Text>
          </Flex>
        </Box>
      </td>
      <td>${(data?.currentprice * data?.qty).toFixed(2)}</td>
      <td>
        <HStack spacing={2}>
          <Button
            size="sm"
            colorScheme="green"
            onClick={(event) => {
              saveTicker(event, data?.ticker, qty, avgPrice);
            }}
          >
            Save
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={(event) => deleteTicker(event, data?._id)}
          >
            Delete
          </Button>
        </HStack>
      </td>
    </tr>
  );
};

export default TickerEditableRow;