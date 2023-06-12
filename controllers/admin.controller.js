const crypto = require("crypto");
const Admin = require("../models/Admin");
const { generateJWT } = require("../utils/jwt");

exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        const hash = crypto
            .createHash("sha256")
            .update(req.body.password)
            .update(
                crypto
                    .createHash("sha256")
                    .update(admin.salt, "utf8")
                    .digest("hex")
            )
            .digest("hex");

        // @TODO Generate JWT (JSON Web Token)
        const token = generateJWT({ adminId: admin._id });
        if (hash === admin.hash) {
            return {
                ...admin._doc,
                token,
                hash: undefined,
                salt: undefined,
            };
        } else throw new Error("Invalid password");
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Invalid password",
        });
    }
};
exports.registerAdmin = async (req, res) => {
    try {
        // console.log(req);-
        const salt = crypto.randomBytes(20).toString("hex");
        const hash = crypto
            .createHash("sha256")
            .update(req.body.password)
            .update(
                crypto.createHash("sha256").update(salt, "utf8").digest("hex")
            )
            .digest("hex");
        await Admin.create({ ...req.body, hash, salt });

        return res.status(201).send({
            message: "Successfully registered a admin",
        });
    } catch (error) {
        console.log(error);
        return {
            error: "Error",
        };
    }
};
exports.updateAdmin = async (req) => {
    try {
        await Admin.findByIdAndUpdate(req.params.id, req.body);
        return {
            message: "Successfully changed a admin",
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Error",
        };
    }
};
exports.deleteAdmin = async (req, res) => {
    try {
        // console.log(req);
        await Admin.findByIdAndDelete(req.params.id, req.body);
        // await Admin.deleteOne("");

        return {
            message: "Successfully registered a admin",
        };
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Error",
        });
    }
};

exports.getAdmin = async (req, res) => {
    const pageSize = req.query.size || 10;
    const pageNumber = req.query.page || 0;

    const totalElements = await Admin.count();
    const admin = await Admin.find()
        .skip(pageSize * pageNumber)
        .limit(pageSize)
        .exec();

    return res.send({
        content: admin,
        totalElements,
        totalPage: parseInt(Math.ceil(totalElements / pageSize)),
    });
};
