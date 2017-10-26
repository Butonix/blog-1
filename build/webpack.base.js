/**
 * Created by scriptchao on 2017/10/26.
 */

import path from 'path'
import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

const baseConfig = {
    entry: {
        vendor: [
            'mobx',
            'mobx-react',
            'react',
            'react-dom',
            'react-router-dom',
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10240&name=img/[name].[hash:6].[ext]']
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
    ]
};

export default baseConfig
