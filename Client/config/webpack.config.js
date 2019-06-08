const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
require('dotenv').config({ path: '../.env' });

module.exports = () => {
    const dev = true;//process.env.MODE == 'development' || process.env.MODE == 'dev' ? true : false;
    const build = {
        out: path.resolve( __dirname + '/../../Build/' + ( dev ? 'Development/Public/' : 'Production/Public/' ) ),
        public: path.resolve( __dirname + '/../../Build/' + ( dev ? 'Development/Public/' : 'Production/Public/' ) )
    }

    var config = {
        mode: dev ? 'development' : 'production',
        entry: {
            client: path.join( __dirname, '../src/index.tsx' ) 
        },
        devtool: 'source-map',
        devServer: {
            contentBase: build.public,
            hot: true,
            historyApiFallback: true,
            port: 8081
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        output: { 
            path: build.out,
            publicPath: '/',
            filename: '[name].bundled.js',
            chunkFilename: '[name].chunk.js',
            sourceMapFilename: '[name].js.map'
        }, 
        module: { 
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/, 
                    use: [
                        { loader: "awesome-typescript-loader?configFileName=./config/ts/tsconfig" + ( dev ? ".dev.json" : ".prod.json" ) },
                        { loader: require.resolve('react-docgen-typescript-loader') },
                    ]
                }, 
                { 
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ["style-loader", "css-loader"] 
                }, 
                { 
                    enforce: "pre", 
                    test: /\.(js|jsx)$/, 
                    loader: "source-map-loader" 
                }
            ] 
        },/*
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        }
                    }
                }
            }
        }*/
    }
    if ( dev ) {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'Ambar Technology',
                filename: build.public + '\\index.html',
                template: 'src/index.html'
            })
            //new BundleAnalyzerPlugin()
        ]
    } else {
        config.plugins = [
            // Nothing
        ]
    }
    return config
} 
