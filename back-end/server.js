const express = require("express");
const app = express();
const yahooController = require("./controllers/yahooController.js");
const userController = require("./controllers/userController.js");
const userDataController = require("./controllers/tickerController.js");
const HTTP_PORT = 8080;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoose_connect = "mongodb+srv://USER:PW@stockapp.e2kx6.mongodb.net/";
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// YahooFinance
app.use("/", yahooController);

//Users
app.use("/", userController);

//Tickers
app.use("/", userDataController);

app.listen(HTTP_PORT, () => {
  console.log(`Port is successful ${HTTP_PORT}`);
  mongoose
    .connect(mongoose_connect)
    .then(() => {
      console.log("Mongoose is connected");
    })
    .catch((err) => {
      console.log("Mongoose error:" + err);
    });
});
