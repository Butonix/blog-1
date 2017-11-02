/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import ReactDom from 'react-dom'
import {Dialog, Message} from '../zyc'
import './login.sass'
import {Username, Password} from '../public/regular'


@observer
class Login extends React.Component {

    @observable type;

    constructor(args) {
        super(args);

        this.type = this.props.type
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
                        <RegisterForm
                            onClose={this.props.onClose}
                        />
                }
            </div>
        )
    }

    handleTab(type) {

        this.type = type
    }
}


@observer
class LoginTab extends React.Component {
    render() {
        let {type} = this.props;
        return (
            <div className="login-tab">
                <span className={type ? '' : 'active'}
                      onClick={this.handleTab.bind(this, 0)}>注册</span>
                <i>-</i>
                <span className={type ? 'active' : ''}
                      onClick={this.handleTab.bind(this, 1)}>登录</span>
            </div>
        )
    }

    handleTab(type) {
        this.props.onTab(type)
    }

}

@observer
class LoginForm extends React.Component {
    render() {
        return (
            <ul className="login-form">
                <li>
                    <i className="iconfont icon-yonghuming">{null}</i>
                    <input type="text" placeholder="username"/>
                </li>
                <li>
                    <i className="iconfont icon-mima">{null}</i>
                    <input type="password" placeholder="password"/>
                </li>
                <li>
                    <span>登录</span>
                </li>
            </ul>
        )
    }
}


@inject('UserStore') @observer
class RegisterForm extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore
    }

    render() {
        return (
            <ul className="register-form">
                <li>
                    <i className="iconfont icon-yonghuming">{null}</i>
                    <input type="text" placeholder="username" ref="username"/>
                </li>
                <li>
                    <i className="iconfont icon-mima">{null}</i>
                    <input type="password" placeholder="password" ref="password"/>
                </li>
                <li>
                    <i className="iconfont icon-mima">{null}</i>
                    <input type="password" placeholder="repeat password" ref="passwordRe"/>
                </li>
                <li>
                    <span onClick={this.handleRegister.bind(this)}>注册</span>
                </li>
            </ul>
        )
    }

    handleRegister() {

        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let passwordRe = this.refs.passwordRe.value;

        if (!Username.test(username)) {
            Message.error('请输入6-16位字符!');
            return false
        }

        if (!Password.test(password)) {
            Message.error('请输入以字母开头的6-16位字符的密码!');
            return false
        }

        if (password !== passwordRe) {

            Message.error('两次输入密码不一致!');

            return false
        }

        let body = {};
        body.username = username;
        body.password = password;

        this.userStore.getRegister(body).then((data) => {
            Message.success(data.message);
            return this.userStore.getUserInfo()
        }).then((data) => {
            console.log(data)
        }).catch((err) => {
            Message.error(err.message);
            console.log(err)
        })

    }
}

export default Login
