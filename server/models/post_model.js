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

module.exports = {
    getPosts,
};