/**
 * Created by scriptchao on 2017/11/3.
 */

import express from 'express'
import User from '../models/user' //collection
import {responseClient, md5, MD5_SUFFIX} from '../util'
const router = express.Router();

router.post('/register', (req, res) => {
    let {username, password} = req.body;

    User.findOne({username: username})// 用户名区分
        .then(data => {
            if (data) {
                responseClient(res, 200, 0, '用户名已存在!');
                return false
            }

            let user = new User({
                username: username,
                password: md5(password + MD5_SUFFIX),
                userType: 'user'
            });
            user.save()
                .then(() => {
                    responseClient(res, 200, 1, '注册成功!');
                    return true;
                })
        }).catch(err => {
        responseClient(res);
        return false;
    })
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    User.findOne({
        username: username,
        password: md5(password + MD5_SUFFIX)
    }).then(data => {
        if (data) {

            let userInfo = {};
            userInfo.username = data.username;
            userInfo.userType = data.userType;
            userInfo.userId = data._id;

            req.session.userInfo = userInfo;
            console.log(req.session.userInfo);
            console.log(req.session)

            responseClient(res, 200, 1, '登录成功!');
            return true
        }
        responseClient(res, 200, 0, '用户名或密码错误!');
    }).catch(err => {
        responseClient(res);
        return false;
    })
});

router.get('/userInfo', (req, res) => {
    console.log(req.session);
    if (req.session.userInfo) {
        responseClient(res, 200, 1, '用户已登录!', req.session.userInfo)

    } else {
        responseClient(res, 200, 0, '用户未登录!')
    }
});

export default router