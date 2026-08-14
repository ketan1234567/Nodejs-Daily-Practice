const mysqli=require('mysql2/promise')

const pool=mysqli.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"company"

})

module.exports=pool