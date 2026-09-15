const express=require('express')
const dotenv = require("dotenv");
const app=express()
const userRoutes=require("./routes/userRoutes")
const authRoutes=require("./routes/authRoutes")
const connectDB=require('./config/db')

dotenv.config();

app.use(express.json())



//database connect
connectDB()



app.use("/api/user/",userRoutes)
app.use("/api/auth/",authRoutes)




app.listen(3000,()=>{
    console.log("start_server_Running");  
})