

function  getUser(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
              resolve({name:"ketan"})
        }, 1000);
      
    })

}
function  getOrders(){
    return new Promise((resolve, reject) => {
                setTimeout(() => {
 resolve({order:"confirmed",status:"purshche"})
        }, 2000);
       
    })

}
function  getProducts(){

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({Product_name:"mobile_one_two"})
        }, 3000);
        
    })

}


 async function showAll() {
    try {
console.time("Sequential");
        const data1=await getUser()
        const data2=await getOrders()
        const data3=await getProducts()

    console.timeEnd("Sequential");

        console.log("Sequential Result:", [data1, data2, data3]);

 console.time("Parallel");

 const [demo1,demo2,demo3]=await Promise.all([
    getUser(),
    getOrders(),
    getProducts()
 ])

     console.timeEnd("Parallel");

     console.log("Parallel Result:", [demo1, demo2, demo3]);
    
    
        
    } catch (error) {
        console.log(error);
        
        
    }
    
}

showAll().then((value)=>{
    console.log(value);
}).catch((error)=>{
    console.log(error);
    
})