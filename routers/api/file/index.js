const multer = require("fastify-multer"); // or import multer from 'fastify-multer'
const path = require("path"); // or import multer from 'fastify-multer';
const auth = require("../../../plugins/auth");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "..", "public", "uploads"),
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

module.exports = function (fastify, opts, next) {
    fastify.post(
        "/upload",
        {
            preHandler: [auth, upload.array("files", 10)],
            //  upload.array("files", 10)
        },
        function (req, res) {
            return res.send({
                message: "Success",
                files: req.files.map((e) => ({
                    ...e,
                    path: undefined,
                    destination: undefined,
                })),
            });
        }
    );
    next();
};
