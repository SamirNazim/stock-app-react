import React from "react";
import { Link, Box, Text, Button, Flex } from "@chakra-ui/react";

const TickerReadOnlyRow = (props) => {
  const { data, handleEditClick } = props;
  
  const isPriceUp = data?.currentprice - data?.previousclose > 0;
  const isTotalGainUp = data?.currentprice - data?.avgprice > 0;
  
  const dailyChangePercent = (
    ((data?.currentprice - data?.previousclose) / data?.previousclose) * 100
  ).toFixed(2);
  
  const totalChangePercent = (
    ((data?.currentprice - data?.avgprice) / data?.avgprice) * 100
  ).toFixed(2);

  return (
    <tr>
      <td>
        <Link href={`/company/${data.ticker}`} color="blue.500">
          {data?.ticker}
        </Link>
      </td>
      <td>{data?.qty}</td>
      <td>${data?.avgprice}</td>
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
        <Button
          size="sm"
          colorScheme="blue"
          onClick={(event) => {
            handleEditClick(event, data?._id);
          }}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
};

export default TickerReadOnlyRow;