const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const extractHtml = new HtmlWebpackPlugin({
    title: 'Hue',
    template: path.resolve(__dirname, './public/index.html')
});

const extractSass = new ExtractTextPlugin({ // define where to save the file
    filename: './assets/css/style.[hash].css',
    allChunks: true,
});

module.exports = {
    entry: ['./app/App.js', './app/style/index.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/main.[hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules/")
                ],
                include: [
                    path.resolve(__dirname, "app")
                ],
                loader: "babel-loader",
                options: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
                exclude: [
                    path.resolve(__dirname, "node_modules/")
                ],
                include: [
                    path.resolve(__dirname, "app/style")
                ]
            }
        ]
    },
    plugins: [extractHtml, extractSass, new CleanWebpackPlugin(['dist'])]
};