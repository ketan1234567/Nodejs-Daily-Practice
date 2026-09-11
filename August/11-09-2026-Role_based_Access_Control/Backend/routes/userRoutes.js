const express=require("express")
const routes=express.Router()

const {getUsers,createTask,updateUser,deleteUser}=require('')

routes.get("/",getUsers)
routes.post("/",createTask)
routes.put("/",deleteUser)
routes.delete("/",updateUser)

module.exports=routes