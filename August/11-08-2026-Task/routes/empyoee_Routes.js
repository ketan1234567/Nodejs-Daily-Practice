const express=require('express')
const routes=express.Router()
const {getData,saveData,updateData}=require('../controller/empyoee_controller')

routes.get("/empyoee",getData)
 routes.post("/empyoee",saveData)
routes.put("/empyoee/:id",updateData)
// routes.delete("/empyoee",delete_data)


module.exports=routes