const jwt = require('jsonwebtoken');
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

module.exports = {
    wrapAsync,
    authentication
};