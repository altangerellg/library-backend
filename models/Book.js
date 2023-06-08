const { Schema, model } = require("mongoose");
const BookSchema = new Schema({
    isbn: {
        type: String,
        required: function() {
            return this.isbn.length === 17;
        }
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    coverUrl: String,
    description: String,
    category: {
        type: String,
        required: true
    }
});

module.exports = model("book", BookSchema);
