const Book = require("../models/Book");

exports.registerBook = async req => {
    try {
        // console.log(req);
        await Book.create(req.body);
        // await Book.deleteOne("");

        return {
            message: "Successfully registered a book"
        };
    } catch (error) {
        return {
            error: "Error"
        };
    }
};
exports.updateBook = async req => {
    try {
        // console.log(req);
        await Book.findByIdAndUpdate(req.params.id, req.body);
        // await Book.deleteOne("");
        return {
            message: "Successfully registered a book"
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Error"
        };
    }
};
