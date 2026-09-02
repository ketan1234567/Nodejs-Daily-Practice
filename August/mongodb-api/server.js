const express=require('express')
const app=express()


app.listen(3000,()=>{
    console.log("start_server_run")
})

app.get("/", (req, res) => {
    res.send("Hello MongoDB API");
});