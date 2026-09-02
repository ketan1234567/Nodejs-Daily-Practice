const express=require('express')
const UpdateData = require('../controller/empyoee_controller')
const routes=express.Router()

routes.patch("/empyoee",UpdateData)



module.exports=routes