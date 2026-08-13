const user = [
    { id: 1, name: "ketan_deshmukh" },
    { id: 2, name: "anil" },
    { id: 3, name: "vishal" },
    { id: 4, name: "dhamu" }
]
const orders = [
    { id: 1, orders_status: "purshed" },
    { id: 2, orders_status: "pending" },
    { id: 3, orders_status: "sucess" },
    { id: 4, orders_status: "dispached" }
]

const payment = [
    { id: 1, payment_satus: "sucess" },
    { id: 2, orders_status: "pending" },
    { id: 3, orders_status: "failed" },
    { id: 4, orders_status: "pending" }
]

function getuser(id) {
    return new Promise((resolve, reject) => {
        const emplyoee = user.find(emp => emp.id === id)
        //console.log(emplyoee);

        if (!emplyoee) {
            reject("empyoee doesn't exits")
            return
        }
        resolve(emplyoee)

    })
}

//getuser(1)
// getuser(1).then((value)=>{
//     console.log(value);
// }).catch((error)=>{
//     console.log(error);
// })

function getOrders(user_id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderr = orders.find((value) => value.id === user_id)
            console.log(orderr);

            if (!orderr) {
                reject("order doesn't exits")
                return
            }
            resolve(orderr)


        }, 2000);


    })



}

// getOrders(2).then((value)=>{
//     console.log(value);  
// }).catch((error)=>{
//     console.log(error);

// })

// getOrders(1).then((value)=>{
//     console.log(value);   
// }).catch((error)=>{
//     console.log(error);

// })


function getpayment(user_id) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const Payment = payment.find(payment => payment.id === user_id)
            if (!Payment) {
                reject("payment doesn't exits")
            }
            resolve(Payment)

        }, 4000);




    })

}

async function dashboard() {
    try {
        const user = await getuser(1)
        const orders = await getOrders(1)
        //console.log(orders);

        const payment = await getpayment(1)

        const result = await Promise.all([
            user, orders, payment
        ])
        return result

    } catch (error) {
        console.log(error);
    }

}

dashboard().then((value) => {
    console.log(value);
}).catch((error) => {
    console.log(error);
})