const Collection = require("../models/Collection");

exports.registerCollection = async (req, res) => {
    // console.log(req);

    return res.status(201).send({
        message: "Registered a collection",
    });
};

exports.deleteCollection = async (req, res) => {
    await Collection.findByIdAndDelete(req.params.id, req.body);
    return res.status(203).send({
        message: "Successfully deleted a Collection",
    });
};

exports.getCollectionById = async (req, res) => {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
        res.status(400).json({
            message: "Collection not found",
        });
    }

    res.send(collection._doc);
};
