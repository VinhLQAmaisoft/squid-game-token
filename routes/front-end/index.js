var express = require('express');
var jwt = require('jsonwebtoken')
var router = express.Router();


/* GET home page. */
router.get('/', auth, function (req, res, next) {
  res.render('dashboard/index', ejsData(req));
});
router.get('/sign-in', function (req, res, next) {
  let token = req.cookies.token;
  let tokenData = verifyToken(token);
  if (tokenData) {
    return res.redirect("/")
  }
  return res.render('auth/sign-in', {
    title: 'Dashboard',
    layout: 'layouts/not-auth'
  });
});

router.get('/sign-up', function (req, res, next) {
  let token = req.cookies.token;
  let tokenData = verifyToken(token);
  if (tokenData) {
    return res.redirect("/")
  }
  return res.render('auth/sign-up', {
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
// BUY TOKEN PAGE
router.get('/buy-token', auth, function (req, res, next) {

  res.render('buy-token/buy-token', ejsData(req));
});

router.get('/transactions', auth, function (req, res, next) {
  res.render('transaction/transactions', ejsData(req));
});
router.get('/transaction/:id', auth, function (req, res, next) {
  res.render('transaction/transaction-details', ejsData(req));
});
router.get('/profile', auth, function (req, res, next) {
  res.render('profile/profile', ejsData(req));
});
router.get('/kyc-application', auth, function (req, res, next) {
  res.render('kyc/kyc-application', ejsData(req));
});
router.get('/kyc-form', auth, function (req, res, next) {
  res.render('kyc/kyc-form', ejsData(req));
});
router.get('/kyc-thank-you', auth, function (req, res, next) {
  res.render('kyc/kyc-thank-you', ejsData(req));
});
router.get('/activity', auth, function (req, res, next) {
  res.render('activity/activity', ejsData(req));
});
router.get('/faq', function (req, res, next) {

  res.render('faq/faq-page', ejsData(req));
});
router.get('/privacy-policy', function (req, res, next) {
  res.render('static/regular-page', ejsData(req));
});
router.get('/terms', function (req, res, next) {
  res.render('static/regular-page', ejsData(req));
});
router.get('/landing', function (req, res, next) {
  res.render('landing/landing', {layout:"layouts/landing"});
});

// Function 
function convert(from, to) {
  return (from / to).toFixed(2)
}
function auth(req, res, next) {
  let token = req.cookies.token;
  console.log("TOKEN: ", token);
  // AUTH
  if (token === undefined) {
    console.error("AUTH FAIL, CAN'T FIND TOKEN ");
    return res.redirect("/sign-in");
  }
  // VALIDATE TOKEN
  let tokenData = verifyToken(token);
  if (tokenData == null) {
    res.clearCookie("token");
    return res.redirect("/sign-in")
  }
  console.log("DECODED TOKEN: ", tokenData.username, tokenData.role);
  req.role = tokenData.role;
  req.username = tokenData.username
  next()
}

function verifyToken(token) {
  try {

    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.error("INVALID TOKEN: ", error.message);
    return null
  }
}

function ejsData(req) {
  let username = req.cookies.username
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
  return { SQG, ETHSQG, BNBSQG, BTCSQG, ETH: ETHUSD, username }
}

module.exports = router;
