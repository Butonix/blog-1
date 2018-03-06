/**
 * Created by scriptchao on 2017/11/2.
 */
import { observable, action } from 'mobx';
import {message} from 'antd'
import xhr from '../xhr';

class UserStore {

    @observable userInfo;

    constructor() {
        this.registerUrl = '/user/register';
        this.loginUrl = '/user/login';
        this.userInfoUrl = '/user/userInfo';
        this.loginOutUrl = '/user/loginOut';
        this.userListUrl = '/user/list';
        this.userUpdateUrl = '/user/update';
        this.userDeleteUrl = '/user/delete';
    }

    @action postUserDelete(body) {

        return xhr({
            method: 'post',
            url: this.userDeleteUrl,
            body,
        }).then((response) => {
            if (response.result) {
                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postUserUpdate(body) {

        return xhr({
            method: 'post',
            url: this.userUpdateUrl,
            body,
        }).then((response) => {
            if (response.result) {
                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postUserList(body) {

        return xhr({
            method: 'post',
            url: this.userListUrl,
            body,
        }).then((response) => {
            if (response.result) {
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action getLoginOut() {
        return xhr({
            method: 'get',
            url: this.loginOutUrl,
        }).then((response) => {
            if (response.result) {
                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });


    }

    @action postRegister(body) {

        return xhr({
            method: 'post',
            url: this.registerUrl,
            body,
        }).then((response) => {
            if (response.result) {

                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postLogin(body) {

        return xhr({
            method: 'post',
            url: this.loginUrl,
            body,
        }).then((response) => {
            if (response.result) {
                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }


    @action getUserInfo() {

        return xhr({
            method: 'get',
            url: this.userInfoUrl,
        }).then((response) => {
            if (response.result) {
                this.userInfo = response.data;
                return Promise.resolve(response);
            }
            this.userInfo = {};
            console.info(response.message);
            return false;

        });
    }

}

export default new UserStore();
