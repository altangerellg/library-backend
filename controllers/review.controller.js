const Review = require("../models/Review")
const jwt = require("../utils/jwt")
const Book = require("../models/Book");
const User = require("../models/User");
exports.createReview = async(req,res) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verifyJWT(token)
    const userId = decoded.userId;
    console.log(userId)
    const user = await User.findById(userId);
    const book = await Book.findById(req.body.bookId);
    await Review.create({
      ...req.body,
      user,
      book
    })
    return res.status(201).send({
      message: "Successfully created a review"
    })
  }catch(err){
    return res.status(500).send(err);
  }
}

exports.getReviewByBook = async(req,res) => {
  try{
    const filteredBook = await Book.findById(req.body.bookId)
    const reviews = await Review.find(
      {book: filteredBook},
      { 
        '_id': 1,
        'reviewContent': 1,
        'user._id': 1,
        'user.firstname': 1,
        'user.lastname': 1,
        'book._id': 1,
        'date': 1
      }
      )
    if(reviews){
      return res.status(200).send({
        content: reviews      
      })
    }
  }catch(err){
    return res.status(500).send(err)
  }
}

exports.deleteReview = async(req,res) => {
  try{
    if(await Review.findByIdAndDelete(req.params.id)){
      return res.status(200).send({message:"Successfully deleted"})
    }
    else{
      return res.status(404).send({message:"Review not found"})
    }
  }catch(err){
    return res.status(500).send(err);
  }
}