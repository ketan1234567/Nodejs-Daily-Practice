const users = [
  { id: 1, name: "Ketan" },
  { id: 2, name: "Vishal" }
];

const orders = [
  { id: 1, product: "Laptop" },
  { id: 2, product: "Mobile" }
];

function getUser(id,callback){

    setTimeout(() => {

            const demo_one=users.find(emp=>emp.id===id)

    if (!demo_one) {
        
        callback( new Error("User id not Found"))
        return 
    }
    callback(null,demo_one)
        
    }, 1000);



}


function getOrders(id,callback){


    setTimeout(() => {

            const demo_two=orders.find(emp=>emp.id===id)
    if (!demo_two) {
  callback(new Error("user name not found"))
  return
    }
    callback(null,demo_two)

        
    }, 1000);

}



getUser(1, (error, data) => {
    if (error) {
      console.log(error.message);
      return
    }
    getOrders(data.id, (error, order) => {
    if (error) {
        console.log(error.message);
        return
    }
    console.log(order);
    

    });
});