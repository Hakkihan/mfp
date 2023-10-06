export const commonConfig = {
    // entry: './src/index.js',
    // output: './dist/main.js',
    module:{
        rules: [
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'], //todo
                    },
                },
            },
        ],
    }
    
};