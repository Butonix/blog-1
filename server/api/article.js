/**
 * Created by scriptchao on 2017/11/13.
 */

import express from 'express'
import Article from '../models/article'
import Id from '../models/id'
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

    Article.findOne({title})
        .then(data => {
            if (data) {
                responseClient(res, 200, 0, '文章已存在,请更换标题!')
            } else {
                return Id.findOneAndUpdate({_id: 'articleId'}, {
                    $inc: {
                        seq: 1
                    }
                }).then(data => {

                    if (data) {
                        let article = new Article({
                            title,
                            content,
                            author,
                            tags: tags.split(','),
                            isPublish,
                            articleId: data.seq
                        });

                        return article.save().then(data => {
                            responseClient(res, 200, 1, '文章保存成功!', data);
                        })
                    }
                });
            }
        }).catch(err => {
        responseClient(res)
    })
});

router.post('/list', function (req, res) {
    let {
        page,
        size,
        isPublish,
        tags,
        author,
        sort
    } = req.body;
    page = parseInt(page);
    size = parseInt(size);
    let searchContent = {};
    let searchSort = {
        createTime: -1
    };

    if (sort) {
        if (sort == 'createTime,1') {
            searchSort = {
                createTime: 1
            }
        }
        if (sort == 'createTime,-1') {
            searchSort = {
                createTime: -1
            }
        }
        if (sort == 'updateTime,1') {
            searchSort = {
                updateTime: 1
            }
        }
        if (sort == 'updateTime,-1') {
            searchSort = {
                updateTime: -1
            }
        }
    }

    if (tags) {
        searchContent.tags = {$all: tags.split(',')}
    }

    if (isPublish) {
        searchContent.isPublish = isPublish
    }

    if (author) {
        if (req.session.userInfo.userType !== 1) {
            searchContent.author = req.session.userInfo.username
        }
    }

    let skip = (page - 1) * size;
    let responseData = {
        total: 0,
        list: []
    };

    Article.count(searchContent)
        .then(count => {
            responseData.total = count;
            return Article.find(searchContent, 'articleId title isPublish author tags readCount createTime updateTime -_id', {
                skip: skip,
                limit: size,
                sort: searchSort
            }).then(data => {
                responseData.list = data;
                responseClient(res, 200, 1, '获取文章列表成功!', responseData)
            })
        }).catch(err => {
        responseClient(res)
    })
});

router.post('/delete', function (req, res) {
    let {articleId} = req.body;
    Article.remove({articleId}).then(data => {
        if (data.result.n) {
            responseClient(res, 200, 1, '文章删除成功!');
        } else {
            responseClient(res, 200, 0, '文章删除失败!')
        }
    }).catch(err => {
        responseClient(res)
    })
});

router.post('/detail', function (req, res) {
    let {articleId} = req.body;

    Article.findOne({articleId}, 'articleId title content tags author readCount voteCount updateTime createTime').then(data => {
        if (data) {
            responseClient(res, 200, 1, '文章查找成功!', data)
        } else {
            responseClient(res, 200, 0, '未找到该文章!')
        }
    }).catch(err => {
        responseClient(res)
    })
});

router.post('/detail/title', function (req, res) {
    let {articleId, prev, next} = req.body;

    if (prev) {
        Article.findOne({articleId: {$lt: articleId}}, 'articleId title', {
            sort: {
                articleId: -1
            }
        }).then(data => {
            if (data) {
                responseClient(res, 200, 1, '文章查找成功!', data)
            } else {
                responseClient(res, 200, 1, '未找到该文章!')
            }

        })
    }

    if (next) {
        Article.findOne({articleId: {$gt: articleId}}, 'articleId title', {
            sort: {
                articleId: 1
            }
        }).then(data => {
            if (data) {
                responseClient(res, 200, 1, '文章查找成功!', data)
            } else {
                responseClient(res, 200, 1, '未找到该文章!')
            }

        })
    }
});

router.post('/update', function (req, res) {
    let {articleId, title, content, tags, isPublish} = req.body;
    let successMessage = '文章更新成功!';
    let failMessage = '文章更新失败!';
    let searchContent = {};
    if (title) {
        searchContent.title = title;
    }
    if (content) {
        searchContent.content = content
    }
    if (tags) {
        searchContent.tags = tags.split(',')
    }
    if (isPublish) {

        searchContent.isPublish = isPublish;
        if (isPublish === 'true') {
            successMessage = '文章发布成功!';
            failMessage = '文章发布失败!'
        } else {
            successMessage = '文章撤回成功!';
            failMessage = '文章撤回失败!'
        }
    }


    Article.update({articleId}, searchContent)
        .then(data => {
            if (data.n) {
                responseClient(res, 200, 1, successMessage, data);

            } else {
                responseClient(res, 200, 0, failMessage)
            }

        }).catch(err => {
        responseClient(res)
    })
});

router.post('/update/readCount', function (req, res) {
    let {articleId} = req.body;

    Article.update({articleId}, {
        $inc: {
            readCount: 1
        }
    }).then(data => {
        if (data.n) {
            responseClient(res, 200, 1, '阅读量更新成功!')
        } else {
            responseClient(res, 200, 0, '阅读量更新失败!')
        }
    })
});

export default router
