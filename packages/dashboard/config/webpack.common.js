import {VueLoaderPlugin} from 'vue-loader';

export const commonConfig = {
    // entry: './src/index.js',
    // output: './dist/main.js',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',

    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module:{
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i ,
                use: [
                    {loader: 'file-loader'}
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'], //todo
                    },
                },
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
    
};