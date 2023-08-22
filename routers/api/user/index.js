const {
    registerUser,
    updateUser,
    login,
    deleteUser,
    getUser,
    getUserById,
} = require("../../../controllers/user.controller");
const auth = require("../../../plugins/auth");

module.exports = function (fastify, opts, next) {
    fastify.post("/", registerUser);
    fastify.post("/login", login);
    fastify.put("/:id", { preHandler: auth }, updateUser);
    fastify.delete("/:id", { preHandler: auth }, deleteUser);
    fastify.post("/find", { preHandler: auth }, getUser);
    fastify.get("/find/:id", { preHandler: auth }, getUserById);
    next();
};

// exports.autoPrefix = '/api/test'
