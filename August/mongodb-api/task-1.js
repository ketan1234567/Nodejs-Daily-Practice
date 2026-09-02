
    const users = [
      { id: 1, name: "Ketan" },
      { id: 2, name: "Rahul" }
    ];

function findUserById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             const user = users.find(user => user.id === id);
            if (!user) {
               reject("User Not Found") 
            }
            resolve(user)
        }, 3000);
    })
    
}


 async function showallsuser(){
    try {
        const data=await findUserById(0)
       // console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
        
        
    }
}
showallsuser().then((value)=>{
    console.log(value);
}).catch((error)=>{
    console.log(error);
    
})



// findUserById(2).then((value)=>{
//     console.log(value);
// }).catch((error)=>{
//     console.log(error);  
// })




// function findUserById(id, callback) {
//   setTimeout(() => {
//     const users = [
//       { id: 1, name: "Ketan" },
//       { id: 2, name: "Rahul" }
//     ];

//     const user = users.find(user => user.id === id);

//     if (!user) {
//       return callback(new Error("User not found"));
//     }

//     callback(null, user);
//   }, 1000);
// }

// findUserById(-1,(error,data)=>{

//     if (error) {
//         console.log(error.message);
//         return
//     }
//     console.log(data);
// })