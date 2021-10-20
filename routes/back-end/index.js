var express = require('express');
var router = express.Router();
var axios = require('axios');
const LoginController = require('../../controller/userController')
/* GET users listing. */
router.get('/price', async function (req, res, next) {
  // GET CURRENT TOKEN INFOR
  let request = await axios.get(process.env.API_GET_ORIGIN_PRICE)
  // console.log(request.data.data);
  // Name, synbol,price
  const coinData = request.data.data
  let requestBTC = await axios.get(process.env.API_BNB + "BTCUSDT")
  const BTCUSDT = requestBTC.data.price
  requestBTC = await axios.get(process.env.API_BNB + "ETHUSDT")
  const ETHUSDT = requestBTC.data.price
  requestBTC = await axios.get(process.env.API_BNB + "BNBUSDT")
  const BNBUSDT = requestBTC.data.price
  res.cookie('SQUIDGAME', coinData.price, { maxAge: 900000, httpOnly: true })
  res.cookie('BTC', BTCUSDT, { maxAge: 900000, httpOnly: true })
  res.cookie('ETH', ETHUSDT, { maxAge: 900000, httpOnly: true })
  res.cookie('BNB', BNBUSDT, { maxAge: 900000, httpOnly: true })
  res.json({ coinData, BNBUSDT, BTCUSDT, ETHUSDT })
});

router.post('/register', LoginController.register)
router.post('/login', LoginController.login)
router.post('/logout', LoginController.logout)
module.exports = router;
