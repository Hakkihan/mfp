import {merge as webpackMerge} from 'webpack-merge';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js';
import packageJson from '../package.json' assert { type: 'json'};
import { commonConfig } from './webpack.common.js';


const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/dashboard/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap.js'
            },
            shared: packageJson.dependencies
        }),
    ],
};

const merge = webpackMerge(commonConfig, prodConfig);
export default merge;