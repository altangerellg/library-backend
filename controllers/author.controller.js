const Author = require("../models/Author");
const path = require("path");
const fs = require("fs");

exports.registerAuthor = async (req, res) => {
    await Author.create(req.body);
    return res.status(200).send({
        message: "Successfully registered",
    });
};
exports.updateAuthor = async (req) => {
    await Author.findByIdAndUpdate(req.params.id, req.body);
    return {
        message: "Successfully updated",
    };
};
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author)
            return res.status(400).send({
                message: "Author not found",
            });
        const image = author._doc.image;

        if (fs.existsSync(path.join(__dirname, "..", "public", "uploads", image)))
            fs.unlinkSync(path.join(__dirname, "..", "public", "uploads", image));

        await Author.findByIdAndDelete(req.params.id);
        return {
            message: "Successfully deleted a Author",
        };
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            error: "Error",
        });
    }
};

exports.getAuthor = async (req, res) => {
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

    const totalElements = await Author.count(filter);
    const author = await Author.find(filter)
        .skip(pageSize * pageNumber)
        .limit(pageSize)
        .sort({
            [sortBy]: order,
        })
        .exec();

    return res.send({
        content: author,
        totalElements,
        totalPage: parseInt(Math.ceil(totalElements / pageSize)),
    });
};

exports.getAuthorById = async (req, res) => {
    const author = await Author.findById(req.params.id);

    if (!author) {
        res.status(400).json({
            message: "Author not found",
        });
    }

    res.send(author._doc);
};
