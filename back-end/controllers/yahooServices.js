// require syntax (if your code base does not support imports)
const yahooFinance = require("yahoo-finance2").default; // NOTE the .default

exports.getTickerFinancialData = async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const queryOptions = {
      modules: ["financialData", "summaryDetail", "summaryProfile", "earnings"],
    };

    const result = await yahooFinance.quoteSummary(symbol, queryOptions);

    res.json({
      message: `${symbol} was found!`,
      symbol: symbol,
      financialData: result.financialData,
      summaryDetail: result.summaryDetail,
      summaryProfile: result.summaryProfile,
      earnings: result.earnings,
    });
  } catch (error) {
    res.status(400).json({
      message: "No symbol found",
      error: error.message,
    });
  }
};

exports.getTickerChartData = async (req, res) => {
  try {
    const query = req.query.symbol;
    const queryOptions = {
      period1: req.query.start,
      period2: req.query.end,
      interval: req.query.period,
    };

    const result = await yahooFinance.chart(query, queryOptions);

    res.json({
      message: `${query} data was found!`,
      symbol: query,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching data",
      error: error.message,
    });
  }
};
