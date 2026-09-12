const rolemiddleware=(...allowedroles)=>{
    return (req,res,next)=>{
        if (!req.user) {
         return res.status(401).json({
            success:false,
            message:"Authication Required"
         })
        }


        if(!allowedroles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:"Access denied  you do not have  permisstion"
            })
        }

        next()


    }
}
module.exports=rolemiddleware