import React from "react";
import { useEffect, useState } from "react";
import { Input, Stack, InputAddon, Button } from "@chakra-ui/react";
import { Table, TableCaption } from "@chakra-ui/react";
import axios from "axios";
import TickerReadOnlyRow from "./TickerReadOnlyRow";
import TickerEditableRow from "./TickerEditableRow";
import { getUser } from "../axios/getUser.js";

const TickerTable = (props) => {
  const [symbol, setSymbol] = useState("");
  const [qty, setQty] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [update, setUpdate] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const { user, setUser } = props;

  const setUserTickerTable = async () => {
    const res = await axios
      .post(
        `http://localhost:8080/api/add?symbol=${symbol}&qty=${qty}&avgprice=${avgPrice}`,
        {
          withCredentials: true,
        }
      )
      .catch((err) => setUpdate(err.response));

    setUpdate(res.data);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditRowId(contact);
  };

  useEffect(() => {
    getUser().then((data) => setUser(data.user));
  }, [update]);

  const saveTicker = async (event, symbol, setQty, setAvgPrice) => {
    event.preventDefault();

    const res = await axios
      .post(
        `http://localhost:8080/api/update?symbol=${symbol}&qty=${setQty}&avgprice=${setAvgPrice}`
      )
      .catch((err) => setUpdate(err.response));

    setEditRowId(null);
    console.log(res.data);
    setUpdate(res.data);
  };

  const deleteTicker = async (event, id) => {
    event.preventDefault();

    const res = await axios
      .delete(`http://localhost:8080/api/delete/${id}`)
      .catch((err) => setUpdate(err.response));

    setEditRowId(null);
    setUpdate(res.data);
  };

  return (
    <>
      <Stack spacing={3}>
        <InputAddon children="Symbol" />
        <Input
          type="text"
          placeholder="Stock Ticker"
          value={symbol}
          onChange={(evt) => {
            setSymbol(evt.target.value.toUpperCase());
          }}
        />
        <InputAddon children="Quantity" />
        <Input
          type="number"
          placeholder="Number of Shares"
          value={qty}
          onChange={(evt) => {
            setQty(evt.target.value);
          }}
        />
        <InputAddon children="AvgPrice" />
        <Input
          type="number"
          placeholder="Average Price"
          value={avgPrice}
          onChange={(evt) => {
            setAvgPrice(evt.target.value);
          }}
        />
        <Button colorScheme="teal" size="md" onClick={setUserTickerTable}>
          Add To Portfolio
        </Button>
      </Stack>

      {update?.status === false ? <h1>{update?.message}</h1> : ""}

      {user?.username && (
        <Table.Root>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>{user?.username}'s Portfolio Holdings</TableCaption>
            <Table.Row>
              <Table.ColumnHeader>Symbol</Table.ColumnHeader>
              <Table.ColumnHeader>Quantity</Table.ColumnHeader>
              <Table.ColumnHeader>Average Price per Share</Table.ColumnHeader>
              <Table.ColumnHeader>Current Price</Table.ColumnHeader>
              <Table.ColumnHeader>Daily Gain</Table.ColumnHeader>
              <Table.ColumnHeader>Total Gain</Table.ColumnHeader>
              <Table.ColumnHeader>Market Value</Table.ColumnHeader>
            </Table.Row>
            <Table.Body>
              {user?.data.map((data) => (
                <>
                  {editRowId === data._id ? (
                    <TickerEditableRow
                      data={data}
                      saveTicker={saveTicker}
                      deleteTicker={deleteTicker}
                      key={data._id}
                    />
                  ) : (
                    <TickerReadOnlyRow
                      data={data}
                      handleEditClick={handleEditClick}
                      key={data._id}
                    />
                  )}
                </>
              ))}
            </Table.Body>
          </Table>
        </Table.Root>
      )}
    </>
  );
};

export default TickerTable;
