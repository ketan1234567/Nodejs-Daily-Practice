const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const data = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error.message);
     console.log("Database connection failed");
    }
};

module.exports = connectDB;