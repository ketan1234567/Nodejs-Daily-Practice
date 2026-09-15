const rolemiddleware=(...allowedusers)=>{
    return(req,res,next)=>{
        if (!req.user) {
          return  res.status(401).json({
                message:"User is not authenicated",
                success:false
            })
        }

        if (!allowedusers.includes(req.user.role)) {
                      return  res.status(401).json({
                message:"Access denied you don't have to permisstion",
                success:false
            })
        }


    // Role is allowed
    next();
    }
}

module.exports=rolemiddleware