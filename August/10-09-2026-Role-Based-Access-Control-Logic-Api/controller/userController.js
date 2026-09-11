
const Employee=require('../model/User')
const bcrypt = require("bcrypt");

const createTask= async (req,res) => {
    try {
       //console.log(req.body)
        const {name,email,password,role}=req.body
        const hashedPassword =await bcrypt.hash(password,10)

                const Users=await Employee.create({
            name,
            email,
                password:hashedPassword,
            role

        }


            
        )



        if(!Users){
         res.status(404).json({
            success:false,
            message:"all Fields are requred"
         })
         return 
        }

         res.status(201).json({
            success:true,
            message:"sucessfully Registered User",
            data:Users
         })
        
    } catch (error) {
        console.log(error);
        
        
    }
    
}

const deleteUsers= async (req,res) => {
    try {
      
        const id=req.params.id

        const users=await Employee.deleteOne({
            _id:id
        })

        if (users.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
        
    } catch (error) {
              console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
        
    }
    
}

module.exports={
deleteUsers,
createTask
}