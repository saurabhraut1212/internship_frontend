const path = require('path');

module.exports = {
    entry: './src/index.js', // adjust to your entry point
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!chart.js)/, // Allow processing of chart.js
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
