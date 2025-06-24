const { pool } = require('./mysqlconn');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.BCRYPT_SALT);

const getUserInfo = async (userIds) => {
    const queryStr = 'SELECT `name` FROM `user` WHERE `id` IN (?)';
    const bindings = [userIds];
    const [result] = await pool.query(queryStr, bindings);
    return result;
};

const signUp = async (name, email, password) => {
        const emails = await pool.query('SELECT email FROM user WHERE email = ?', [email]);
        if (emails[0].length > 0) {
            return { error: "信箱已被註冊" };
        }

        const user = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, salt),
            picture: null,
        };

        const queryStr = 'INSERT INTO user SET ?';
        const [result] = await pool.query(queryStr, user);
        return result;
};

const nativeSignIn = async (email, password) => {
    const [users] = await pool.query('SELECT * FROM `user` WHERE `email` = ?', [email]);
    if (users.length === 0){
        return { error: "信箱尚未註冊" };
    }

    const user = users[0];
    if (!bcrypt.compareSync(password, user.password)) {
        return { error: "密碼錯誤" };
    }
    return user
};

module.exports = {
    getUserInfo,
    signUp,
    nativeSignIn,
}