const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get Authorization header
        const header = req.headers.authorization;

        // 2. Check header exists
        if (!header) {
            return res.status(401).json({
                success: false,
                message: "Token is required"
            });
        }

        // 3. Check Bearer format
        const parts = header.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }

        // 4. Extract token
        const token = parts[1];

        // 5. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        // 6. Store decoded user information
        req.user = decoded;

        // 7. Continue to next middleware/controller
        next();

    } catch (error) {
        console.log(error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;