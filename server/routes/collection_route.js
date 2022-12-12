const router = require('express').Router();
const { wrapAsync, authentication } = require('../util/util');

const {
    updateCollection,
} = require('../controllers/collection_controller');

router.route('/collections/update').post(authentication(), wrapAsync(updateCollection));

module.exports = router;
