const express=require('express')
const app=express()

const emp_routes=require('./routes/empyoee_routes')

app.use(express.json())


app.use("/api",emp_routes)



app.listen(3000,()=>{
    console.log("start_server_Running");
})