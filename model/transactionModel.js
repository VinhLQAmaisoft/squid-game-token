var mongoose = require("../config/database");
var Schema = mongoose.Schema; //Gom cac title vao
var transactionSchema = new Schema({
    // table gom cac thuoc tinh sau:
    username: String,
    squidgame: Number,
    base: String,
    baseAmount: Number,
    date: {
        type: Number,
        default: Date.now()
    },
    type: String,
    from:String
});
//Model: tuong tac khi thuc hien lenh
var transactionModel = mongoose.model("transaction", transactionSchema); //Ten cua table = AccountModel
module.exports = transactionModel;