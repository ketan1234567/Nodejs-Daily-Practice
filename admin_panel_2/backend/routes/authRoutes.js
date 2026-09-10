const express=require('express')
const routes=express.Router();
const {signupUser,registerUser,loginUser,logoutUser}=require('../controllers/authController');


routes.post("/signup",signupUser)
routes.post("/register", registerUser)
routes.post("/login",loginUser)
routes.post("/logout",logoutUser)


module.exports=routes