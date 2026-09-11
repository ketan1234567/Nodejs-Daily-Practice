const express=require('express')
const app=express();
require('dotenv').config();
const userRoutes=require('./routes/userRoutes')

const connectDB=require('./config/db')

app.use(express.json())
connectDB()
app.use("/api/user",userRoutes)

app.listen(3000,()=>{
    console.log("start_server_Running");  
})



