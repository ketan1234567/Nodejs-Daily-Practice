require("dotenv").config();
const express=require('express')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
const authRoutes=require('./routes/authRoutes')

const app=express()

app.use(express.json())

app.use(cors())

app.use("/api/auth",authRoutes);
app.use("/api/leads",userRoutes);


app.listen(3000,()=>{
    console.log("start_server_Running");  
})