const router = require('express').Router();
const {wrapAsync} = require('../util/util');

const {
    getPosts,
} = require('../controllers/post_controller');

router.get('/posts/:category',wrapAsync(getPosts));

module.exports = router;
