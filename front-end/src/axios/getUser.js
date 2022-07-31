import axios from "axios";

export const getUser = async () => {
  const res = await axios("http://localhost:8080/api/user", {
    withCredentials: true,
  });

  return res.data;
};
