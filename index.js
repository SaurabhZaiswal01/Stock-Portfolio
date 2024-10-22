const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
app.use(cors());

const port = 3000;

app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// Q1 Calculate the Returns of the Stocks added
function calculateReturns(boughtAt, marketPrice, quantity) {
  return (marketPrice - boughtAt) * quantity;
}
app.get('/calculate-returns', (request, response) => {
  const boughtAt = parseFloat(request.query.boughtAt);
  const marketPrice = parseFloat(request.query.marketPrice);
  const quantity = parseInt(request.query.quantity);
  // const a =  response.sendStatus(calculateReturns(boughtAt, marketPrice, quantity))
  return response.send(
    calculateReturns(boughtAt, marketPrice, quantity).toString()
  );
});

// Q2 Calculate the Total Returns
function totalReturns(stock1, stock2, stock3, stock4) {
  return (
    parseFloat(stock1) +
    parseFloat(stock2) +
    parseFloat(stock3) +
    parseFloat(stock4)
  );
}
app.get('/total-returns', (request, response) => {
  const { stock1, stock2, stock3, stock4 } = request.query;

  return response.send(totalReturns(stock1, stock2, stock3, stock4).toString());
});

// Q3  Calculate the Return Percentage
function calculateReturnPercentage(boughtAt, returns) {
  return (returns / boughtAt) * 100;
}
app.get('/calculate-return-percentage', (request, response) => {
  const boughtAt = parseFloat(request.query.boughtAt);
  const returns = parseFloat(request.query.returns);
  return response.send(
    calculateReturnPercentage(boughtAt, returns).toFixed(2).toString()
  );
});

// Q4 Calculate the Total Return Percentage
function totalReturnPercentage(stock1, stock2, stock3, stock4) {
  return (
    parseFloat(stock1) +
    parseFloat(stock2) +
    parseFloat(stock3) +
    parseFloat(stock4)
  );
}
app.get('/total-return-percentage', (request, response) => {
  const { stock1, stock2, stock3, stock4 } = request.query;

  return response.send(
    totalReturnPercentage(stock1, stock2, stock3, stock4).toString()
  );
});

// Q5 Identify the Status of Stocks based on their Return Value
function identifyStockStatus(returnPercentage) {
  return returnPercentage > 0 ? 'profit' : 'loss';
}
app.get('/status', (request, response) => {
  const returnPercentage = parseFloat(request.query.returnPercentage);
  return response.send(identifyStockStatus(returnPercentage));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
