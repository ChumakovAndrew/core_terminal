const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/component/NewCore.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: "node",
};