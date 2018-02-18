/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import md5 from 'blueimp-md5';
import { Button, Input, Icon } from 'antd';
import { Message } from '../zyc';
import './login.sass';
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
                        <LoginForm/> :
                        <RegisterForm/>
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
                <span
                    className={type ? '' : 'active'}
                    onClick={this.handleTab.bind(this, 0)}>注册</span>
                <i>-</i>
                <span
                    className={type ? 'active' : ''}
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

    @observable username = '';
    @observable password = '';

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {
        return (
            <ul className="login-form">
                <li>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="username"
                        value={this.username}
                        onChange={(e) => {
                            this.username = e.target.value
                        }}
                    />
                </li>
                <li>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="password"
                        type="password"
                        value={this.password}
                        onChange={(e) => {
                            this.password = e.target.value
                        }}
                    />
                </li>
                <li>
                    <Button
                        type="primary"
                        style={{ width: '100%', borderRadius: '20px' }}
                        onClick={this.handleLogin.bind(this)}
                    >
                        登录
                    </Button>
                </li>
            </ul>
        );
    }

    handleLogin() {

        if (!this.username) {
            Message.error('用户名不能为空!');
            return false;
        }
        if (!this.password) {
            Message.error('密码不能为空!');
            return false;
        }

        const body = {};
        body.username = this.username;
        body.password = md5(this.password);

        this.userStore.postLogin(body)
            .then((response) => {
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
    @observable username = '';
    @observable password = '';
    @observable passwordRe = '';

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {
        return (
            <ul className="register-form">
                <li>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="username"
                        value={this.username}
                        onChange={(e) => {
                            this.username = e.target.value
                        }}
                    />
                </li>
                <li>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        type="password"
                        placeholder="password"
                        value={this.password}
                        onChange={(e) => {
                            this.password = e.target.value
                        }}
                    />
                </li>
                <li>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="repeat password"
                        type="password"
                        value={this.passwordRe}
                        onChange={(e) => {
                            this.passwordRe = e.target.value
                        }}
                    />
                </li>
                <li>
                    <Button
                        type="primary"
                        style={{ width: '100%', borderRadius: '20px' }}
                        onClick={this.handleRegister.bind(this)}
                    >
                        注册
                    </Button>
                </li>
            </ul>
        );
    }

    handleRegister() {

        if (!Username.test(this.username)) {
            Message.error('请输入5-16位字符!');
            return false;
        }

        if (!Password.test(this.password)) {
            Message.error('请输入以字母开头的5-16位字符的密码!');
            return false;
        }

        if (this.password !== this.passwordRe) {

            Message.error('两次输入密码不一致!');

            return false;
        }

        const body = {};
        body.username = this.username;
        body.password = md5(this.password);

        this.userStore.postRegister(body)
            .then((response) => {
                if (response) {
                    this.userStore.postLogin(body)
                        .then((response1) => {
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
