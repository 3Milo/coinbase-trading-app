import WebSocket from 'ws';
const CryptoJS = require('crypto-js');
const keys = require('./keys.js');
 
// the various websocket channels you can subscribe to
// add to this as we go
const CHANNEL_NAMES = {
 level2: 'level2',
 user: 'user',
 tickers: 'ticker',
 ticker_batch: 'ticker_batch',
 status: 'status',
 market_trades: 'market_trades',
};
 
// The base URL of the API
const WS_API_URL = 'wss://advanced-trade-ws.coinbase.com';
 
// Function to generate a signature using CryptoJS
function sign(str, secret) {
 const hash = CryptoJS.HmacSHA256(str, secret);
 return hash.toString();
}
 
function timestampAndSign(message, channel, products = []) {
 const timestamp = Math.floor(Date.now() / 1000).toString();
 const strToSign = `${timestamp}${channel}${products.join(',')}`;
 const sig = sign(strToSign, keys.secret);
 return { ...message, signature: sig, timestamp: timestamp };
}
 
const ws = new WebSocket(WS_API_URL);
 
function subscribeToProducts(products, channelName, ws) {
 const message = {
   type: 'subscribe',
   channel: channelName,
   api_key: keys.public,
   product_ids: products,
 };
 const subscribeMsg = timestampAndSign(message, channelName, products);
 ws.send(JSON.stringify(subscribeMsg));
}
 
function unsubscribeToProducts(products, channelName, ws) {
 const message = {
   type: 'unsubscribe',
   channel: channelName,
   api_key: keys.public,
   product_ids: products,
 };
 const subscribeMsg = timestampAndSign(message, channelName, products);
 ws.send(JSON.stringify(subscribeMsg));
}
 
function onMessage(data) {
 const parsedData = JSON.parse(data);
 console.log(parsedData);
}

// const connections = [];
let sentUnsub = false;
// for (let i = 0; i < 1; i++) {
 const date1 = new Date(new Date().toUTCString());
//  const ws = new WebSocket(WS_API_URL);
 
 ws.on('message', function (data) {
   const date2 = new Date(new Date().toUTCString());
   const diffTime = Math.abs(date2 - date1);
   if (diffTime > 25000 && !sentUnsub) {
     unsubscribeToProducts(['BTC-USD'], CHANNEL_NAMES.ticker_batch, ws);
     sentUnsub = true;
   }
 
   const parsedData = JSON.parse(data);
   if (parsedData.events[0]) {
     console.log(parsedData.events[0]);
   }
 });
 
 ws.on('open', function () {
   const products = ['BTC-USD'];
   subscribeToProducts(products, CHANNEL_NAMES.ticker_batch, ws);
 });
 
//  connections.push(ws);
// }