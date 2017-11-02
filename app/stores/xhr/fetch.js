/**
 * Created by scriptchao on 2017/11/2.
 */
import {origin} from './config'

const xhr = (req = {}) => {

    let {method, url, body = {}} = req;

    let options = {};

    let search = Object.entries(body).map((value, index) => `${value[0]}=${value[1]}`).join('&');

    (method === 'get' || method === 'GET') && (url = `${url}?${search}`)

    (method === 'post' || method === 'POST') && (options.body = search);

    options.headers = {};
    options.method = method;
    options.mode = 'cors';

    return fetch(origin + url, options)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(JSON.stringify(res.body));
            }
        })
        .catch(e => {
            console.log('error', e, e.status)
        });
};

export default xhr