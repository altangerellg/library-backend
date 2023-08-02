const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  user: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reviewContent: {
    type: String,
    required: true
  },
  book: {
    type: Object,
    required: true
  }
})

module.exports = model("review",ReviewSchema)