const express = require("express");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
    });

module.exports=mongoose