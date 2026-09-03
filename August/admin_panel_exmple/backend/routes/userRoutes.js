const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const routes=express.Router();
const { getUsers, updateUser, deleteUser } = require('../controllers/userController');

routes.get("/",authMiddleware,getUsers);
routes.put("/:id",authMiddleware,updateUser);
routes.delete("/:id",authMiddleware,deleteUser);

module.exports=routes