const path = require('path');

module.exports = {
    mode: 'development', // оставить?
    devtool: 'inline-source-map', // источник?
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    devtool: 'eval-source-map',
};
