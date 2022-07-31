const User = require("../model/User");
const axios = require("axios");

const addTicker = async (req, res, next) => {
  const symbol = req.query.symbol;

  await axios
    .get(`http://localhost:8080/ticker/${symbol}`)
    .then((data) => {
      User.findOneAndUpdate(
        {
          _id: req.id,
          "data.ticker": { $ne: symbol },
        },
        {
          $push: {
            data: {
              ticker: symbol,
              qty: req.query.qty,
              avgprice: req.query.avgprice,
              currentprice: data.data.financialData.currentPrice,
              previousclose: data.data.summaryDetail.previousClose,
              sector: data.data.summaryProfile.sector,
              industry: data.data.summaryProfile.industry,
            },
          },
        },
        { new: true }
      )
        .then((user) => {
          if (user === null) {
            return res.json({
              status: false,
              message: "Symbol already added to your portfolio.",
            });
          }
          return res.json({
            status: true,
            message: "Symbol successfully added to your portfolio.",
          });
        })
        .catch((err) => {
          return res.json({ message: err });
        });
    }) //(currentTickerPrice = data.data.data.currentPrice)

    .catch((err) => {
      return res.json({
        message: "No ticker found.",
        error: err,
        status: false,
      });
    });
  //console.log(ticker.data.data.currentPrice);
};

const updateTicker = async (req, res, next) => {
  let symbol = req.query.symbol;

  console.log(req.query.qty);
  console.log(req.query.avgprice);
  await User.findOneAndUpdate(
    {
      _id: req.id,
    },
    {
      $set: {
        "data.$[el].qty": req.query.qty,
        "data.$[el].avgprice": req.query.avgprice,
      },
    },

    { arrayFilters: [{ "el.ticker": symbol }], new: true }
  )
    .then((data) => {
      console.log("true");
      res.json({
        message: data,
      });
    })
    .catch((err) => {
      console.log("false");
      res.json({
        message: err,
      });
    });
};

const deleteTicker = async (req, res, next) => {
  let objectId = req.params.id;

  await User.findOneAndUpdate(
    { _id: req.id },
    { $pull: { data: { _id: objectId } } },
    { new: true }
  )
    .then((updatedData) =>
      res.json({
        message: `Delete was successful.`,
        data: updatedData,
      })
    )
    .catch((err) => {
      res.json({
        message: err,
      });

      throw new Error("Data was not deleted in deleteTicker.");
    });
};

exports.addTicker = addTicker;
exports.updateTicker = updateTicker;
exports.deleteTicker = deleteTicker;
