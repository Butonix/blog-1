/**
 * Created by scriptchao on 2017/11/2.
 */
import {observable, action} from 'mobx'
import xhr from '../xhr'
import {Message} from '../../components/zyc'

class UserStore {

    @observable userInfo;
    @observable loginShow;
    @observable userList = [];
    @observable userCount = 0;

    constructor() {
        this.registerUrl = '/user/register';
        this.loginUrl = '/user/login';
        this.userInfoUrl = '/user/userInfo';
        this.loginOutUrl = '/user/loginOut';
        this.userListUrl = '/user/list';
        this.userUpdateUrl = '/user/update';
        this.userDeleteUrl = '/user/delete'
    }

    @action postUserDelete(body) {

        return xhr({
            method: 'post',
            url: this.userDeleteUrl,
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

    @action postUserUpdate(body) {

        return xhr({
            method: 'post',
            url: this.userUpdateUrl,
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

    @action postUserList(body) {

        return xhr({
            method: 'post',
            url: this.userListUrl,
            body: body
        }).then(response => {
            if (response.result) {
                this.userList = response.data.list;
                this.userCount = response.data.total;
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

    @action getLoginOut() {
        return xhr({
            method: 'get',
            url: this.loginOutUrl,
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })


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
                this.userInfo = {};
                console.info(response.message);
            }
        })
    }

}

export default new UserStore