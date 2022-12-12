const { pool } = require('./mysqlconn');

const createCollection = async (collection) => {
    const [result] = await pool.query('INSERT INTO `collection` SET ?', collection);
}

const updateCollection = async (collection_id, details) => {
    const [oldColletion] = await pool.query('SELECT `details` FROM `collection` WHERE id = ?', collection_id);
    console.log(oldColletion[0]);
    const oldDetails = oldColletion[0].details;
    const index = oldDetails.indexOf(']');
    const newDetails = oldDetails.slice(0, index) + `,${details.substring(9)}`;

    const queryStr = 'UPDATE `collection` SET `details`= ? WHERE `id` = ?';
    const bindings = [newDetails, collection_id];
    const [result] = await pool.query(queryStr, bindings);
}

module.exports = {
    createCollection,
    updateCollection,
}