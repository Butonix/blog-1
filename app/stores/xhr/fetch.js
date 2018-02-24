/**
 * Created by scriptchao on 2017/11/2.
 */
import {message} from 'antd'
import { origin, expiredTime } from './config';

const xhr = (req = {}) => {
    const { method, url, body = {} } = req;

    const options = {};

    const search = Object.entries(body).map(value => `${value[0]}=${value[1]}`).join('&');

    let xUrl = url;

    if (method === 'get' || method === 'GET') {
        if (search) {
            xUrl = `${url}?${search}`;
        }
    }

    if (method === 'post' || method === 'POST') {
        options.body = JSON.stringify(body);
        // options.body = search;
    }

    options.headers = {
        // 'Content-Type': 'application/x-www-form-urlencoded', // body 为a&b
        'Content-Type': 'application/json', // body 为JSON.Stringify({}) // 文件上传和 formData 不需要 content-type // 必须用这个 传什么解析出来的就是什么
    };
    options.method = method;
    // options.mode = 'cors';
    options.credentials = 'include'; // 必须

    const { localStorage, location } = window;

    if (localStorage.getItem('expired')) { // 登录超时验证

        const now = +new Date();

        if (now - localStorage.getItem('expired') > expiredTime) {
            localStorage.clear();
            location.reload();
        }
    }


    return fetch(origin + xUrl, options)
        .then((res) => {
            console.log(res);
            if (res.ok) { // 200-299 ok的条件

                return res.json();
            }

            return Promise.reject(new Error({ // 这步是没有必要的 自己控制status为200
                message: res.status,
                status: res.status,
            }));

        }).catch((e) => {
            console.log('error', e, e.status);
            if (!e.status) {
                e.message = '网络连接失败!';
            }

            message.error(e.message);
        });
};

export default xhr;
