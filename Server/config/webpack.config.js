const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

require('dotenv').config({ path: '../.env' });
const dev = true;//process.env.MODE == 'development' || process.env.MODE == 'dev' ? true : false;

const tsConfig = {
    "compilerOptions": {
        "outDir": "../../../Build/" + ( dev ? 'Development/Types' : 'Production/Types'),
        "sourceMap": true,
        "removeComments": true,
        "allowJs": false,
        "moduleResolution": "node",
        "module": "commonjs",
        "target": "es6",
        "allowSyntheticDefaultImports": true,
        "lib": ["es5", "es6", "es7", "es2017"],
        "declaration": true,
        "declarationDir": "../../../Build/" + ( dev ? 'Development/Types' : 'Production/Types'),
        "forceConsistentCasingInFileNames": true,
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true,
        "rootDirs": ["../../src"]
    },
    "include": [
        "../../src/**/*"
    ],
    "exclude": [
        "../../node_modules/",
        "../../config/"
    ]
}

module.exports = () => {
    
    /**
     * Pretty-print tsConfig to the tsconfig.json file.. This minimises amount of files needed for 
     *  different envs as it's not permitted to save tsconfig as a module.
     */    
    fs.writeFileSync('./config/ts/tsconfig.json', JSON.stringify( tsConfig, null, 4 ) );

    return {
        // Enable defaults for each build setting.
        mode: dev ? 'development' : 'production',

        // Project entry points (chunks)
        entry: { 
            // Server entry path, intialisation is in index.ts of src.
            server: path.join( __dirname, '../src/index.ts' ) 
        }, 
        
        // Resolutions, extensions, aliases etc.
        resolve: {
            // Resolve all the extensions used in the project, mjs is a mongoosejs file.
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs']
        },

        // Bundled output config.
        output: { 
            // Set output path to the build dir relative to the current build setting (e.g development).
            path: path.resolve( __dirname + '/../../Build/' + ( dev ? 'Development/' : 'Production/' ) ),

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
                        loader: "awesome-typescript-loader?configFileName=./config/ts/tsconfig.json"
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
            ])
        ]
    }
} 
