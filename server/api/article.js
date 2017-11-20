/**
 * Created by scriptchao on 2017/11/13.
 */

import express from 'express'
import Article from '../models/article'
import {responseClient, md5, MD5_SUFFIX} from '../util'
const router = express.Router();

router.post('/add', function (req, res) {
    let {
        title,
        content,
        tags,
        isPublish
    } = req.body;

    let author = req.session.userInfo.username;
    let readCount = 0;

    Article.findOne({title}).then(data => {
        if (data) {
            responseClient(res, 200, 0, '文章已存在,请更换标题!')
        } else {
            let article = new Article({
                title,
                content,
                readCount,
                author,
                tags,
                isPublish,
            });

            article.save().then(data => {
                responseClient(res, 200, 1, '文章保存成功!', data)
            }).catch(err => {
                responseClient(res)
            })
        }
    })
});

export default router
