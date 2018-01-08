/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import md5 from 'blueimp-md5';
import { Message } from '../zyc';
import './login.scss';
import { Username, Password } from '../public/regular';


@observer
class Login extends React.Component {

    @observable type;

    constructor(args) {
        super(args);

        this.type = this.props.type;
    }

    render() {
        return (
            <div className="com-login">
                <LoginTab
                    type={this.type}
                    onTab={this.handleTab.bind(this)}
                />
                {
                    this.type ?
                        <LoginForm /> :
                        <RegisterForm />
                }
            </div>
        );
    }

    handleTab(type) {

        this.type = type;
    }
}


@observer
class LoginTab extends React.Component {
    render() {
        const { type } = this.props;
        return (
            <div className="login-tab">
                <span className={type ? '' : 'active'}
                    onClick={this.handleTab.bind(this, 0)}>注册</span>
                <i>-</i>
                <span className={type ? 'active' : ''}
                    onClick={this.handleTab.bind(this, 1)}>登录</span>
            </div>
        );
    }

    handleTab(type) {
        this.props.onTab(type);
    }

}

@inject('UserStore') @observer
class LoginForm extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {
        return (
            <ul className="login-form">
                <li>
                    <i className="iconfont icon-yonghuming">{null}</i>
                    <input type="text" placeholder="username" ref="username" />
                </li>
                <li>
                    <i className="iconfont icon-mima">{null}</i>
                    <input type="password" placeholder="password" ref="password" />
                </li>
                <li>
                    <span onClick={this.handleLogin.bind(this)}>登录</span>
                </li>
            </ul>
        );
    }

    handleLogin() {
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        if (!username) {
            Message.error('用户名不能为空!');
            return false;
        }
        if (!password) {
            Message.error('密码不能为空!');
            return false;
        }

        const body = {};
        body.username = username;
        body.password = md5(password);

        this.userStore.postLogin(body).then((response) => {
            if (response) {
                localStorage.setItem('expired', +new Date());
                this.userStore.getUserInfo();

            }
        });
        return true;
    }
}


@inject('UserStore') @observer
class RegisterForm extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {
        return (
            <ul className="register-form">
                <li>
                    <i className="iconfont icon-yonghuming">{null}</i>
                    <input type="text" placeholder="username" ref="username" />
                </li>
                <li>
                    <i className="iconfont icon-mima">{null}</i>
                    <input type="password" placeholder="password" ref="password" />
                </li>
                <li>
                    <i className="iconfont icon-mima">{null}</i>
                    <input type="password" placeholder="repeat password" ref="passwordRe" />
                </li>
                <li>
                    <span onClick={this.handleRegister.bind(this)}>注册</span>
                </li>
            </ul>
        );
    }

    handleRegister() {

        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const passwordRe = this.refs.passwordRe.value;

        if (!Username.test(username)) {
            Message.error('请输入5-16位字符!');
            return false;
        }

        if (!Password.test(password)) {
            Message.error('请输入以字母开头的5-16位字符的密码!');
            return false;
        }

        if (password !== passwordRe) {

            Message.error('两次输入密码不一致!');

            return false;
        }

        const body = {};
        body.username = username;
        body.password = md5(password);

        this.userStore.postRegister(body).then((response) => {
            if (response) {
                this.userStore.postLogin(body).then((response1) => {
                    if (response1) {
                        localStorage.setItem('expired', +new Date());
                        this.userStore.getUserInfo();
                    }
                });
            }
        });
        return true;
    }
}

export default Login;
