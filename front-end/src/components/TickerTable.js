import React from "react";
import { useEffect, useState } from "react";
import { 
  Input, 
  Stack, 
  Button, 
  Box, 
  Text,
  Table
} from "@chakra-ui/react";
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
    try {
      const res = await axios.post(
        `http://localhost:8080/api/add?symbol=${symbol}&qty=${qty}&avgprice=${avgPrice}`,
        {
          withCredentials: true,
        }
      );
      setUpdate(res.data);
    } catch (err) {
      setUpdate(err.response);
    }
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditRowId(contact);
  };

  useEffect(() => {
    getUser().then((data) => setUser(data.user));
  }, [update, setUser]);

  const saveTicker = async (event, symbol, setQty, setAvgPrice) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/update?symbol=${symbol}&qty=${setQty}&avgprice=${setAvgPrice}`
      );
      setEditRowId(null);
      console.log(res.data);
      setUpdate(res.data);
    } catch (err) {
      setUpdate(err.response);
    }
  };

  const deleteTicker = async (event, id) => {
    event.preventDefault();

    try {
      const res = await axios.delete(`http://localhost:8080/api/delete/${id}`);
      setEditRowId(null);
      setUpdate(res.data);
    } catch (err) {
      setUpdate(err.response);
    }
  };

  return (
    <>
      <Stack spacing={3} mb={4}>
        <Text fontWeight="medium">Symbol</Text>
        <Input
          type="text"
          placeholder="Stock Ticker"
          value={symbol}
          onChange={(evt) => {
            setSymbol(evt.target.value.toUpperCase());
          }}
        />
        <Text fontWeight="medium">Quantity</Text>
        <Input
          type="number"
          placeholder="Number of Shares"
          value={qty}
          onChange={(evt) => {
            setQty(evt.target.value);
          }}
        />
        <Text fontWeight="medium">Average Price</Text>
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

      {update?.status === false ? (
        <Box p={3} bg="red.100" color="red.800" borderRadius="md" my={4}>
          {update?.message}
        </Box>
      ) : null}

      {user?.username && (
        <Box overflowX="auto" mt={4}>
          <table style={{width: "100%", borderCollapse: "collapse"}}>
            <thead>
              <tr>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Symbol</th>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Quantity</th>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Average Price</th>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Current Price</th>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Daily Gain</th>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Total Gain</th>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Market Value</th>
                <th style={{padding: "10px", textAlign: "left", borderBottom: "1px solid #ccc"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user?.data && user.data.map((data) => (
                <React.Fragment key={data._id}>
                  {editRowId === data._id ? (
                    <TickerEditableRow
                      data={data}
                      saveTicker={saveTicker}
                      deleteTicker={deleteTicker}
                    />
                  ) : (
                    <TickerReadOnlyRow
                      data={data}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <Text mt={2} fontStyle="italic" textAlign="center">
            {user?.username}'s Portfolio Holdings
          </Text>
        </Box>
      )}
    </>
  );
};

export default TickerTable;