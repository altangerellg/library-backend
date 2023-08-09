const Collection = require("../models/Collection");
const Book = require("../models/Book");
const User = require("../models/User");
const { Types } = require("mongoose");
const { verifyJWT } = require("../utils/jwt");
const createCollection = async (req, res) => {
    try {
        const { name, likes, date } = req.body;
        const userData = verifyJWT(req.headers.authorization.split(" ")[1]);
        // books.map((bookId) => {
        //     createdBooks.push(Book.findById(bookId));
        // });
        const user = await User.findById(userData.userId).select("-hash -salt").exec();

        if (!user) throw new Error("Хэрэглэгч олдсонгүй");
        const createdBooks = await Book.find({
            _id: { $in: req.body.books.map((e) => new Types.ObjectId(e)) },
        });
        const payload = {
            name,
            likes,
            books: createdBooks,
            createdUser: { ...user, hash: undefined, salt: undefined },
            date,
        };

        const newCollection = new Collection(payload);

        const savedCollection = await newCollection.save();
        res.status(201).send({ message: "Амжилттай бүртгэгдлээ", data: savedCollection });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error });
    }
};

const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find({});
        return res.status(200).send({
            content: collections,
        });
    } catch (error) {
        return res.status(500).send({ error: "Алдаа гарлаа" });
    }
};

const getAllCollectionsByUserId = async (req, res) => {
    try {
        const userData = verifyJWT(req.headers.authorization.split(" ")[1]);
        // books.map((bookId) => {
        //     createdBooks.push(Book.findById(bookId));
        // });
        const user = await User.findById(userData.userId).select("-hash -salt").exec();
        const filter = {
            createdUser: user,
        };
        const collections = await Collection.find(filter);
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
            // {$inc:{totalBooks:books.length}},
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
    getAllCollectionsByUserId,
};
