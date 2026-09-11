const express=require('express')
const routes=express.Router()
const {createTask,deleteUsers}=require('../controller/userController')

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

routes.post("/",createTask)


routes.delete("/:id",authMiddleware,roleMiddleware("ADMIN"),deleteUsers)


module.exports=routes