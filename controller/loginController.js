var jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const UserModel = require("../model/userModel")
function responseData(isError, message, data) {
    return {
        isError: isError,
        message: message,
        data: data
    }
}

async function register(req, res) {
    try {
        let number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let username = req.body.username;
        let password = req.body.password;
        let password2 = req.body.password2;
        let role = req.body.role ? req.body.role : "user";
        let phone = req.body.phone;
        let email = req.body.email;
        if (username == "" || password == "" || password2 == "" || phone == "" || email == "") {
            return res.json(responseData(true, "Empty Data", null));
        }
        // VALIDATE USERNAME 
        let user = await UserModel.find({ username: username })
        if (user.length > 0) {
            return res.json(responseData(true, "User Exist!!!", null));
        }
        let dumpMail = await UserModel.find({ mail: email })
        if (dumpMail.length > 0) {
            return res.json(responseData(true, "User Exist!!!", null));
        }
        // VALIDATE PASSWORD
        if (password != password2) {
            return res.json(responseData(true, "Password Not Match!!!", null));
        }
        // VALIDATE PHONE NUMBER
        for (let i = 0; i < phone.length; i++) {
            if (number.indexOf(phone.charAt(i)) < 0) {
                return res.json(responseData(true, "Invalid Phone Number!!!", null));
            }
        }
        // Validate Email 
        if (email.indexOf("@") < 0) {
            return res.json(responseData(true, "Invalid Email!!!", null));
        }
        let emailDomain = email.split("@")
        if (emailDomain[emailDomain.length - 1].indexOf(".") < 0) {
            return res.json(responseData(true, "Invalid Email!!!", null));
        }
        user = await UserModel.create({ username, password, phone, mail: email, role });
        return res.json(responseData(false, "Create User Success", user))

    } catch (error) {
        console.log("Login Fail: ", error.message);
        logger.error(`Register Fail: ${error.message}`)
        let response = responseData(true, "Register fail", error.message)
        return res.json(response);
    }
}

async function login(req, res) {
    try {
        let mail = req.body.mail;
        let password = req.body.password;
        let user = await UserModel.find({ mail, password })
        if (user.length > 0) {
            let token = createToken(user[0])
            res.cookie("token", token, { maxAge: 36000000 })
            res.cookie("username", user[0].username, { maxAge: 36000000 })
            return res.json(responseData(false, "Login Success", token));
        } else {
            return res.json(responseData(true, "Wrong mail or password", null));
        }
    } catch (error) {
        console.log("Login Fail: ", error.message);
        logger.error(`Login Fail: ${error.message}`)
        let response = responseData(true, "Login fail", error.message)
        return res.json(response);
    }
}
async function logout(req, res) {
    try {
        let token = req.cookies.token;
        if (!token) {
            res.redirect("/");
        }
        else {
            res.clearCookie("token");
            res.redirect("/")
        }
    } catch (error) {
        logger.error(`Logout Fail: ${error.message}`)
        console.log("Logout: ", error.message);
    }
}

const LoginController = {
    register, login, logout
}


function createToken(user) {
    return jwt.sign({ username: user.username, role: user.role }, process.env.SECRET_KEY,
        { expiresIn: "2d" });

}
module.exports = LoginController