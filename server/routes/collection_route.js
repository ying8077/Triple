const router = require('express').Router();
const { wrapAsync, authentication } = require('../util/util');

const { getCollection, updateCollection, } = require('../controllers/collection_controller');

router.route('/collections').get(authentication(), wrapAsync(getCollection));
router.route('/collections/update').post(authentication(), wrapAsync(updateCollection));

module.exports = router;
