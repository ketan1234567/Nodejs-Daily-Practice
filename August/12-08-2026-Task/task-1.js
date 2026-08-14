const empyoee=[
    {id:1,user_name:"ketan_Deshmukh"},
    {id:2,user_name:"anil"},
    {id:3,user_name:"vishal"},
    {id:4,user_name:"aniket"}
]

function getUser(id){
    return new Promise((resolve, reject) => {
        const user=empyoee.find(emp=>emp.id===id)

        if (!user) {

                 reject("user not found")    
                 return     
        }
resolve(user)


    })
}

getUser(1).then((value)=>{
    console.log(value);
}).catch((error)=>{
    console.log(error);
    
})