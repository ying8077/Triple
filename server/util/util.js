const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { TOKEN_SECRET } = process.env;

const wrapAsync = (fn) => {
    return function (req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
};

const authentication = () => {
    return async function (req, res, next) {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            res.json({ status: 'error', code: 401, message: '請先登入!' })
            return;
        }

        jwt.verify(token, TOKEN_SECRET, async (err, payload) => {
            if (err) {
                return res.json({ status: 'error', code: 403, message: '登入失敗' })
            } else {
                next();
            }
        })
    }
};

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/images/upload")
        },
        filename: function (req, file, cb) {
            const customFileName = crypto.randomBytes(18).toString('hex').substr(0, 8);
            const fileExtension = file.mimetype.split('/')[1]; // get file extension from original file name
            cb(null, customFileName + '.' + fileExtension);
        }
    }),
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image'))
        }
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > 1000000) {
            cb(new Error('file size > 1MB'));
        }
        cb(null, true)
    }
})


module.exports = {
    wrapAsync,
    authentication,
    upload
};