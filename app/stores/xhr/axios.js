/**
 * Created by scriptchao on 2017/11/2.
 */
import axios from 'axios'
import NProgress from 'nprogress'
import '../../styles/nprogress.sass'
import { origin, expiredTime } from './config';
import { Message } from '../../components/zyc';

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

    Message.success(res.statusText);
    Message.success(res.status);
    if (res.statusText === 'OK') {
        return res.data;
    }


    Message.error(res.status);
    return false
});

const xhr = (req = {}) => {
    const { method, url, body = {} } = req;

    if (method === 'get' || method === 'GET') {
        config.params = body

    }

    if (method === 'post' || method === 'POST') {
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
