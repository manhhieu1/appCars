var webpack = require('webpack'),
    path = require('path');


var CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),

const sourcePath = path.resolve(__dirname, './src');
const staticPath = path.resolve(__dirname, './static');

module.exports = function (env) {

    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [
                    require('autoprefixer')
                ];
            }
        }
    }

    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: nodeEnv,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
    ];

    if(isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false,
                },
            })
        );
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    return {
        devtool: isProd? 'source-map' : 'eval',
        context: sourcePath,

        entry: {
            app: './app/entry.ts',
            vendor: './app/vendor.ts'
        },

        output: {
            path: staticPath,
            filename: '[name].bundle.js',
        },

        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        query: {
                            name: '[name].[ext]'
                        },
                    },
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        'ts-loader'
                    ],
                },
            ],
        },

        resolve: {
            alias: {
                Public: path.resolve(__dirname,'src/public'),
                Style: path.resolve(__dirname,'src/styles')
            },
            extensions: ['.ts','.js', '.html'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath
            ]
        },

        plugins,

        performance: isProd && {
            maxAssetSize: 100,
            maxEntrypointSize: 300,
            hints: 'warning'
        },

        stats: {
          errorDetails: false,
            colors: {
                green: '\u001b[32m'
            }
        },

        devServer: {
            contentBase: './src',
            historyApiFallback: true,
            port: 3000,
            compress: isProd,
            inline: !isProd,
            hot: !isProd,
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: false,
                errorDetails: false,
                color: {
                    green: '\u001b[32m'
                }
            },
        }
    };
};