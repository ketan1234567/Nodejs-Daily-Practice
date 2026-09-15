const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../model/User");


const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body

        const hashpassword = await bcrypt.hash(password, 10)

        const users = await User.create(
            {
                name: name.trim(),
                email,
                password: hashpassword,
                role: role || "user",
                status: status || "active"

            }
        )

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            data: users
        })


    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "server error",
            success: false
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email })


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }


        if (user.status !== "Active") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);


        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        //create jwt token

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,

            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1hr"
            }

        )

        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: userResponse,
        });



    } catch (error) {

        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });

    }
}



module.exports = { registerUser, loginUser }