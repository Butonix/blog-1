/**
 * Created by scriptchao on 2017/12/1.
 */

import express from 'express';
import Vote from '../models/vote';
import { responseClient, md5, MD5_SUFFIX } from '../util';
import { getVoteCount } from './util';

const router = express.Router();

router.post('/update', (req, res) => {
    const { userId, articleId, isVote } = req.body;
    Vote.findOne({ userId, articleId })
        .then((data) => {
            if (data) {
                return Vote.update({ userId, articleId }, { isVote }).then(data1 => data1.n && data1);

            }
            const vote = new Vote({
                userId,
                articleId,
                isVote: true
            });

            return vote.save().then(data2 => data2);

        })
        .then(data => getVoteCount(articleId))
        .then((data) => {
            responseClient(res, 200, 1, '操作成功!');
        })
        .catch((err) => {
            responseClient(res);
        });
});

router.post('/status', (req, res) => {
    const { userId, articleId } = req.body;
    Vote.findOne({ userId, articleId }, 'isVote -_id')
        .then((data) => {
            if (data) {
                responseClient(res, 200, 1, '获取用户是否点赞成功!', data);
            } else {
                responseClient(res, 200, 1, { isVote: false });
            }
        });
});


export default router;
