require('dotenv').config({ path: '../.env' });
const dev = process.env.MODE == 'development' || process.env.MODE == 'dev' ? true : false;

module.exports = {
    env: {
        es6: true
    },
    extends: [
        "standard",
        "eslint:recommended", 
        "plugin:@typescript-eslint/recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "typescript-eslint-parser",
    parserOptions: {
        project: "../ts/tsconfig.json",
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "no-console": dev ? 'off' : 'on'
    }

}