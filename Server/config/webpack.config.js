const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

require('dotenv').config({ path: '../.env' });
const dev = true;//process.env.MODE == 'development' || process.env.MODE == 'dev' ? true : false;

const tsConfig = {
    "compilerOptions": {
        "sourceMap": true,
        "removeComments": true,
        "allowJs": true,
        "moduleResolution": "node",
        "module": "commonjs",
        "target": "es6",
        "types": ["jest"],
        "allowSyntheticDefaultImports": true,
        "lib": ["es5", "es6", "es7", "es2017", "es2016", "es2015"],
        "rootDirs": ["../../src"],
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    },
    "include": [
        "../../src/**/*"
    ],
    "exclude": [
        "../../node_modules/",
        "../../config/",
        "../../src/**/__tests__/*"
    ]
}

module.exports = () => {

    /**
     * Pretty-print tsConfig to the tsconfig.json file.. This minimises amount of files needed for 
     *  different envs as it's not permitted to save tsconfig as a module.
     */
    fs.writeFileSync('./config/ts/webpack.tsconfig.json', JSON.stringify(tsConfig, null, 4));

    return {
        // Enable defaults for each build setting.
        mode: dev ? 'development' : 'production',

        // Project entry points (chunks)
        entry: {
            // Server entry path, intialisation is in index.ts of src.
            server: path.join(__dirname, '../src/index.ts')
        },

        // Resolutions, extensions, aliases etc.
        resolve: {
            // Resolve all the extensions used in the project, mjs is a mongoosejs file.
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs']
        },

        // Bundled output config.
        output: {
            // Set output path to the build dir
            path: path.resolve(__dirname + '/../../Build/'),

            // Although there are chunks, it's best to save them all into a single file on the server side as there's no need to lazy load or code split.
            filename: '[name].bundled.js',
        },
        // Set the bundle target to node. Alternative is 'web', which is intended for browsers only.
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        module: {
            rules: [
                {
                    // Look for all typescript files to process.
                    test: /\.(ts|tsx)$/,

                    // Exclude searching node_modules folder.
                    exclude: /node_modules/,
                    use: {
                        // Define the desired loader to process any found typescript files.
                        loader: "awesome-typescript-loader?configFileName=./config/ts/webpack.tsconfig.json"
                    }
                },
                {
                    // Fix: Scans for MongooseJS files and compiles them to native javascript.
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                }
            ]
        },
        plugins: [
            // Copy from parent project's dir to the corresponding build dir.
            new CopyPlugin([
                { from: '../.env', to: './' }
            ]),
            new webpack.IgnorePlugin(/^hiredis$/)
        ]
    }
} 
