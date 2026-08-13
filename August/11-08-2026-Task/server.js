const express= require('express')
const app=express()
const empyoee_route=require('./routes/empyoee_Routes')

app.use(express.json())


app.use("/api",empyoee_route)



app.listen(3000,()=>{
    console.log("start_server_Running");
})