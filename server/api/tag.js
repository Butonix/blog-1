/**
 * Created by scriptchao on 2017/11/17.
 */

import express from 'express';
import Tag from '../models/tag';
import Id from '../models/id';
import {getCount} from './util';
import {responseClient, md5, MD5_SUFFIX} from '../util';

const router = express.Router();

router.post('/add', (req, res) => {
    const { name } = req.body;

    Tag.findOne({ name })
        .then((data) => {

            if (data) {
                responseClient(res, 200, 0, '该标签已存在!');
                return false;
            }

            return Id.findOneAndUpdate({ _id: 'tagId' }, {
                $inc: {
                    seq: 1,
                },
            })
                .then((data1) => {

                    if (!data1) {
                        return false;
                    }

                    const tag = new Tag({
                        name,
                        tagId: data1.seq,
                    });

                    return tag.save()
                        .then((data2) => {
                            responseClient(res, 200, 1, '标签添加成功!', data2);
                        });

                });
        })
        .catch((err) => {
            responseClient(res);
        });
});

router.post('/delete', (req, res) => {
    const { name } = req.body;
    Tag.remove({ name })
        .then((data) => {
            if (data.result.n) {
                responseClient(res, 200, 1, '标签删除成功!', data);
            } else {
                responseClient(res, 200, 0, '标签不存在!', data);
            }
        })
        .catch((err) => {
            responseClient(res);
        });
});

router.get('/list', (req, res) => {

    getCount()
        .then((data) => {
            const responseData = {
                total: 0,
                list: [],
            };

            return Tag.count({})
                .then((count) => {
                    responseData.total = count;
                    return Tag.find({}, 'name tagId count -_id')
                        .then((data1) => {
                            if (data1) {
                                responseData.list = data1;
                                responseClient(res, 200, 1, '获取标签成功!', responseData);
                            } else {
                                responseClient(res, 200, 0, '获取标签失败!');
                            }
                        });
                });
        })
        .catch((err) => {
            responseClient(res);
        });
});

export default router;
