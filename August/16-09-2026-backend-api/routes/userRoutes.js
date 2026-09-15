const express=require('express')
const routes=express.Router()
const {registerTask,getTask,updateTask,deleteTask}=require('../controller/userController')

routes.post("/",registerTask)
routes.get("/",getTask)
routes.put("/",updateTask)
routes.delete("/",deleteTask)

module.exports=routes