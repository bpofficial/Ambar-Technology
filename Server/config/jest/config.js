const path = require("path");

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: path.resolve(__dirname, "../../../Server/"),
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            "tsConfig": "<rootDir>/../tsconfig.json"
        }
    },
    collectCoverageFrom: [
        "<rootDir>/**/*.ts"
    ],
    moduleFileExtensions: [
        "ts",
        "js"
    ],
}