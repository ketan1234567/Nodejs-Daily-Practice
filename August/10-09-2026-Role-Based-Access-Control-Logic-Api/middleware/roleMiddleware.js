const roleMiddleware =(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"user is not authenticated"
            });

        }

        if (!allowedRoles.includes(req.user.role)) { //["ADMIN"].includes("ADMIN")
            //"ADMIN" हा "ADMIN" array मध्ये आहे का?
            //allowedRoles = कोणाला permission आहे
//req.user.role = सध्याचा user कोणत्या roleचा आहे
//includes() = दोन्ही match आहेत का ते check करते.

            return res.status(403).json({
                success:false,
                message:"Access denied you don't have to permisstion"
            })
        }

        //role is allowed
        next()
    }
}

module.exports=roleMiddleware