const cors = require("cors");
require("dotenv").config();
const express=require('express')
const app=express()


const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')

app.use(express.json())

app.use(cors())

app.use("/api/auth",authRoutes)

app.use("/api/leads",userRoutes)

app.listen(3000,()=>{
    console.log("start_server_run");
})