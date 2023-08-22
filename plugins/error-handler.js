module.exports = function (error, req, res) {
    if (error.name === "ValidationError") {
        let errors = Object.keys(error.errors).map((key) => {
            return error.errors[key].message;
        });
        return res.status(400).send({
            error: "Bad request",
            errors: errors,
        });
    } else {
        console.log(JSON.stringify(error));
        return res.status(500).send({
            error: "Internal Server error",
            message: error.message,
        });
    }
};
