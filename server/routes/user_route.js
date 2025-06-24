const router = require('express').Router();
const {wrapAsync} = require('../util/util');

const {
    signUp,
    nativeSignIn,
} = require('../controllers/user_controller');

router.route('/users/signUp').post(wrapAsync(signUp));
router.route('/users/signIn').post(wrapAsync(nativeSignIn));

module.exports = router;
