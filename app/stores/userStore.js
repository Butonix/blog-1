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

    @action getRegister(body) {

        return xhr({
            method: 'get',
            url: this.registerUrl,
            body: body
        }).then(data => {
            if (data.result) {
                this.loginShow = false;
                Promise.resolve(data)
            } else {
                Promise.reject(data)
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