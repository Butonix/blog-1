/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
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
                        <RegisterForm />
                }
            </div>
        )
    }

    handleTab(type) {

        this.type = type
    }
}

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


@observer
class RegisterForm extends React.Component {
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

        Message.success('hello!')


    }
}

function render(type) {
    return ReactDom.render(
        <Dialog>
            <Login type={type}/>
        </Dialog>, document.getElementById('dialog')
    )
}

export default {render}
