const express=require("express")
const routes=express.Router()
const {registerUser,deleteUser}=require("../controller/userController")
const rolemiddleware=require("../middleware/rolemiddleware")

routes.post("/",registerUser)
routes.delete("/:id",rolemiddleware("ADMIN"),deleteUser)

module.exports=routes