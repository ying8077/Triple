const router = require('express').Router();
const { wrapAsync, authentication } = require('../util/util');
const { getPosts, getPost, updateLikes} = require('../controllers/post_controller');

router.route('/posts/detail').get(wrapAsync(getPost));
router.route('/posts/:category').get(wrapAsync(getPosts));
router.route('/posts/like').post(authentication(), wrapAsync(updateLikes));

module.exports = router;
