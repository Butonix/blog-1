/**
 * Created by scriptchao on 2017/10/26.
 */
import path from 'path'
import webpack from 'webpack'
import express from 'express'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../config'
import webpackConfig from './webpack.dev'

const app = express();
const compiler = webpack(webpackConfig);

app.use('/', connectHistoryApiFallback()); // 访问任何地址时指向根目录

app.use('/static', express.static(path.join(__dirname, '..', 'static'))); // 静态资源目录

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',// 虚拟目录
}));

app.use(webpackHotMiddleware(compiler));

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`);
    }

});