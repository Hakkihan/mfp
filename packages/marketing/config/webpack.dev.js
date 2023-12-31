import {merge as webpackMerge}  from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {commonConfig} from './webpack.common.js';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js';
import PackageJson from '../package.json' assert { type: "json"};

const devConfig = {
    mode: 'development',
    output: {
        publicPath : 'http://localhost:8081/',
    },
    devServer: {
        port: 8081,
        // historyApiFallback: {
        //     index: 'index.html'
        // },
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp' : './src/bootstrap.js',
            },
            shared: PackageJson.dependencies
        }),
    ]

}

const merge = webpackMerge(commonConfig, devConfig);
export default merge;

