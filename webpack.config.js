const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const webpack = require('webpack');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode
        ? require('./webpack.prod.config')
        : require('./webpack.dev.config');

    const envPlugins = isProductionMode
        ? [
              new webpack.DefinePlugin({
                  'process.env.DEMO_MODE': JSON.stringify('true'),
                  'process.env.API_URL': JSON.stringify('https://newsapi.org/v2/'),
                  'process.env.API_KEY': JSON.stringify(''),
              }),
          ]
        : [
              new DotenvWebpackPlugin(),
              new webpack.DefinePlugin({
                  'process.env.DEMO_MODE': JSON.stringify('false'),
              }),
          ];

    return merge(baseConfig, envConfig, {
        plugins: envPlugins,
    });
};
