const db=require('../config/db')
const redis = require("redis");

const Client = redis.createClient();

const  getuser=async(req,res)=>{
    try {
      const [rows]=await db.query("SELECT * FROM employees")
      res.json(rows)
        
    } catch (error) {
        console.log(error);
    }

}

const  getUserone=async(req,res)=>{
    try {
        const id=parseInt(req.params.id)
      const [rows]=await db.query("SELECT * FROM employees WHERE id=?",[id])

      if (!rows.length) {
        res.status(404).json({
            message:"User_id is not found"
        })
        return
         
      }      
      res.status(200).json({
        message:"sucessfully fetched",
        data:rows
      })

        
    } catch (error) {
        console.log(error);
    }

}

const saveUser=async(req,res)=>{
    try {
        const {name, salary}=req.body

        const [rows]=await db.query("INSERT INTO employees (name,salary) values(?,?)",[name,salary])
        
    } catch (error) {
        console.log(error);
    }
}

const empyoee_one_id=async(req,res)=>{
    try {

        const id=parseInt(req.params.id)

const key = `ip:${req.ip}`;

Client.connect()

const data = await Client.set(key, "ketan");


res.json(data)
         
        
    } catch (error) {
        console.log(error);
    }
}






module.exports={
    getuser,getUserone,saveUser,
    empyoee_one_id
}