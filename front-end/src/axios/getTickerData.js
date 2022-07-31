import axios from "axios";

export const getTicker = async (ticker) => {
  const res = await axios(`http://localhost:8080/ticker/${ticker}`, {
    withCredentials: true,
  });

  return res;
};
