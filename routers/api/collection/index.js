const {
    createCollection,
    updateCollection,
    deleteCollection,
    getAllCollections,
    getCollectionById,
} = require("../../../controllers/collection.controller");
const auth = require("../../../plugins/auth");

module.exports = function (fastify, opts, next) {
    fastify.post("/", createCollection);
    fastify.put("/:id", { preHandler: auth }, updateCollection);
    fastify.delete("/:id", { preHandler: auth }, deleteCollection);
    fastify.post("/find", { preHandler: auth }, getAllCollections);
    fastify.get("/find/:id", { preHandler: auth }, getCollectionById);
    next();
};
