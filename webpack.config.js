const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    devtool: "source-map",
    context: path.resolve(__dirname, 'Phonebook'),
    entry: {
        default: './wwwroot/javascripts/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'Phonebook', 'wwwroot', 'build'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [ '.js' ],
        modules: [ 'node_modules', path.resolve(__dirname, 'Phonebook', 'wwwroot', 'javascripts') ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(([^\/]+?\/){1,2}(src|es6|dist\-web)))/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env"],
                            ["@babel/preset-react"]
                        ],
                        plugins: [ "@babel/plugin-proposal-class-properties" ]
                    }
                }],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
