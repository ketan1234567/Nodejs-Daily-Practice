const express=require('express')
const app=express()
const Empyoee_Routes=require('./routes/empyoee_routes')

app.use(express.json())


app.use("/api",Empyoee_Routes)



app.listen(3000,()=>{
    console.log("start_server_running");
})