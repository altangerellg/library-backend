const { Schema, model } = require("mongoose");
const AuthorSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: String,
});

module.exports = model("author", AuthorSchema);
