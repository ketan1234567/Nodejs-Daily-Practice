const  validate_data=async(req,res)=>{
    try {
       const  {name,salary,next}= req.body

       if (name=="" && salary=="") {
        res.status(400).json({
            message:"name and salary is required"
        })
        return 
       }

       if (salary<=0) {
        res.status(400).json({
            message:"salary should be grather 0"
        })
        return
       }
       next()
        
    } catch (error) {
        console.log(error);
    }
}

module.exports=validate_data