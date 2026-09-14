const express=require("express")
const app=express()
const connectDB=require('./config/db')
//const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

app.use(express.json())

//connect database 

connectDB()


app.use("/api/users/",userRoutes)
 //app.use("/api/auth/",authRoutes )


app.listen(3000,()=>{
    console.log("start_server_Running");  
})

