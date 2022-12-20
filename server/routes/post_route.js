const router = require('express').Router();
const { wrapAsync, authentication, upload } = require('../util/util');
const { getPosts, getPost, updateLikes, createPost, uploadImg} = require('../controllers/post_controller');

router.route('/posts/detail').get(wrapAsync(getPost));
router.route('/posts/:category').get(wrapAsync(getPosts));
router.route('/posts/like').post(authentication(), wrapAsync(updateLikes));
router.route('/posts').post(wrapAsync(createPost));
router.route('/posts/img').post(upload.single('card_image'), wrapAsync(uploadImg));

module.exports = router;
