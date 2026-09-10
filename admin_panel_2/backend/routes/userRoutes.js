const express=require('express')
const routes=express.Router();
const { getusers, updateUser, deleteUser } = require('../controllers/userController');


routes.get("/",getusers)
routes.put("/:id",updateUser);
routes.delete("/:id",deleteUser);


module.exports=routes