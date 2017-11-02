/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import {NavLink} from 'react-router-dom'
import './header.sass'
import Login from './login'
import {Dialog} from '../zyc'

@inject('UserStore') @observer
export default class Header extends React.Component {

    @observable type;

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {

        const {loginShow} = this.userStore;

        let nav = [
            {
                text: '首页',
                to: '/',
                icon: 'qiantaishouye'
            },
            {
                text: '分类',
                to: '/categories',
                icon: 'fenlei'
            },

        ];
        return (
            <header className="com-header">
                <div className="header-inner" data-flex="cross:center main:justify">
                    <div className="left" data-flex="dir:left cross:center">
                        <div className="logo">SCRIPTCHAO</div>
                        <div className="nav">
                            {
                                nav.map((value) =>
                                    <NavLink
                                        exact={true}
                                        to={value.to}
                                        activeClassName="active"
                                        key={value.to}
                                    >
                                        <i className={`iconfont icon-${value.icon}`}>{null}</i>
                                        <span>{value.text}</span>
                                    </NavLink>
                                )
                            }
                        </div>
                    </div>
                    <div className="right">
                        <div className="login">
                            <span onClick={this.handleShowDialog.bind(this, 0)}>注册</span>
                            <span onClick={this.handleShowDialog.bind(this, 1)}>登录</span>
                        </div>
                    </div>
                </div>
                <Dialog
                    show={loginShow}
                    onClose={this.handleClose.bind(this)}
                >
                    <Login type={this.type}/>
                </Dialog>
            </header>
        )
    }

    handleShowDialog(type) {
        this.type = type;
        this.userStore.loginShow = true;
    }

    handleClose() {
        this.userStore.loginShow = false
    }
}
