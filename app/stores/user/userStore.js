/**
 * Created by scriptchao on 2017/11/2.
 */
import {observable, action} from 'mobx'
import xhr from '../xhr'
import {Message} from '../../components/zyc'

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
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

    @action postLogin(body) {

        return xhr({
            method: 'post',
            url: this.loginUrl,
            body: body
        }).then(response => {
            if (response.result) {
                this.loginShow = false;
                Message.success(response.message);
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }


    @action getUserInfo() {

        return xhr({
            method: 'get',
            url: this.userInfoUrl,
        }).then(response => {
            if (response.result) {
                this.userInfo = response.data;
                return Promise.resolve(response);
            } else {
                console.log(response.message);
            }
        })
    }

}

export default new UserStore