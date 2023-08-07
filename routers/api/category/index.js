const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getCategoryById,
} = require("../../../controllers/category.controller");
const auth = require("../../../plugins/auth");

module.exports = function (fastify, opts, next) {
    fastify.post("/", createCategory);
    fastify.put("/:id", { preHandler: auth }, updateCategory);
    fastify.delete("/:id", { preHandler: auth }, deleteCategory);
    fastify.post("/find", getCategory);
    fastify.get("/find/:id", { preHandler: auth }, getCategoryById);
    next();
};
