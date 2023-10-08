import {merge as webpackMerge}  from 'webpack-merge';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import {commonConfig} from './webpack.common.js';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js';
// import { Module } from 'webpack';
import PackageJson from '../package.json' assert { type: "json"};

const devConfig = {
    mode: 'development',
    output: {
        publicPath : 'http://localhost:8080/',
    },
    devServer: {
        port: 8080,
        // historyApiFallback: {
        //     index: 'index.html'      
        // },
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing : 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js'
            },
            shared: PackageJson.dependencies,
        }),
        
    ],

}

const merge = webpackMerge(commonConfig, devConfig);
export default merge;

