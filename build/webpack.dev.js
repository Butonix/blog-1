/**
 * Created by scriptchao on 2017/10/26.
 */

import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import baseConfig from './webpack.base'

const rootPath = path.resolve(__dirname,'..');
const entryPath = path.join(rootPath,'app');
const outputPath = path.join(rootPath,'docs');

const devConfig = {
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true',
            path.join(entryPath,'index.js')
        ],
    },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

        ]
    }
};

