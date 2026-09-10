const express=require('express')
const routes=express.Router()
const { createTask,getUsers,updateData,deleteData}=require('../controller/userController')

// console.log(typeof createTask);
// console.log(typeof getUsers);

routes.post("/",createTask);
routes.get("/",getUsers);
routes.put("/:id",updateData);
routes.delete("/:id",deleteData);

module.exports=routes