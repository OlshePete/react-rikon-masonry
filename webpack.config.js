const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
        // alias: {
        //     react: path.resolve('./node_modules/react')
        // }
    },
    externals: {
        react: 'react',
        DOMPurify: 'DOMPurify',
        // 'react-dom': 'ReactDOM',
    },
    module: {
        rules: [
            {
              test: /\.(scss|css)$/,
              use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
              exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
            // {
            //     test: /\.(js|jsx|ts|tsx)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env', '@babel/preset-react'],
            //         },
            //     },
            // }
        ],
    }
}