import React, { useState } from "react";
import { Tr, Td, Link } from "@chakra-ui/react";
import { Stat, StatNumber, StatHelpText, StatArrow } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const TickerEditableRow = (props) => {
  const { data, saveTicker, deleteTicker } = props;
  const [qty, setQty] = useState(data?.qty);
  const [avgPrice, setAvgPrice] = useState(data?.avgprice);

  return (
    <Tr>
      <Td>
        <Link href={`/company/${data.ticker}`}>{data?.ticker}</Link>
      </Td>

      <Td>
        <NumberInput size="xs" defaultValue={data?.qty}>
          <NumberInputField
            value={qty}
            onChange={(evt) => {
              setQty(evt.target.value);
            }}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Td>

      <Td>
        <NumberInput size="xs" defaultValue={data?.avgprice}>
          <NumberInputField
            value={avgPrice}
            onChange={(evt) => setAvgPrice(evt.target.value)}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Td>
      <Td>{data?.currentprice}</Td>
      <Td>
        <Stat>
          <StatNumber>
            ${(data?.currentprice - data?.previousclose).toFixed(2)}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                data?.currentprice - data?.previousclose > 0
                  ? "increase"
                  : "decrease"
              }
            />
            {(
              ((data?.currentprice - data?.previousclose) /
                data?.previousclose) *
              100
            ).toFixed(2)}
            %
          </StatHelpText>
        </Stat>
      </Td>

      <Td>
        <Stat>
          <StatNumber>
            ${((data?.currentprice - data?.avgprice) * data?.qty).toFixed(2)}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                data?.currentprice - data?.avgprice > 0
                  ? "increase"
                  : "decrease"
              }
            />
            {(
              ((data?.currentprice - data?.avgprice) / data?.avgprice) *
              100
            ).toFixed(2)}
            %
          </StatHelpText>
        </Stat>
      </Td>

      <Td>${data?.avgprice * data?.qty}</Td>

      <Td>
        <button
          type="button"
          onClick={(event) => {
            saveTicker(event, data?.ticker, qty, avgPrice);
          }}
        >
          Save
        </button>
      </Td>

      <Td>
        <button
          type="button"
          onClick={(event) => deleteTicker(event, data?._id)}
        >
          Delete
        </button>
      </Td>
    </Tr>
  );
};

export default TickerEditableRow;
