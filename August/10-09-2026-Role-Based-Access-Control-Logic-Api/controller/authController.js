
const Employee=require('../model/User')
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const loginUser= async (req,res) => {
    try {
        const {email,password}=req.body

        const users=await Employee.findOne({
            email:email,
        })

        if (!users) {
            res.status(404).json({
                message:"all fields are requred "
            })
            return 
        }

        const isMatch = await bcrypt.compare(password, users.password)

        if (!isMatch) {
    res.status(401).json({
   message: "Invalid email or password"
    });
    return;
}

const token=jwt.sign(
    {
     userId: users._id,
        role: users.role
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: "1hr"
    }
)

if (isMatch) {
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token:token
        }
    });
}



    } catch (error) {
        console.log(error);
        
    }
  
}

module.exports=loginUser