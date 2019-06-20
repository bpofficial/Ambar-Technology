module.exports = {
    apps: [
        {
            name: "Ambar Technology",
            script: "./server.bundled.js",
            instances: "max",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}