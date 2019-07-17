const redis = require("redis")

export const client = redis.createClient(process.env.REDIS_URL || undefined);

client.on("error", (err) => {
    console.log("CAUGHT: [redis]", err.message)
});