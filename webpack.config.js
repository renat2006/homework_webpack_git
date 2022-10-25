const path = require('path');
const lodash = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
    mode: 'production',
    target: 'web',

    entry: {
        about: {
            import: './src/pages/About.js',
            dependOn: 'shared',
        },
        home: {
            import: './src/pages/Home.js',
            dependOn: 'shared',
        },
        shared: 'lodash',


    },
    externals: {
        lodash: {
            about: 'lodash',
            home: 'lodash',
            root: '_',
        },
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000
    },
    devServer: {
        port: 9000,
        compress: true,
        hot: true,
        open: true,
        // static: {
        //     directory: path.join(__dirname, 'dist')
        // }

    },
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        innerGraph: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            minChunks: 2,
            chunks: 'all',
            minSize: 0,
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']


            },
            {

                test: /\.(png|ico)$/i,
                use: ['file-loader'],
                type: 'assets/resource'
            },
            {

                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },

        ],
    },
    // @TODO optimizations
    // @TODO lodash treeshaking
    // @TODO chunk for lodash
    // @TODO chunk for runtime
    // @TODO fallback for crypto
};

module.exports = config;
