const {
    registerBook,
    updateBook
} = require("../../../controllers/book.contoller");

module.exports = function(fastify, opts, next) {
    fastify.post("/", registerBook);
    fastify.put("/:id", updateBook);
    next();
};

// exports.autoPrefix = '/api/test'
