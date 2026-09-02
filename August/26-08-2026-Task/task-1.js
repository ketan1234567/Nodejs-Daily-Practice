const employee = [
    { id: 1, name: "ketan" },
    { id: 2, name: "vishal" },
    { id: 3, name: "sandeep" }
];

const orders = [
    { id: 1, product: "mobile" },
    { id: 2, product: "laptop" },
    { id: 3, product: "mobile_cover" }
];

const payments = [
    { id: 1, status: "pending" },
    { id: 2, status: "done" },
    { id: 3, status: "success" }
];

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = employee.find(emp => emp.id === id);

            if (!user) {
                reject(new Error("User not found"));
                return;
            }

            resolve(user);
        }, 1000);
    });
}

function getOrders(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const order = orders.find(item => item.id === userId);

            if (!order) {
                reject(new Error("Order not found"));
                return;
            }

            resolve(order);
        }, 2000);
    });
}

function getPayment(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const payment = payments.find(item => item.id === userId);

            if (!payment) {
                reject(new Error("Payment not found"));
                return;
            }

            resolve(payment);
        }, 3000);
    });
}


// =====================================
// 1️⃣ SEQUENTIAL
// =====================================

async function sequential() {

    try {

        console.time("Sequential Time");

        const user = await getUser(1);

        const order = await getOrders(2);

        const payment = await getPayment(3);

        console.timeEnd("Sequential Time");

        console.log("Sequential Result:", {
            user,
            order,
            payment
        });

    } catch (error) {

        console.log("Sequential Error:", error.message);

    }
}


// =====================================
// 2️⃣ PROMISE.ALL - PARALLEL
// =====================================

async function parallel() {

    try {

        console.time("Parallel Time");

        const [user, order, payment] = await Promise.all([
            getUser(1),
            getOrders(2),
            getPayment(3)
        ]);

        console.timeEnd("Parallel Time");

        console.log("Parallel Result:", {
            user,
            order,
            payment
        });

    } catch (error) {

        console.log("Parallel Error:", error.message);

    }
}


// =====================================
// RUN BOTH
// =====================================

async function main() {

    console.log("===== SEQUENTIAL =====");

    await sequential();


    console.log("\n===== PARALLEL =====");

    await parallel();

}

main();