const jwt = require("jsonwebtoken");
const authmiddleware = asycn = (req,res,next)=>{
    try {
        const header =req.header.authorization

        if (!header) {
            res.status(401).json({
                success:false,
                message:"token is requred"
            })
            return 
        }

        const token =header.split(" ")[1]

        const decoded= jwt.sign(
            token,
             process.env.JWT_SECRET

        );
        req.user=decoded
        next()
    } catch (error) {
 console.error("Auth Middleware Error:", error.message);
       res.status(404).json({
        message:"invalid token expired",
        success:false,
       })
        
    }
}

module.exports=authmiddleware;