const { pool } = require('./mysqlconn');

const getPostThumbnail = async (postIds) => {
    const queryStr = 'SELECT `image` FROM `card` WHERE `post_id` IN(?) GROUP BY `post_id`';
    const bindings = [postIds];
    const [result] = await pool.query(queryStr, bindings);
    return result;
};

module.exports = {
    getPostThumbnail,
}