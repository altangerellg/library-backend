const {
  createReview,
  deleteReview,
  getReviewByBook
} = require("../../../controllers/review.controller")

const auth = require("../../../plugins/auth")

module.exports = function(fastify,opts,next){
  fastify.post("/",{preHandler: auth},createReview)
  fastify.delete("/:id",{preHandler: auth},deleteReview);
  fastify.post("/find",getReviewByBook)
  next();
}