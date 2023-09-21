const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes/index.route')
const app = express()
const cors = require('cors')


require('dotenv').config();
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))

// cors
app.use(cors())
app.options('*', cors())
// const api = process.env.API_URL
//connect db
mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
        dbName : 'eShopDB'})
    .then(() =>{
        console.log('connect db sucessfull!!')
    })
    .catch((err) =>{console.log(err)})
    
// routes
router(app)

app.listen(port,()=>{
    console.log(`App listening on ${port}`)
    
})




const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'YOUR_API_KEY',
  APISECRET: 'YOUR_API_SECRET'
});

// Các thời điểm mở và đóng lệnh
const openTimes = ['14:59:58', '06:59:58', '22:59:58'];
const closeTimes = ['15:00:01', '07:00:01', '23:00:01'];

// Hàm để mở lệnh long market
function openLongMarketOrder(pair, quantity) {
  binance.marketBuy(pair, quantity, (error, response) => {
    if (error) {
      console.error('Lỗi khi mở lệnh long market:', error.body);
    } else {
      console.log('Đã mở lệnh long market thành công:', response);
    }
  });
}

// Hàm để đóng lệnh market
function closeMarketOrder(pair, quantity) {
  binance.marketSell(pair, quantity, (error, response) => {
    if (error) {
      console.error('Lỗi khi đóng lệnh market:', error.body);
    } else {
      console.log('Đã đóng lệnh market thành công:', response);
    }
  });
}

// Hàm kiểm tra funding rate của một cặp tiền và thực hiện lệnh
function checkAndExecuteOrders(pair) {
  binance.futuresFundingRate(pair, (error, fundingRate) => {
    if (error) {
      console.error('Lỗi khi lấy funding rate:', error.body);
      return;
    }

    const currentTime = new Date().toLocaleTimeString();

    if (openTimes.includes(currentTime) && parseFloat(fundingRate.fundingRate) >= -0.0025 && parseFloat(fundingRate.fundingRate) <= -0.02) {
      // Mở lệnh long market vào thời điểm và điều kiện đó
      const tradingPair = pair;
      const orderQuantity = 0.1; // Đổi thành số lượng bạn muốn mua
      openLongMarketOrder(tradingPair, orderQuantity);
    } else if (closeTimes.includes(currentTime)) {
      // Đóng lệnh vào thời điểm đóng lệnh
      const tradingPair = pair;
      const orderQuantity = 0.1; // Đổi thành số lượng bạn muốn bán
      closeMarketOrder(tradingPair, orderQuantity);
    }
  });
}

// Chọn cặp tiền mà bạn muốn theo dõi funding rate
const tradingPair = 'BTCUSDT';

// Kiểm tra và thực hiện lệnh mỗi giây
setInterval(() => {
  checkAndExecuteOrders(tradingPair);
}, 1000);


