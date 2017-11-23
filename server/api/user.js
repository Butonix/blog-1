/**
 * Created by scriptchao on 2017/11/3.
 */

import express from 'express'
import User from '../models/user'
import {responseClient, md5, MD5_SUFFIX} from '../util'
const router = express.Router();

router.post('/register', (req, res) => {
    let {username, password} = req.body;

    User.findOne({username: username})// 用户名区分 //collection
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
            if (data.isUsed) {
                let userInfo = {};
                userInfo.username = data.username;
                userInfo.userType = data.userType;
                userInfo.userId = data._id;

                req.session.userInfo = userInfo;

                responseClient(res, 200, 1, '登录成功!');
            } else {
                responseClient(res, 200, 0, '该账户已禁用,请联系管理员!')
            }
        } else {
            responseClient(res, 200, 0, '用户名或密码错误!');
        }

    }).catch(err => {
        responseClient(res);
    })
});

router.get('/userInfo', (req, res) => {
    if (req.session.userInfo) {
        responseClient(res, 200, 1, '用户已登录!', req.session.userInfo)

    } else {
        responseClient(res, 200, 0, '用户未登录!')
    }
});

router.get('/loginOut', (req, res) => {
    req.session.userInfo = undefined;
    responseClient(res, 200, 1, '登出成功!')

});

router.post('/list', (req, res) => {
    let {page, size} = req.body;
    page = parseInt(page);
    size = parseInt(size);
    let responseData = {
        total: 0,
        list: []
    };

    let skip = (page - 1) * size;

    User.count()
        .then(count => {
            responseData.total = count;
            User.find({}, '_id username userType password isUsed', {
                skip: skip,
                limit: size
            }).then(data => {
                if (data) {
                    responseData.list = data;
                    responseClient(res, 200, 1, '获取用户列表成功!', responseData)
                } else {
                    responseClient(res, 200, 0, '获取用户列表失败!')
                }
            })
        }).catch(err => {
        responseClient(res)
    })
});

router.post('/update', (req, res) => {
    let {id, isUsed} = req.body;
    let successMessage;
    let failMessage;
    let searchContent = {};

    if (isUsed) {
        searchContent.isUsed = isUsed;
        if (isUsed === 'true') {
            successMessage = '启用成功!';
            failMessage = '启用失败!'
        } else {
            successMessage = '禁用成功!';
            failMessage = '禁用失败!'
        }
    }
    User.update({_id: id}, searchContent)
        .then(data => {
            if (data.n) {
                responseClient(res, 200, 1, successMessage)
            } else {
                responseClient(res, 200, 0, failMessage)
            }
        }).catch(err => {
        responseClient(res)
    })
});

router.post('/delete', (req, res) => {
    let {id} = req.body;

    User.remove({_id: id}).then(data => {
        if (data.result.n) {
            responseClient(res, 200, 1, '删除成功!')
        } else {
            responseClient(res, 200, 0, '删除失败!')
        }
    }).catch(err => {
        responseClient(res)
    })
});

export default router