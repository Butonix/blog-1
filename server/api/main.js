/**
 * Created by scriptchao on 2017/11/3.
 */

import express from 'express'
import user from './user'
import article from './article'
import tag from './tag'
import vote from './vote'

const router = express.Router();

router.use('/user', user);
router.use('/article', article);
router.use('/tag', tag);
router.use('/vote', vote);


export default router