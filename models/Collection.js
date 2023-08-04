const { Schema, model } = require("mongoose");
const CollectionSchema = new Schema({
    name: String,
    likes: Number,
    books: Array,
    createdUser: Object,
});

module.exports = model("collection", CollectionSchema);
