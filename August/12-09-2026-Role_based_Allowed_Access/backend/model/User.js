const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Task title
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Task description
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
        password: {
      type: String,
      required: true,
    },

            role: {
      type: String,
      enum:["admin","user"],
       default:"user",
    },
            status: {
      type: String,
      enum:["Active","Inactive"],
     default:"Active",
    },
},
  {
    timestamps: true,
  }

);

module.exports = mongoose.model("User", UserSchema);