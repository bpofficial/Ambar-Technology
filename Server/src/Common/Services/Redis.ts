const redis = require("redis")

export const client = redis.createClient();

client.on("error", (err) => {
    console.log("CAUGHT: [redis]", err)
});