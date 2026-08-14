const express= require('express')

const redis= require('redis')
const app=express()
const empyoee_route=require('./routes/empyoee_Routes')

app.use(express.json())

app.use("/api",empyoee_route)


const main_user = redis.createClient();

main_user.on("connect",()=>{
    console.log("redis connected");
    
})

 main_user.connect()



app.listen(3000,()=>{
    console.log("start_server_Running");
})

