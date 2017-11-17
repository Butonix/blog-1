/**
 * Created by scriptchao on 2017/11/17.
 */

import express from 'express'
import Tag from '../models/tag'
import {responseClient, md5, MD5_SUFFIX} from '../util'

const router = express.Router();

router.post('/add', function (req, res) {
    let {name} = req.body;

    Tag.findOne({name}).then(data => {
        if (!data) {
            let tag = new Tag({name});

            tag.save().then(data => {
                responseClient(res, 200, 1, '标签添加成功!', data)

            })
        } else {
            responseClient(res, 200, 0, '该标签已存在!')
        }
    }).catch(err => {
        responseClient(res)
    })
});

router.get('/list', function (req, res) {

    Tag.find({}, 'name').then(data => {
        responseClient(res, 200, 1, '获取标签成功!', data)
    }).catch(err => {
        responseClient(res)
    })
});


export default router
