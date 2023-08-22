const { isBefore, format } = require("date-fns");
const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const phoneRegex = /^\d{8}$/;
                return phoneRegex.test(value);
            },
            message: "Invalid phone number. Must be 8 digits.",
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Invalid email address",
        },
    },
    hash: String,
    salt: String,
    gender: {
        type: String,
        enum: ["F", "M"],
        required: true,
    },
    registrationNumber: String,
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
                    "yyyy-mm-dd"
                )} өнөөдрөөс хойш өдөр байна.`,
        },
    },
});

module.exports = model("user", UserSchema);
