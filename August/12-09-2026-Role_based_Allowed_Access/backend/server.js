const express=require("express")
const app=express()
const userRoutes=require('./routes/userRoutes')
const taskRoutes=require('./routes/taskRoutes')

app.use(express.json())





app.use("/api/user",userRoutes)
app.use("/api/user",taskRoutes)



app.listen(3000,()=>{
    console.log("start_server_Running");
})




