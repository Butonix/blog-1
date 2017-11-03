/**
 * Created by scriptchao on 2017/10/26.
 */
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import blueBird from 'bluebird'
import {main} from '../server'
import config from '../config'

const app = express();

app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({extended: false})); //application/x-www-form-urlencoded
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret: 'express_react_cookie',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000 * 30}//过期时间
}));

app.all('*', function (req, res, next) { //跨域

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use('/', main);//展示页面路由
// app.use('/admin', admin); //管理页面路由

mongoose.Promise = blueBird;

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, {useMongoClient: true}, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(config.apiPort, config.apiHost, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at http://${config.apiHost}:${config.apiPort}`)
        }
    });
});


