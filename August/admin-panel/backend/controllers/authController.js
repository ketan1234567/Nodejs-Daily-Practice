const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {

        const {
    firstName,
    lastName,
    email,
    password,
    phone,
    company,
    jobTitle,
    city,
    country,
    message
} = req.body;

if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !company ||
    !jobTitle ||
    !city ||
    !country ||
    !message
) {
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    });
}

        const [existingUser] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

const [result] = await db.query(
    `INSERT INTO leads 
    (firstName, lastName, email, password, phone, company, jobTitle, city, country, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        firstName,
        lastName,
        email,
        hashedPassword,
        phone,
        company,
        jobTitle,
        city,
        country,
        message
    ]
);
        res.status(201).json({
            success: true,
            message: "Registration successful",
            userId: result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const [users] = await db.query(
            "SELECT * FROM leads WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const logoutUser = async (req, res) => {

    res.json({
        success: true,
        message: "Logout successful"
    });

};


module.exports = {
    registerUser,
    loginUser,
    logoutUser
};