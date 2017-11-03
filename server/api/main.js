/**
 * Created by scriptchao on 2017/11/3.
 */

import express from 'express'
import user from './user'

const router = express.Router();

router.use('/user',user);

export default router