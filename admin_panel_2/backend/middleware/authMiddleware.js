const jwt=require('jsonwebtoken')

const authMiddleware=async(req,res,next)=>{
    try {
        const authheader=req.header.authorization

        if (!authheader) {
            return res.status(401).json({
                success:false,
                message:"Authorization token required"

            })
        }
        const token=authheader.split("")[1]

        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }

        const decoded=jwt.verify(token,
            process.env.JWT_SECRET
        )
        req.user=decoded;
        next()

        
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success:false,
            message:"Invalid or Expired token"
        });
                
    }
}

module.exports=authMiddleware