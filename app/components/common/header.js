/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import {NavLink, Link} from 'react-router-dom'
import './header.sass'
import Login from './login'
import {Dialog, DropDown, Menu} from '../zyc'


@inject('UserStore') @observer
export default class Header extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {

        const {loginShow, userInfo, loginType} = this.userStore;

        const nav = [
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

        const menu = userInfo.userType == 3 ?
            <Menu>
                <Menu.Item onClick={this.handleLoginOut.bind(this)}>
                    <i className="iconfont icon-tuichu">{null}</i>
                    <span>退出登录</span>
                </Menu.Item>
            </Menu> :
            <Menu>
                <Menu.Item onClick={this.handleEntryManage.bind(this)}>
                    <i className="iconfont icon-guanli">{null}</i>
                    <span>后台管理</span>
                </Menu.Item>
                <Menu.Item onClick={this.handleLoginOut.bind(this)}>
                    <i className="iconfont icon-tuichu">{null}</i>
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>;


        return (
            <header className="com-header">
                <div className="nav" data-flex="cross:center main:justify">
                    <div className="nav-left" data-flex="dir:left cross:center">
                        <div className="nav-logo">SCRIPTCHAO</div>
                        <div className="nav-menu">
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
                    <div className="nav-right">
                        {
                            userInfo.userId ?
                                <DropDown overlay={menu}>
                                    <div className="login-ed" data-flex="cross:center">
                                        <i>{null}</i>
                                        <span>{`欢迎! ${userInfo.username}`}</span>
                                    </div>
                                </DropDown> :
                                <div className="login">
                                    <span onClick={this.handleLogin.bind(this, 0)}>注册</span>
                                    <span onClick={this.handleLogin.bind(this, 1)}>登录</span>
                                </div>
                        }
                    </div>
                </div>
                <Dialog
                    show={loginShow}
                    header={false}
                    footer={false}
                    onClose={this.handleClose.bind(this)}
                >
                    <Login type={loginType}/>
                </Dialog>
            </header>
        )
    }

    handleEntryManage() {
        this.props.history.push('/admin')
    }

    handleLoginOut() {
        this.userStore.getLoginOut().then(response => {
            if (response) {
                localStorage.clear();
                this.userStore.getUserInfo()
            }
        })
    }

    handleLogin(type) {
        this.userStore.loginType = type;
        this.userStore.loginShow = true;
    }

    handleClose() {
        this.userStore.loginShow = false
    }
}
