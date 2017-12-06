/**
 * Created by scriptchao on 2017/10/26.
 */

import path from 'path'
import webpack from 'webpack'
import express from 'express'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import compression from 'compression'
import webpackConfig from './webpack.prod'
import config from '../config'

const app = express();

webpack(webpackConfig, (err, stats) =>
    console.log('the static files have been generated,please open browser for watch')
);

app.use(compression()); //gzip

app.use('/', connectHistoryApiFallback());

app.use('/', express.static(path.join(__dirname, '..', 'docs')));



app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`);
    }

});