const express=require('express')
const routes=express.Router()
const getData=require('../controller/empyoee_controller')



routes.get("/empyoee/:id",getData)



module.exports=routes