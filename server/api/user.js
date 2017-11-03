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
                type: 'user'
            });
            user.save()
                .then(() => {
                    responseClient(res, 200, 1, '注册成功!')
                })
        }).catch(err => {
        responseClient(res);
        return false;
    })
});

export default router