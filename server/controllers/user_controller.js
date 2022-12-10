const jwt = require('jsonwebtoken');
const joi = require('joi');
const { TOKEN_SECRET } = process.env;
const User = require('../models/user_model');

const signUp = async (req, res) => {
    const userData = {
        name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    };
    if (!userData.name || !userData.email || !userData.password ) {
        return res.send({ status: "error", message: '請輸入姓名、信箱、密碼.' });
    }

    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()
    });
    
    const { error, value } = schema.validate(userData);
    if (error !== undefined) {
        return res.send({ status: "error", message: "資料不符合格式" });
    }

    const result = await User.signUp(userData.name, userData.email, userData.password);
    if (result.error) {
        return res.send({ status: "error", message: result.error });
    }

    res.send({ status: "success", message: "註冊成功" });
};

const nativeSignIn = async (req, res) => {

    const userData = {
        email: req.body.email,
        password: req.body.password
    };
    if (userData.email === "" || userData.password === "") {
        return res.send({ status: "error", message: '請輸入信箱、密碼' });
    }

    const result = await User.nativeSignIn(userData.email, userData.password);
    if (result.error) {
        return res.send({ status: "error", message: result.error });
    }

    const payload = {
        user_id: result.id,
        user_name: result.name,
        email: result.email
    };
    const token = jwt.sign(payload, TOKEN_SECRET);
    res.send({ status: "success", message: "登入成功", token });
};

module.exports = {
    signUp,
    nativeSignIn,
}