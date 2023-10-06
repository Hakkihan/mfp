import {merge as webpackMerge}  from 'webpack-merge';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import {commonConfig} from './webpack.common.js';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js';
// import { Module } from 'webpack';
import PackageJson from '../package.json' assert { type: "json"};

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing : 'marketing@http://localhost:8081/remoteEntry.js',
            },
            shared: PackageJson.dependencies,
        }),
        
    ],

}

const merge = webpackMerge(commonConfig, devConfig);
export default merge;

