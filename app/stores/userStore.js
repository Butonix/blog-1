/**
 * Created by scriptchao on 2017/11/2.
 */
import {observable, action} from 'mobx'
import xhr from './xhr'

class UserStore {

    @observable userInfo = {};
    @observable loginShow;

    constructor() {
        this.registerUrl = '/user/register';
        this.userInfoUrl = '/user/userInfo';
    }

    @action postRegister(body) {

        return xhr({
            method: 'post',
            url: this.registerUrl,
            body: body
        }).then(data => {
            if (data.result) {
                return Promise.resolve(data)
            } else {
                return Promise.reject(data)
            }
        })
    }

    @action getUserInfo() {

        return xhr({
            method: 'get',
            url: this.userInfoUrl,
        }).then(data => {
            if (data.result) {
                this.userInfo = data;
                Promise.resolve(data);
            } else {
                Promise.reject(data)
            }
        })
    }

}

export default new UserStore