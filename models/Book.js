const { isBefore, format } = require("date-fns");
const { Schema, model } = require("mongoose");
const BookSchema = new Schema({
    isbn: {
        type: String,
        required: function () {
            return this.isbn.length === 17;
        },
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: Object,
        required: true,
    },
    publicationDate: {
        type: Date,
        // required: true,
        validate: {
            validator: function (value) {
                return isBefore(new Date(value), new Date());
            },
            message: (props) => `${format(new Date(props.value), "yyyy-MM-dd")} өнөөдрөөс хойш өдөр байна.`,
        },
    },
    isFeatured: {
        type: String,
        enum: ["YES", "NO"],
        required: true,
    },
    format: {
        type: String,
        enum: ["PDF", "EPUB"],
        required: true,
    },
    coverUrl: String,
    description: {
        type: String,
        required: true,
    },
    summary: {
        // eslint-disable-next-line no-undef
        type: String,
        required: true,
    },
    filePath: String,
    categories: {
        type: Object,
        required: true,
    },
    totalViews: {
        type: Number,
        default: 0,
    },
    loves: {
        type: Number,
        default: 0,
    },
    lovedUsers:[{
        type: Schema.Types.ObjectId
    }]
});

module.exports = model("book", BookSchema);
