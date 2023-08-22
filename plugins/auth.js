const { verifyJWT } = require("../utils/jwt");

module.exports = (req, res, done) => {
    console.log(req.headers);
    if (!req.headers.authorization)
        return res.status(401).send({
            message: "Unauthorized",
        });
    else {
        let valid = verifyJWT(req.headers.authorization.split(" ")[1]);
        if (!valid)
            return res.status(401).send({
                message: "Invalid token",
            });
    }
    done();
};
