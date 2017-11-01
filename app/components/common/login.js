/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import ReactDom from 'react-dom'
import {Dialog} from '../zyc'
import './login.sass'


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
                    <input type="text" placeholder="username"/>
                </li>
                <li>
                    <input type="password" placeholder="password"/>
                </li>
                <li>
                    <span>登录</span>
                </li>
            </ul>
        )
    }
}

class RegisterForm extends React.Component {
    render() {
        return (
            <ul className="register-form">
                <li>
                    <input type="text" placeholder="username"/>
                </li>
                <li>
                    <input type="password" placeholder="password"/>
                </li>
                <li>
                    <input type="password" placeholder="repeat password"/>
                </li>
                <li>
                    <span>注册</span>
                </li>
            </ul>
        )
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
