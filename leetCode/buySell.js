function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] - prices[i - 1] > 0) {
      profit = profit + (prices[i] - prices[i - 1]);
    }
  }
  return profit;
}
