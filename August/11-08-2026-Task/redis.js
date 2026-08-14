const redis= require('redis')

const main_user = redis.createClient();

main_user.on("connect",()=>{
    console.log("redis connected");
    
})

 main_user.connect()

// .then((value)=>{
//     console.log("connected_server");
    
// }).catch((error)=>{
//     console.log(error);
    
// })


// main_user.set("user_1","ketan")
// .then((value)=>{
    
//     console.log("sucessfully stored");
    
// }).catch((error)=>{
//     console.log(error);
    
// })




