const empyoee=[
    {id:1,name:"ketan"},
    {id:2,name:"vishal"},
    {id:3,name:"aniketa"}
]

function getUser(id) {
    return  new Promise((resolve, reject) => {
        const  users=empyoee.find(emp=>emp.id===id)
        if (!users) {
            reject("user not found ")
            return 
        }
       resolve(users)
    })
    
}

async function showUser(id){
    try {
        const data= await getUser(id)
        console.log(data);
        return data
        
    } catch (error) {
      console.log(error);
        
    }
}

showUser(1).then((value)=>{
    console.log(value);  
}).catch((error)=>[
    console.log(error)
    
])