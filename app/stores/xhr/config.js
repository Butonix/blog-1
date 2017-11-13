/**
 * Created by scriptchao on 2017/11/2.
 */

import config from '../../../config'

const origin = `http://${config.apiHost}:${config.apiPort}`;

const expiredTime = 1000 * 60 * 30;

export {
    origin,
    expiredTime
}