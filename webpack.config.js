const path = require('path');

module.exports = {
    entry: {
        'main-process': './app/main-process.js',
        'render-process': './app/render-process.js',
    },
    output: {
        filename: '[name].js',
        path: './dist',
    },
    target: 'electron',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'app'),
                ],
                exclude: [
                    /node_modules/,
                ],
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    node: {
        __dirname: false,
    },
};
