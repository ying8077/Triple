const { pool } = require('./mysqlconn');

const getPosts = async (pageSize, paging = 0, requirement = {}) => {
    const condition = [];
    if (requirement.category === 'all') {
        condition.sql = '';
    } else if (requirement.keyword != null) {
        condition.sql = 'WHERE title LIKE ?';
        condition.binding = [`%${requirement.keyword}%`];
    }

    const limit = {
        sql: 'LIMIT ?, ?',
        binding: [pageSize * paging, pageSize]
    };
    const postQuery = 'SELECT * FROM post ' + condition.sql + ' ORDER BY id ' + limit.sql;
    const postBindings = condition.binding ? condition.binding.concat(limit.binding) : limit.binding;
    const [posts] = await pool.query(postQuery, postBindings);

    const postCountQuery = 'SELECT COUNT(*) as count FROM post ' + condition.sql;
    const postCountBindings = condition.binding;

    const [postCounts] = await pool.query(postCountQuery, postCountBindings);

    return {
        'posts': posts,
        'postCount': postCounts[0].count
    };
};

const getPost = async (postId) => {
    const queryStr = 'SELECT * FROM `post` WHERE `id` IN(?)';
    const bindings = [postId];
    const [result] = await pool.query(queryStr, bindings);
    return result;
}

const updateLikes = async (postId, like) => {
    const queryStr = 'UPDATE `post` SET `likes` = `likes` + ? WHERE `id` = ?';
    const bindings = [like, postId];
    const [result] = await pool.query(queryStr, bindings);
}

const createPost = async (post) => {
    const [result] = await pool.query('INSERT INTO `post` SET ?', post);
    return result.insertId;
}

module.exports = {
    getPosts,
    getPost,
    updateLikes,
    createPost,
};