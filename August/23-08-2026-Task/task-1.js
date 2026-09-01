const empyoee=[
    {id:1,name:"ketan_deshmukh"},
    {id:2,name:"anil"},
     {id:3,name:"vishal"},
     {id:4,name:"dhamu"},
     {id:5,name:"yellow"}
]

const order=[
    {id:1,order:"pending"},
    {id:2,order:"sucess"}
]
const payment=[
    {id:1,payment:"done"},
    {id:2,payment:"pending"}
]
function getUser(id) {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
        const user=empyoee.find(emp=>emp.id===id)
        if (!user) {
            reject("users not found")
            return
        }
        resolve(user)
    }, 1000);
   })  
}


// getUser(0).then((value)=>{
//     console.log(value);
// }).catch((error)=>{
//     console.log(error);
    
// })

function getOrders(userid) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
        const ORDE=order.find(emp=>emp.id===userid)
        if (!ORDE) {
            reject("order id is not found")
            return
        }
        resolve(ORDE)
    }, 2000);
})
    
}

function getpayment(userid){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pay=payment.find(emp=>emp.id===userid)
            if (!pay) {
               reject("pay not found")
               return
            }
            resolve(pay)            
        }, 3000);
    })

}

async function showall(){
    try {
        const result= await Promise.all([
            getUser(1),
            getOrders(2),
            getpayment(1)
        ]
        )
       // console.log(result);
        
        return result
       // console.log(result);
        
        
    } catch (error) {
        console.log(error);
        
        
    }
}

showall().then((value)=>{
    console.log(value);
}).catch((error)=>{
    console.log(error);
    
})