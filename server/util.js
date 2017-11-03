/**
 * Created by scriptchao on 2017/11/3.
 */
import crypto from 'crypto'

const MD5_SUFFIX = 'FKHSEKFJLSDIJFLKJSDLKFJ;LDFJ;LSJDLAFJ';
const md5 = function (pwd) {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex')
};

const responseClient = function (res, httpCode = 500, result = 0, message = '服务端异常', data = {}) {
    let responseData = {};
    responseData.data = data;
    responseData.message = message;
    responseData.result = result;
    res.status(httpCode).json(responseData)
};

export {
    MD5_SUFFIX,
    md5,
    responseClient,
}