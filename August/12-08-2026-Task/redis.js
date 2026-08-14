const redis = require("redis");

const main_user = redis.createClient();

main_user.on("connect", () => {
    console.log("redis connected");
});

async function main() {
    try {
        await main_user.connect();

        console.log("connected_server");

        await main_user.set("user_1", "ketan");

       

        const value = await main_user.get("user_1");

        console.log(value);

    } catch (error) {
        console.log(error);
    }
}

main();