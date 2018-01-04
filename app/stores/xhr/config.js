/**
 * Created by scriptchao on 2017/11/2.
 */

import config from '../../../config';

const origin = `http://${config.host}:${config.port}/blog`;

const expiredTime = 1000 * 60 * 125;

export {
    origin,
    expiredTime,
}