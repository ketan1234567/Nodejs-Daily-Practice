
const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
    try {

        // ❌ MISTAKE 1:
        // const authheader = req.header.authorizations
        //
        // req.header हा function आहे आणि header name "authorization" आहे.
        //
        // Correct:
        const authheader = req.header("Authorization");


        if (!authheader) {
            // ❌ MISTAKE 2:
            // 404 वापरला होता.
            //
            // Token/authentication problem साठी 401 योग्य आहे.

            return res.status(401).json({
                message: "Token is required",
                success: false
            });
        }


        // ❌ MISTAKE 3:
        // authheader.spilt(" ")[1]
        //
        // "spilt" चुकीचे आहे.
        // Correct method = split()

        const token = authheader.split(" ")[1];


        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Decoded user information request मध्ये store करणे
        req.user = decoded;


        // User authenticated आहे,
        // म्हणून पुढच्या middleware/controller कडे जा.
        next();


    } catch (error) {

        // ❌ MISTAKE 4:
        // catch block रिकामा होता.
        //
        // JWT invalid/expired असेल तर response द्यायला हवा.

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};


module.exports = authmiddleware;

