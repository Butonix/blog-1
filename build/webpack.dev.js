/**
 * Created by scriptchao on 2017/10/26.
 */

import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import OpenBrowserPlugin from 'open-browser-webpack-plugin'
import baseConfig from './webpack.base'
import config from '../config'

const rootPath = path.resolve(__dirname, '..');
const entryPath = path.join(rootPath, 'app');
const outputPath = path.join(rootPath, 'docs');

const devConfig = {
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            path.join(entryPath, 'index.js')
        ],
    },
    output: {
        filename: '[name].js',
        publicPath: '/', ///html src指向
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    'sass-loader',
                ]
            },
        ]
    },
    plugins: [
        new OpenBrowserPlugin({
            url: `http://${config.host}:${config.port}`
        }),
        new webpack.HotModuleReplacementPlugin(), //热更新
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(entryPath, 'index.html')
        }),
    ]
};

export default merge(baseConfig, devConfig)

