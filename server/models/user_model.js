const { pool } = require('./mysqlconn');

//getUserInfo
const getUserInfo = async (userIds) => {
    const queryStr = 'SELECT `name` FROM `user` WHERE `id` IN (?)';
    const bindings = [userIds];
    const [result] = await pool.query(queryStr, bindings);
    return result;
};

module.exports = {
    getUserInfo,
}