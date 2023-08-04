const { bookSchema, model } = require("mongoose");
const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    likes: { type: Number, default: 0 },
    books: [bookSchema],
    createdUser: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = model("collection", CollectionSchema);
