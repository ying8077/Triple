const Post = require('../models/post_model');
const User = require('../models/user_model');
const Card = require('../models/card_model');
const Location = require('../models/location_model');
const { HOSTNAME } = process.env;
const imagePath = `${HOSTNAME}images/upload/`;
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
    const card = await Card.getPostThumbnail(postIds);

    for (let i = 0; i < postIds.length; i++) {
        const [user] = await User.getUserInfo(userIds[i]);
        posts[i].user_name = user.name;
        posts[i].thumbnail = imagePath + card[i].image;
    }
    return posts;
}

const getPost = async (req, res) => {
    const id = parseInt(req.query.id);
    const [post] = await Post.getPost(id);
    const [user] = await User.getUserInfo(post.user_id);
    const cards = await Card.getCards(id);
    const locationIds = cards.map(card => card.location_id);
    const locations = await Location.getLocation(locationIds);

    cards.map(card => {
        card.image = imagePath + card.image;
        locations.map(location => {
            if (card.location_id === location.id) {
                card.place_id = location.place_id;
                card.location_name = location.name;
                card.location_x = location.latitude;
                card.location_y = location.longitude;
            }
        })
    })

    post.user_name = user.name;
    post.cards = cards;
    res.status(200).json(post);
}

const updateLikes = async (req, res) => {
    const data = req.body;
    const result = await Post.updateLikes(data.post_id, data.like);
    res.send({ status: "success", message: "成功" });
}

const createPost = async (req, res) => {
    const data = req.body;
    const cards = data.cards;

    if (!data.title || !cards) {
        res.send({ status: "error", message: "Create Post Error: Wrong Data Format" });
        return;
    }

    try {
        const postRecord = {
            user_id: data.user_id,
            title: data.title,
            description: data.description,
        };
        const postId = await Post.createPost(postRecord);
        
        for (let i = 0; i < cards.length; i++) {
            const locationRecord = {
                place_id: cards[i].location.place_id,
                name: cards[i].location.name,
                latitude: cards[i].location.latitude,
                longitude: cards[i].location.longitude,
            };
            const locationId = await Location.createLocation(locationRecord);

            const cardRecord = {
                post_id: postId,
                location_id: locationId,
                description: cards[i].description,
                recommend: cards[i].recommend,
                image: cards[i].image
            }
            const cardId = await Card.createCard(cardRecord);
        }
    } catch (error) {
        res.send({ status: "error" });
        return;
    }

    res.send({ status: "success", message: "新增成功" });
}

const uploadImg = async (req, res) => {
    res.send({ status: "success", filename: req.file.filename });
}

module.exports = {
    getPosts,
    getPost,
    updateLikes,
    createPost,
    uploadImg,
}