var jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const UserModel = require("../model/userModel")
const TransModel = require("../model/transactionModel")
function responseData(isError, message, data) {
    return {
        isError: isError,
        message: message,
        data: data
    }
}

async function getUserTransaction(req, res) {
    let username = req.body.username;
    try {
        let transaction = await TransModel.find({ username: username })
        return res.json(responseData(false, "Get Transaction Success", transaction))
    } catch (error) {
        return res.json(responseData(true, error.message, req.body))
    }
}

async function getUserContribution(req, res) {
    let username = req.body.username;
    console.log("USERNAME: ",username);
    try {
        let user = await UserModel.findOne({ username })
        return res.json(responseData(false, "Get Contribution Success", user.contribution))
    } catch (error) {
        return res.json(responseData(false, error.message, req.params))
    }
}


const UserController = {
    getUserTransaction,
    getUserContribution

}

module.exports = UserController