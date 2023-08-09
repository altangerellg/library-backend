const { registerBook, updateBook, deleteBook, getBook, getBookById,increaseLoves,decreaseLoves } = require("../../../controllers/book.contoller");
const auth = require("../../../plugins/auth");

// const { verifyJWT } = require("../../../utils/jwt");

module.exports = function (fastify, opts, next) {
    fastify.post("/", { preHandler: auth }, registerBook);  
    fastify.put("/:id", { preHandler: auth }, updateBook);
    fastify.delete("/:id", { preHandler: auth }, deleteBook);
    fastify.get("/find/:id", getBookById);
    fastify.post("/find", getBook);
    fastify.put("/love/:id",{preHandler:auth},increaseLoves)
    fastify.put("/unlove/:id",{preHandler:auth},decreaseLoves)
    next();
};

// exports.autoPrefix = '/api/test'
