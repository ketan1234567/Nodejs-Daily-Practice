const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    },

    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

}, {
    timestamps: true
});

const User = mongoose.model("User", Userschema);

module.exports = User;