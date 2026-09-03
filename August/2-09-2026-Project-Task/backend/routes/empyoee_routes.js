const express=require('express')
const routes=express.Router()
const {register_data,showData,Update_data,delete_data}=require('../controller/')

routes.post("/",register_data)
routes.get("/",showData)
routes.update("/",Update_data)
routes.delete("/",delete_data)


module.exports=routes