const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
    if ( !( 'development' in env || 'production' in env ) ) {
        env.production = true;
    }
    var config = {
        mode: env.development ? 'development' : 'production',
        entry: {
            client: path.join( __dirname, '../src/index.tsx' ) 
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        output: { 
            path: path.resolve( __dirname + '/../../Build/' + ( env.development ? 'Development/Public/' : 'Production/Public/' ) ),
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
                        { loader: "awesome-typescript-loader?configFileName=./config/ts/tsconfig" + ( env.development ? ".dev.json" : ".prod.json" ) },
                        { loader: require.resolve('react-docgen-typescript-loader') },
                    ]
                }, 
                { 
                    test: /\.css$/, 
                    use: ["style-loader", "css-loader"] 
                }, 
                { 
                    enforce: "pre", 
                    test: /\.(js|jsx)$/, 
                    loader: "source-map-loader" 
                }
            ] 
        },
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
        }
    }
    if ( env.development ) {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
        ]
        if ( env.analyze ) {
            config.plugins.push(new BundleAnalyzerPlugin())
        }
    } else if ( env.production ) {
        config.plugins = [
            // Nothing
        ]
    }
    return config
} 
