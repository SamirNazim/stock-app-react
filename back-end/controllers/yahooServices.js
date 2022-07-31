const yahooFinance = require("yahoo-finance");

exports.getTickerFinancialData = (req, res) => {
  return new Promise(function (resolve, reject) {
    yahooFinance.quote(
      {
        symbol: req.params.symbol,
        modules: [
          "financialData",
          "summaryDetail",
          "summaryProfile",
          "earnings",
        ],
      },
      function (err, result) {
        if (err) {
          var error = "No symbol found";
          res.json({
            message: error,
          });
          //throw new Error("Ticker does not exist!");
        } else {
          //tickerList.push(ticker, result.financialData.currentPrice)
          //console.log(result.financialData);
          res.json({
            message: `${req.params.symbol} was found!`,
            symbol: `${req.params.symbol}`,
            financialData: result.financialData,
            summaryDetail: result.summaryDetail,
            summaryProfile: result.summaryProfile,
            earnings: result.earnings,
          });
          //resolve(result.financialData)
        }
      }
    );
  });
};

exports.getTickerChartData = (req, res) => {
  return new Promise(function (resolve, reject) {
    yahooFinance.historical(
      {
        symbol: req.query.symbol,
        from: req.query.start,
        to: req.query.end,
        period: req.query.period,
      },
      function (err, quotes) {
        if (err) {
          var error = "No symbol found";

          res.json({
            message: error,
          });
        } else {
          res.json({
            message: `${req.query.symbol} data was found!`,
            symbol: `${req.query.symbol}`,
            data: quotes,
          });
        }
      }
    );
  });
};
