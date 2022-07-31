import React from "react";
import { Tr, Td, Link } from "@chakra-ui/react";
import { Stat, StatNumber, StatHelpText, StatArrow } from "@chakra-ui/react";

const TickerEditableRow = (props) => {
  const { data, handleEditClick } = props;
  return (
    <Tr>
      <Td>
        <Link href={`/company/${data.ticker}`}>{data?.ticker}</Link>
      </Td>
      <Td>{data?.qty}</Td>
      <Td>{data?.avgprice}</Td>
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
      <Td>${(data?.currentprice * data?.qty).toFixed(2)}</Td>
      <Td>
        <button
          type="button"
          onClick={(event) => {
            handleEditClick(event, data?._id);
          }}
        >
          Edit
        </button>
      </Td>
    </Tr>
  );
};

export default TickerEditableRow;
