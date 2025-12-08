module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
