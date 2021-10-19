var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  let ETH = req.cookies.ETH ? req.cookies.ETH : 3809.31
  let ETHUSD = parseFloat(ETH).toFixed(2)
  console.log("ETH: ", ETH);
  let SQG = req.cookies.SQUIDGAME ? req.cookies.SQUIDGAME : 0.0007
  let BNB = req.cookies.BNB ? req.cookies.BNB : 468.3
  let BTC = req.cookies.BTC ? req.cookies.BTC : 62729.49
  let ETHSQG = convert(ETH, SQG)
  let BNBSQG = convert(BNB, SQG)
  let BTCSQG = convert(BTC, SQG)

  res.render('dashboard/index', { title: 'Dashboard', SQG: 1 / SQG, ETHSQG, BNBSQG, BTCSQG, ETH: ETHUSD });
});
router.get('/sign-in', function (req, res, next) {
  res.render('auth/sign-in', {
    title: 'Dashboard',
    layout: 'layouts/not-auth'
  });
});

router.get('/sign-up', function (req, res, next) {
  res.render('auth/sign-up', {
    title: 'Dashboard',
    layout: 'layouts/not-auth'
  });
});

router.get('/sign-up-success', function (req, res, next) {
  res.render('auth/sign-up-success', {
    title: 'Dashboard',
    layout: 'layouts/not-auth'
  });
});

router.get('/forgot', function (req, res, next) {
  res.render('auth/forgot', {
    title: 'Dashboard',
    layout: 'layouts/not-auth'
  });
});

router.get('/buy-token', function (req, res, next) {
  let ETH = req.cookies.ETH ? req.cookies.ETH : 3809.31
  let ETHUSD = parseFloat(ETH).toFixed(2)
  console.log("ETH: ", ETH);
  let SQG = req.cookies.SQUIDGAME ? req.cookies.SQUIDGAME : 0.0007
  let BNB = req.cookies.BNB ? req.cookies.BNB : 468.3
  let BTC = req.cookies.BTC ? req.cookies.BTC : 62729.49
  let ETHSQG = convert(ETH, SQG)
  let BNBSQG = convert(BNB, SQG)
  let BTCSQG = convert(BTC, SQG)
  SQG = (1 / SQG).toFixed(2)
  res.render('buy-token/buy-token', { title: 'Express', SQG, ETHSQG, BNBSQG, BTCSQG, ETH: ETHUSD });
});
router.get('/ico-distribution', function (req, res, next) {
  let ETH = req.cookies.ETH ? req.cookies.ETH : 3809.31
  let ETHUSD = parseFloat(ETH).toFixed(2)
  console.log("ETH: ", ETH);
  let SQG = req.cookies.SQUIDGAME ? req.cookies.SQUIDGAME : 0.0007
  let BNB = req.cookies.BNB ? req.cookies.BNB : 468.3
  let BTC = req.cookies.BTC ? req.cookies.BTC : 62729.49
  let ETHSQG = convert(ETH, SQG)
  let BNBSQG = convert(BNB, SQG)
  let BTCSQG = convert(BTC, SQG)
  SQG = (1 / SQG).toFixed(2)
  res.render('distribution/ico-distribution', { title: 'Express', SQG, ETHSQG, BNBSQG, BTCSQG, ETH: ETHUSD });
});
router.get('/transactions', function (req, res, next) {
  res.render('transaction/transactions', { title: 'Express' });
});
router.get('/transaction/:id', function (req, res, next) {
  res.render('transaction/transaction-details', { title: 'Express' });
});
router.get('/profile', function (req, res, next) {
  res.render('profile/profile', { title: 'Express' });
});
router.get('/kyc-application', function (req, res, next) {
  res.render('kyc/kyc-application', { title: 'Express' });
});
router.get('/kyc-form', function (req, res, next) {
  res.render('kyc/kyc-form', { title: 'Express' });
});
router.get('/kyc-thank-you', function (req, res, next) {
  res.render('kyc/kyc-thank-you', { title: 'Express' });
});
router.get('/activity', function (req, res, next) {
  res.render('activity/activity', { title: 'Express' });
});
router.get('/faq', function (req, res, next) {
  let ETH = req.cookies.ETH ? req.cookies.ETH : 3809.31
  let ETHUSD = parseFloat(ETH).toFixed(2)
  console.log("ETH: ", ETH);
  let SQG = req.cookies.SQUIDGAME ? req.cookies.SQUIDGAME : 0.0007
  let BNB = req.cookies.BNB ? req.cookies.BNB : 468.3
  let BTC = req.cookies.BTC ? req.cookies.BTC : 62729.49
  let ETHSQG = convert(ETH, SQG)
  let BNBSQG = convert(BNB, SQG)
  let BTCSQG = convert(BTC, SQG)
  SQG = (1 / SQG).toFixed(2)
  res.render('faq/faq-page', { title: 'Express', SQG, ETHSQG, BNBSQG, BTCSQG, ETH: ETHUSD });
});
router.get('/privacy-policy', function (req, res, next) {
  res.render('static/regular-page', { title: 'Express' });
});
router.get('/terms', function (req, res, next) {
  res.render('static/regular-page', { title: 'Express' });
});

// Function 
function convert(from, to) {
  return (from / to).toFixed(2)
}

module.exports = router;
