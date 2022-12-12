const validator = require('validator');
const Collection = require('../models/collection_model');

const updateCollection = async (req, res) => {
    const data = req.body;
    const details = validator.blacklist(JSON.stringify({"list":[{"id":1,"qty":1}]}), '<>');
    
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
    updateCollection,
}