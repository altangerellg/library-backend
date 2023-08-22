const { Schema, model } = require("mongoose");
const { isBefore, format } = require("date-fns");
const AdminSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        required: true,
        type: String,
        validate: {
            validator: function (value) {
                const phoneRagex = /^\d{8}$/;
                return phoneRagex.test(value);
            },
            message: "Invalid phone number, Must be 8 digits",
        },
        unique: true,
    },
    email: {
        required: true,
        type: String,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Invalid email address",
        },
        unique: true,
    },
    hash: String,
    salt: String,
    gender: {
        type: String,
        enum: ["F", "M"],
        required: true,
    },
    registrationNumber: String,
    createdAtDatetime: {
        type: Date,
        defualt: new Date(),
    },
    birthDate: {
        required: true,
        type: Date,
        validate: {
            validator: function (value) {
                return isBefore(new Date(value), new Date());
            },
            message: (props) =>
                `${format(
                    new Date(props.value),
                    "yyyy-MM-dd"
                )} өнөөдрөөс хойш өдөр байна.`,
        },
    },
});

module.exports = model("admin", AdminSchema);
