const router = require('express').Router();
const {wrapAsync} = require('../util/util');

const {
    getPosts,
} = require('../controllers/post_controller');

router.route('/posts/:category').get(wrapAsync(getPosts));

module.exports = router;
