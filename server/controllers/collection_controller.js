const validator = require('validator');
const Collection = require('../models/collection_model');

const getCollection = async (req, res) => {
    const user_id = req.query.user;
    const list = await Collection.getCollection(user_id);

    res.status(200).json(list);
}
const updateCollection = async (req, res) => {
    const data = req.body;
    const details = validator.blacklist(JSON.stringify(data.details), '<>');
    
    if (data.collection_name) {
        const newCollection = {
            user_id: data.user_id,
            name: data.collection_name,
            details: details,
        };
        await Collection.createCollection(newCollection);
    } else if (data.collection_id) {
        await Collection.updateCollection(data.collection_id, details);
    }

    res.send({ status: "success", message: "新增成功" });
}

module.exports = {
    getCollection,
    updateCollection,
}