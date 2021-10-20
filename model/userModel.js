var mongoose = require("../config/database");
var Schema = mongoose.Schema; //Gom cac title vao
var userSchema = new Schema({
    // table gom cac thuoc tinh sau:
    username: String,
    password: String,
    phone: String,
    mail: String,
    role: {
        type: String,
        default: "user"
    },
});
//Model: tuong tac khi thuc hien lenh
var userModel = mongoose.model("user", userSchema); //Ten cua table = AccountModel
module.exports = userModel;