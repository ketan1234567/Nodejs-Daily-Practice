require("dotenv").config();

const express = require("express");
const cors = require("cors");


//console.log(process.env.JWT_SECRET);


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});