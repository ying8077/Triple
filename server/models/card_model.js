const { pool } = require('./mysqlconn');

const getPostThumbnail = async (postIds) => {
    const queryStr = 'SELECT `image` FROM `card` WHERE `post_id` IN(?) GROUP BY `post_id`';
    const bindings = [postIds];
    const [result] = await pool.query(queryStr, bindings);
    return result;
};

const getCards = async (postId) => {
    const queryStr = 'SELECT `location_id`, `description`, `recommend`, `image` FROM `card` WHERE `post_id` IN(?)';
    const bindings = [postId];
    const [result] = await pool.query(queryStr, bindings);
    return result;
}

const createCard = async (card) => {
    const [result] = await pool.query('INSERT INTO `card` SET ?', card);
    return result.insertId;
}

module.exports = {
    getPostThumbnail,
    getCards,
    createCard,
}