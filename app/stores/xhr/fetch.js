/**
 * Created by scriptchao on 2017/11/2.
 */
import {origin} from './config'

const xhr = (req = {}) => {

    let {method, url, body = {}} = req;

    let options = {};

    let search = Object.entries(body).map((value, index) => `${value[0]}=${value[1]}`).join('&');

    if (method === 'get' || method === 'GET') {
        url = `${url}?${search}`
    }

    if (method === 'post' || method === 'POST') {
        options.body = search
    }

    options.headers = {
        'Content-Type': "application/x-www-form-urlencoded",
    };
    options.method = method;
    options.mode = 'cors';

    return fetch(origin + url, options)
        .then(res => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({
                    message: res.status,
                    status: res.status
                })
            }
        })
        .catch(e => {
            console.log('error', e, e.status);
            if (!e.status) {
                e.message = '网络连接失败!'
            }
            return Promise.reject(e)
        });
};

export default xhr