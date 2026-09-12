const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser=async(req,res)=>{
    try{
        const {name,email,password,role,status}=req.body

if(!name || !email || ! password){
return res.status(400).json({
    success:false,
    message:"name and email and password are requred"
})
}

const normalizedEmail=email.trim().toLowercase();


    if (
      role !== undefined &&
      !["admin", "user"].includes(role)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }


    

    if (
      status !== undefined &&
      !["Active", "Inactive"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const existingUser= await User.findOne({
        email:normalizedEmail
    });


if(existingUser){
return res.status(409).json({
    success: false,
        message: "Email already exists",
})
}

const hashedPassword= await bcrypt.hash(password,10)

const user =await User.create({
    name:name.trim(),
    email:normalizedEmail,
    password:hashedPassword,
    role:role||"user",
    status:status|| "Active"
})

const userResponse=user.toObject()

delete userResponse.password

return res.status(201).json({
    success:true,
    message:"User created successfully",
    user:userResponse
})

    }catch(error){

            // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });

    }

}

module.exports=createUser