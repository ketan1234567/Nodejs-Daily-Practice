
const User = require('../model/users');

const createTask = async (req,res)=> {
    try{
        const {name,email,age}=req.body

        const user=await User.create({
            name:name,
            email:email,
            age:age
        })
        res.status(201).json({
            sucess:true,
            message:"User Created Sucessfully",
            data:user
        });

    }catch(error){
    console.log(error);
    
        res.status(500).json({
            success:false,
            message:"Server error"

        })

    }



};

const getUsers=async(req,res)=>{
    try{
        const user= await User.find()
        res.status(200).json({
            success:true,
            data:user
        });
    }catch(error){
        console.log(error)

                res.status(500).json({
            success:false,
            message:"Server error"

        })

    }
}

const updateData=async(req,res)=>{
    try{
        const id=req.params
        const user= await User.find()
        res.status(200).json({
            success:true,
            data:user
        });
    }catch(error){
        console.log(error)

                res.status(500).json({
            success:false,
            message:"Server error"

        })

    }
}

const deleteData=async(req,res)=>{
    try{
                const id=req.params
        const user= await User.find()
        res.status(200).json({
            success:true,
            data:user
        });
    }catch(error){
        console.log(error)

                res.status(500).json({
            success:false,
            message:"Server error"

        })

    }
}

module.exports={
    createTask,
    getUsers,
    updateData,
    deleteData
}