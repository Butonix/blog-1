/**
 * Created by scriptchao on 2017/11/2.
 */
import { observable, action } from 'mobx';
import xhr from '../xhr';
import { Message } from '../../components/zyc';

class UserStore {

    @observable userInfo;
    @observable loginShow;
    @observable loginType;
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

    @action clearStore() {
        this.userList = [];
        this.userCount = 0;
    }

    @action postUserDelete(body) {

        return xhr({
            method: 'post',
            url: this.userDeleteUrl,
            body,
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            }
            Message.error(response.message);
            return false;

        })
    }

    @action postUserUpdate(body) {

        return xhr({
            method: 'post',
            url: this.userUpdateUrl,
            body,
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            }
            Message.error(response.message);
            return false;

        })
    }

    @action postUserList(body) {

        return xhr({
            method: 'post',
            url: this.userListUrl,
            body,
        }).then(response => {
            if (response.result) {
                this.userList = response.data.list;
                this.userCount = response.data.total;
                return Promise.resolve(response)
            }
            Message.error(response.message);
            return false;

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
            }
            Message.error(response.message);
            return false;

        })


    }

    @action postRegister(body) {

        return xhr({
            method: 'post',
            url: this.registerUrl,
            body,
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            }
            Message.error(response.message);
            return false;

        })
    }

    @action postLogin(body) {

        return xhr({
            method: 'post',
            url: this.loginUrl,
            body,
        }).then(response => {
            if (response.result) {
                this.loginShow = false;
                Message.success(response.message);
                return Promise.resolve(response)
            }
            Message.error(response.message);
            return false;

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
            }
            this.userInfo = {};
            console.info(response.message);
            return false;

        })
    }

}

export default new UserStore();