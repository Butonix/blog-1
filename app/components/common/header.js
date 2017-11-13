/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import {NavLink} from 'react-router-dom'
import './header.sass'
import Login from './login'
import {Dialog, DropDown, Menu} from '../zyc'


@inject('UserStore') @observer
export default class Header extends React.Component {

    @observable type;

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {

        const {loginShow, userInfo} = this.userStore;

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

        const menu = (
            <Menu>
                <Menu.Item>
                    <i className="iconfont icon-tuichu">{null}</i>
                    <span onClick={this.handleLoginOut.bind(this)}>退出登录</span>
                </Menu.Item>
            </Menu>
        );


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
                                    <span onClick={this.handleShowDialog.bind(this, 0)}>注册</span>
                                    <span onClick={this.handleShowDialog.bind(this, 1)}>登录</span>
                                </div>
                        }
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

    handleLoginOut() {
        this.userStore.getLoginOut()
    }

    handleShowDialog(type) {
        this.type = type;
        this.userStore.loginShow = true;
    }

    handleClose() {
        this.userStore.loginShow = false
    }
}
