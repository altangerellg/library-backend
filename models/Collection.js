const { Schema, model } = require("mongoose");

const CollectionSchema = new Schema({
    name: { type: String, required: true },
    likes: { type: Number, default: 0 },
    books: [
        {
            type: Object,
        },
    ],
    createdUser: { type: Object, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = model("collection", CollectionSchema);
