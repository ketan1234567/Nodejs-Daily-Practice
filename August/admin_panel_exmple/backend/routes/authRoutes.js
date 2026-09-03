const express=require('express')
const routes=express.Router();
const {registerUser, loginUser,logoutUser, signupUser}=require('../controllers/authController')

routes.post("/register",registerUser);
routes.post("/signup",signupUser);
routes.post("/login",loginUser);
routes.post("/logout",logoutUser);



module.exports=routes