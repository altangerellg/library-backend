const fastify = require("fastify");
const mongoose = require("mongoose");
const autoload = require("@fastify/autoload");
const path = require("path");
const errorHandler = require("../plugins/error-handler");
const multer = require("fastify-multer");
require("dotenv").config();
const crypto = require("crypto");
const Admin = require("../models/Admin");
const server = fastify({ logger: true });
server.register(multer.contentParser);

server.setErrorHandler(errorHandler);

server.register(require("@fastify/static"), {
    root: path.join(__dirname, "..", "public"),
    prefix: "/public/", // optional: default '/'
});
server.register(autoload, {
    dir: path.join(__dirname, "..", "routers"),
    maxDepth: 10,
});

const startServer = async () => {
    console.log(process.env.DB_URL);
    try {
        await mongoose.connect(`${process.env.DB_URL}`);

        const salt = crypto.randomBytes(20).toString("hex");
        const userData = {
            firstname: "admin",
            lastname: "super",
            email: "superadmin@lib.mn",
            phone: "99111111",
            password: "12345678",
            gender: "M",
            birthDate: "1900-01-01",
        };
        const hash = crypto
            .createHash("sha256")
            .update(userData.password)
            .update(crypto.createHash("sha256").update(salt, "utf8").digest("hex"))
            .digest("hex");

        const admin = await Admin.findOne({ email: userData.email });
        if (!admin) await Admin.create({ ...userData, hash, salt });

        server.log.info("[SERVER] Connected to MongoDB");
        server.listen({
            port: process.env.PORT,
        });
        server.log.info("[SERVER] Server started");
    } catch (error) {
        server.log.error(error);
    }
};

startServer();
