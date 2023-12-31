import {merge as webpackMerge}  from 'webpack-merge';

import {commonConfig} from './webpack.common.js';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin.js';
import packageJson from '../package.json' assert {type : 'json'};

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js` ,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies ,
        }),
    ],
}

const merge = webpackMerge(commonConfig, prodConfig);
export default merge;

