import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import TickerTable from "../components/TickerTable";
import SidebarWithHeader from "../components/SidebarWithHeader";
import TickerPieChart from "../components/TickerPieChart";
import { getUser } from "../axios/getUser.js";

axios.defaults.withCredentials = true;
const HomePage = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.log("2 ", err));
  }, []);

  return (
    <div width={100} style={{ border: "3px", solid: "#fff", padding: "20px" }}>
      <div
        className="float-child"
        style={{
          width: "30%",
          float: "left",
          padding: "20px",

          solid: "red",
        }}
      >
        <SidebarWithHeader />
      </div>

      <div
        className="float-child"
        style={{
          width: "50%",
          float: "left",
          padding: "20px",
          border: "2px",
          solid: "red",
        }}
      >
        <TickerTable user={user} setUser={setUser} />
        <TickerPieChart user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default HomePage;