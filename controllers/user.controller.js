const User = require("../models/User");
const crypto = require("crypto");
const { generateJWT } = require("../utils/jwt");

exports.registerUser = async (req, res) => {
    // console.log(req);
    const salt = crypto.randomBytes(20).toString("hex");
    const hash = crypto
        .createHash("sha256")
        .update(req.body.password)
        .update(crypto.createHash("sha256").update(salt, "utf8").digest("hex"))
        .digest("hex");
    await User.create({ ...req.body, hash, salt });

    return res.status(201).send({
        message: "Successfully registered a user",
    });
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const hash = crypto
            .createHash("sha256")
            .update(req.body.password)
            .update(crypto.createHash("sha256").update(user.salt, "utf8").digest("hex"))
            .digest("hex");

        // @TODO Generate JWT (JSON Web Token)
        const token = generateJWT({ userId: user._id });
        if (hash === user.hash) {
            return {
                ...user._doc,
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

exports.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.status(203).send({
        message: "Successfully changed a user",
    });
};
exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id, req.body);
    return res.status(203).send({
        message: "Successfully deleted a user",
    });
};
exports.getUser = async (req, res) => {
    const pageSize = req.query.size || 10;
    const pageNumber = req.query.page || 0;

    const sortBy = req.query.sort || "lastname";
    const order = req.query.order === "asc" ? 1 : -1;

    let filter = {};
    Object.keys(req.body).forEach((key) => {
        filter[key] = {
            $regex: ".*" + req.body[key] + ".*",
        };
    });

    const totalElements = await User.count(filter);
    const users = await User.find(filter)
        .skip(pageSize * pageNumber)
        .limit(pageSize)
        .sort({
            [sortBy]: order,
        })
        .exec();

    return res.send({
        content: users,
        totalElements,
        totalPage: parseInt(Math.ceil(totalElements / pageSize)),
    });
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(400).json({
            message: "User not found",
        });
    }

    res.send(user._doc);
};
