/**
 * Created by scriptchao on 2017/10/26.
 */
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import blueBird from 'bluebird'
import config from '../config'
import {main} from '../server'
const app = express();

app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret: 'express_react_cookie',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000 * 120}//过期时间
}));
app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({extended: false})); //application/x-www-form-urlencoded


app.all('*', function (req, res, next) { //跨域

    // if (
    //     req.headers.origin == 'http://127.0.0.1:8080' ||
    //     req.headers.origin == 'http://localhost:8080' ||
    //     req.headers.origin == 'http://101.132.163.117' ||
    //     req.headers.origin == 'http://www.scriptchao.com' ||
    //     req.headers.origin == 'http://www.scriptchao.xyz'
    // ) {
    //     res.header('Access-Control-Allow-Origin', req.headers.origin); //支持的跨域请求地址
    //     res.header('Access-Control-Allow-Credentials', true); //是否允许浏览器发送cookies
    //     res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Language, Content-Type, Expires, Last-Modified,Pragma');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length, Authorization, Accept, X-Requested-With');
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // } else {
    //     next();
    // }

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use('/', main);//展示页面路由


mongoose.Promise = blueBird;

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, {useMongoClient: true}, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(config.apiPort, function (err) { // 7070端口
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at port:${config.apiPort}`)
        }
    });
});


