/**
 * Created by scriptchao on 2017/11/3.
 */

import express from 'express'
import User from '../models/user'
import Id from '../models/id'
import {responseClient, MD5_SUFFIX} from '../util'
const router = express.Router();

router.post('/register', (req, res) => {
    let {username, password} = req.body;

    User.findOne({username})// 用户名区分 //collection
        .then(data => {
            if (data) {
                responseClient(res, 200, 0, '用户名已存在!');
            } else {
                return Id.findOneAndUpdate({_id: 'userId'}, {
                    $inc: {
                        seq: 1
                    }
                }).then(data => {
                    let user = new User({
                        username: username,
                        password: password,
                        userType: 3,
                        userId: data.seq
                    });

                    return user.save().then(() => {
                        responseClient(res, 200, 1, '注册成功!');
                    })
                })
            }
        }).catch(err => {
        responseClient(res);
    })
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    User.findOne({
        username,
        password,
    }).then(data => {
        if (data) {
            if (data.isUsed) {
                let userInfo = {};
                userInfo.username = data.username;
                userInfo.userType = data.userType;
                userInfo.userId = data.userId;

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
            return User.find({}, 'userId username userType password isUsed', {
                skip: skip,
                limit: size,
                sort: {
                    userType : 1
                }
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
    let {userId, isUsed, userType} = req.body;
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

    if (userType) {
        searchContent.userType = userType;
        successMessage = '修改成功!';
        failMessage = '修改失败!'
    }

    User.update({userId}, searchContent)
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
    let {userId} = req.body;

    User.remove({userId}).then(data => {
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