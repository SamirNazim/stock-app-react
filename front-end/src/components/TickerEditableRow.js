import React, { useState } from "react";
import { Table, Link } from "@chakra-ui/react";
import { Stat, StatHelpText } from "@chakra-ui/react";
import { NumberInput } from "@chakra-ui/react";

const TickerEditableRow = (props) => {
  const { data, saveTicker, deleteTicker } = props;
  const [qty, setQty] = useState(data?.qty);
  const [avgPrice, setAvgPrice] = useState(data?.avgprice);

  return (
    <Table>
      <Table.Row>
        <Link href={`/company/${data.ticker}`}>{data?.ticker}</Link>
      </Table.Row>

      <Table.Row>
        <NumberInput size="xs" defaultValue={data?.qty}>
          <NumberInput.Input
            value={qty}
            onChange={(evt) => {
              setQty(evt.target.value);
            }}
          />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput>
      </Table.Row>

      <Table.Row>
        <NumberInput size="xs" defaultValue={data?.avgprice}>
          <NumberInput.Input
            value={avgPrice}
            onChange={(evt) => setAvgPrice(evt.target.value)}
          />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput>
      </Table.Row>
      <Table.Row>{data?.currentprice}</Table.Row>
      <Table.Row>
        <Stat>
          <Stat.ValueText>
            ${(data?.currentprice - data?.previousclose).toFixed(2)}
          </Stat.ValueText>
          <StatHelpText>
            <Stat.UpIndicator
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
      </Table.Row>

      <Table.Row>
        <Stat>
          <Stat.ValueText>
            ${((data?.currentprice - data?.avgprice) * data?.qty).toFixed(2)}
          </Stat.ValueText>
          <StatHelpText>
            <Stat.UpIndicator
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
      </Table.Row>

      <Table.Row>${data?.avgprice * data?.qty}</Table.Row>

      <Table.Row>
        <button
          type="button"
          onClick={(event) => {
            saveTicker(event, data?.ticker, qty, avgPrice);
          }}
        >
          Save
        </button>
      </Table.Row>

      <Table.Row>
        <button
          type="button"
          onClick={(event) => deleteTicker(event, data?._id)}
        >
          Delete
        </button>
      </Table.Row>
    </Table>
  );
};

export default TickerEditableRow;
