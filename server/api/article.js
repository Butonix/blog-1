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
                tags: tags.split(','),
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

router.post('/list', function (req, res) {
    let {
        tags,
        isPublish,
        page,
        size
    } = req.body;
    page = parseInt(page);
    size = parseInt(size);
    let searchContent = {};

    if (tags) {
        searchContent.tags = tags.split(',')
    }

    if (isPublish) {
        searchContent.isPublish = isPublish
    }

    let skip = (page - 1) * size;
    let responseData = {
        total: 0,
        list: []
    };

    Article.count(searchContent)
        .then(count => {
            responseData.total = count;
            Article.find(searchContent, '_id title isPublish author readCount createTime', {
                skip: skip,
                limit: size
            }).then(data => {
                responseData.list = data;
                responseClient(res, 200, 1, '获取文章列表成功!', responseData)
            }).catch(err => {
                throw err
            })

        }).catch(err => {
        responseClient(res)
    })
});

router.post('/delete', function (req, res) {
    let {id} = req.body;
    Article.remove({_id: id}).then(data => {
        if (data.result.n) {
            responseClient(res, 200, 1, '文章删除成功!')
        } else {
            responseClient(res, 200, 0, '文章删除失败!')
        }
    }).catch(err => {
        responseClient(res)
    })
});

router.post('/edit', function (req, res) {
    let {id} = req.body;

    Article.findOne({_id: id}, '_id title content tags').then(data => {
        if (data) {
            responseClient(res, 200, 1, '文章查找成功!', data)
        } else {
            responseClient(res, 200, 0, '未找到该文章!')
        }
    }).catch(err => {
        responseClient(res)
    })
});

router.post('/update', function (req, res) {
    let {id, title, content, tags} = req.body;

    Article.update({_id: id}, {title, content, tags: tags.split(',')})
        .then(data => {
            if (data.n) {
                responseClient(res, 200, 1, '文章更新成功!', data)
            } else {
                responseClient(res, 200, 0, '文章更新失败!')
            }

        }).catch(err => {
        responseClient(res)
    })
});

export default router
