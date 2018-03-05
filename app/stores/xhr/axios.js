/**
 * Created by scriptchao on 2017/11/2.
 */
import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import '../../styles/nprogress.sass'
import {origin, expiredTime} from './config';

const config = {
    baseURL: origin,
    headers: {
        'Content-Type': 'application/json',
    },
};

axios.interceptors.request.use((requestConfig) => {
    NProgress.start();

    const { localStorage, location } = window;

    if (localStorage.getItem('expired')) { // 登录超时验证

        const now = +new Date();

        if (now - localStorage.getItem('expired') > expiredTime) {
            localStorage.clear();
            location.reload();
            return false
        }
    }
    // console.log(requestConfig);

    return requestConfig
});

axios.interceptors.response.use((res) => {
    NProgress.done();

    return res.data;
});

const xhr = (req = {}) => {
    const { method, url, body = {} } = req;

    if (method === 'get' || method === 'GET') {
        config.body = {};
        config.params = body

    }

    if (method === 'post' || method === 'POST') {
        config.params = {};
        config.data = body
    }

    config.url = url;
    config.method = method;
    config.withCredentials = true;

    return axios(config)
        .catch((e) => {
            console.log(e)
        })
};

export default xhr;
