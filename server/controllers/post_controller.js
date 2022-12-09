const Post = require('../models/post_model');
const User = require('../models/user_model');
const Card = require('../models/card_model');
const { HOSTNAME } = process.env;
const pageSize = 6;

const getPosts = async (req, res) => {
    const category = req.params.category;
    const paging = parseInt(req.query.paging) || 0;

    async function findPost(category) {
        switch (category) {
            case 'all':
                return await Post.getPosts(pageSize, paging, { category });
            case 'search': {
                const keyword = req.query.keyword;
                if (keyword) {
                    return await Post.getPosts(pageSize, paging, { keyword });
                }
                break;
            }
        }
        return Promise.resolve({});
    }
    const { posts, postCount } = await findPost(category);
    if (!posts) {
        res.status(400).send({ error: 'Wrong Request' });
        return;
    }

    const postsWithDetail = await getPostsWithDetail(posts);
    const result = (postCount > (paging + 1) * pageSize) ? {
        posts: postsWithDetail,
        next_paging: paging + 1
    } : {
        posts: postsWithDetail,
    };

    res.status(200).json(result);
};

const getPostsWithDetail = async (posts) => {
    const postIds = posts.map(post => post.id);
    const userIds = posts.map(post => post.user_id);
    const imagePath = `${HOSTNAME}images/upload/`;
    const card = await Card.getPostThumbnail(postIds);

    for (let i = 0; i < postIds.length; i++) {
        const [user] = await User.getUserInfo(userIds[i]);
        posts[i].user_name = user.name;
        posts[i].thumbnail = imagePath + card[i].image;
    }
    return posts;
}

module.exports = {
    getPosts,
}