const express=require('express')
const routes=express.Router()
const {registerUser,loginUser}=require('../controller/authController')

routes.post("/",registerUser)
routes.post("/",loginUser)


module.exports=routes