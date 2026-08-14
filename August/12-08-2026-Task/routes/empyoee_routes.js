const express=require('express')
const routes=express.Router()
const {getuser,getUserone, saveUser,empyoee_one_id}=require('../controller/empyoee_controller')
const validate_data = require('../middleware/validate')

routes.get("/empyoee",getuser)

// routes.get("/empyoee/:id",getUserone)

routes.get("/empyoee/:id",empyoee_one_id)

routes.post("/empyoee",validate_data,saveUser)



module.exports=routes