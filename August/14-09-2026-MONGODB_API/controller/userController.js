const bcrypt =require("bcrypt")

const User = require("../models/User");

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body


    } catch (error) {
        console.log(error);
        
    }
}

const registerUser=async(req,res)=>{
    try {
        const {name,email,password,role,status}=req.body

        const hashedPassword=await bcrypt.hash(
            password,10
        )




        const users= await User.create({
      name: name.trim(),
      email,
      password: hashedPassword,
      role: role || "user",
      status: status || "Active",
        });


             res.status(201).json({
                message:"User registered successfully",
                success:true,
                data:users
            });


    } catch (error) {
        console.log(error.message);

                     res.status(500).json({
                message:"server error",
                success:false
            });

        
    }
}

const  deleteUser=async(req,res)=>{
    try {
     
    } catch (error) {
        console.log(error);
        
    }
}

module.exports=registerUser