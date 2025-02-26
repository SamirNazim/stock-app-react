import React from "react";
import { Table, Link } from "@chakra-ui/react";
import { Stat, StatHelpText } from "@chakra-ui/react";

const TickerEditableRow = (props) => {
  const { data, handleEditClick } = props;
  return (
    <Table>
      <Table.Row>
        <Link href={`/company/${data.ticker}`}>{data?.ticker}</Link>
      </Table.Row>
      <Table.Row>{data?.qty}</Table.Row>
      <Table.Row>{data?.avgprice}</Table.Row>
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
      <Table.Row>${(data?.currentprice * data?.qty).toFixed(2)}</Table.Row>
      <Table.Row>
        <button
          type="button"
          onClick={(event) => {
            handleEditClick(event, data?._id);
          }}
        >
          Edit
        </button>
      </Table.Row>
    </Table>
  );
};

export default TickerEditableRow;
