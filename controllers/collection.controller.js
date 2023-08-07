const Collection = require("../models/Collection");

const createCollection = async (req, res) => {
    try {
        const { name, likes, books, createdUser, date } = req.body;

        const newCollection = new Collection({
            name,
            likes,
            books,
            createdUser,
            date,
        });

        const savedCollection = await newCollection.save();
        res.status(201).send({ message: "Амжилттай бүртгэгдлээ", data: savedCollection });
    } catch (error) {
        res.status(500).send({ error: "Алдаа гарлаа" });
    }
};

const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        return res.status(200).send({
            content: collections,
        });
    } catch (error) {
        return res.status(500).send({ error: "Алдаа гарлаа" });
    }
};

const getCollectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await Collection.findById(id);

        if (!collection) {
            return res.status(404).send({ error: "Алдаа гарлаа" });
        }

        res.send(collection);
    } catch (error) {
        res.status(500).send({ error: "Алдаа гарлаа" });
    }
};

const updateCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, likes, books, createdUser, date } = req.body;

        const updatedCollection = await Collection.findByIdAndUpdate(
            id,
            { name, likes, books, createdUser, date },
            { new: true }
        );

        if (!updatedCollection) {
            return res.status(404).send({ error: "Алдаа гарлаа" });
        }
        console.log(updatedCollection);
        res.send({ message: "Амжилттай шинэчлэгдлээ", data: updatedCollection });
    } catch (error) {
        res.status(500).send({ error: "Алдаа гарлаа" });
    }
};

const deleteCollection = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCollection = await Collection.findByIdAndDelete(id);

        if (!deletedCollection) {
            return res.status(404).send({ error: "Алдаа гарлаа" });
        }

        res.send({ message: "Амжилттай устгагдлаа", data: deletedCollection });
    } catch (error) {
        res.status(500).send({ error: "Алдаа гарлаа" });
    }
};

module.exports = {
    createCollection,
    getAllCollections,
    getCollectionById,
    updateCollection,
    deleteCollection,
};
