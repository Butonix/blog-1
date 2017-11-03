/**
 * Created by scriptchao on 2017/11/2.
 */
import {observable, action} from 'mobx'
import xhr from './xhr'
import {Message} from '../components/zyc'

class UserStore {

    @observable userInfo = {};
    @observable loginShow;

    constructor() {
        this.registerUrl = '/user/register';
        this.loginUrl = '/user/login';
        this.userInfoUrl = '/user/userInfo';
    }

    @action postRegister(body) {

        return xhr({
            method: 'post',
            url: this.registerUrl,
            body: body
        }).then(data => {
            if (data.result) {
                Message.success(data.message);
                return Promise.resolve(data)
            } else {
                Message.error(data.message);
            }
        })
    }

    @action postLogin(body) {

        return xhr({
            method: 'post',
            url: this.loginUrl,
            body: body
        }).then(data => {
            if (data.result) {
                this.loginShow = false;
                Message.success(data.message);
                return Promise.resolve(data)
            } else {
                Message.error(data.message);
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
                return Promise.resolve(data);
            } else {
                console.log(data.message);
            }
        })
    }

}

export default new UserStore