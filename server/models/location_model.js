const { pool } = require('./mysqlconn');

const getLocation = async (locationId) => {
    const queryStr = 'SELECT * FROM `location` WHERE `id` IN(?)';
    const bindings = [locationId];
    const [result] = await pool.query(queryStr, bindings);
    return result;
}

module.exports = {
    getLocation,
}