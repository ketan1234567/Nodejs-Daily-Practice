const jwt = require('jsonwebtoken');

const authmiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "token is required",
            });
        }

        const token = authHeader.spilt(" ")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET

        )

        req.user = decoded

        next()


    } catch (error) {
        console.log(error);

    }
}

module.exports = authmiddleware