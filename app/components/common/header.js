/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Menu, Dropdown, Icon } from 'antd';
import './header.sass';
import Login from './login';
import { Dialog } from '../zyc';
import history from '../../history';


@inject('UserStore') @observer
export default class Header extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    handleClick = (e) => {
        if (e.key === 'quit') {
            this.userStore.getLoginOut()
                .then((response) => {
                    if (response) {
                        localStorage.clear();
                        this.userStore.getUserInfo();
                    }
                });
        }

        if (e.key === 'admin') {
            history.push('/admin');
        }
    };

    render() {

        const { loginShow, userInfo, loginType } = this.userStore;

        const nav = [
            {
                text: '首页',
                to: '/',
                icon: 'qiantaishouye',
            },
            {
                text: '分类',
                to: '/categories',
                icon: 'fenlei',
            },
        ];

        const menu =
            <Menu onClick={this.handleClick}>
                {
                    userInfo.userType !== 3 ?
                        <Menu.Item key="admin">
                            <Icon type="user" style={{ marginRight: 10 }}/>
                            <span>后台管理</span>
                        </Menu.Item> : null
                }
                <Menu.Item key="quit">
                    <Icon type="user" style={{ marginRight: 10 }}/>
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>;


        return (
            <header className="com-header">
                <div className="nav">
                    <div className="nav-left">
                        <div className="nav-logo">
                            <Link to="/">
                                <span className="line">
                                    <i className="line-before">{null}</i>
                                </span>
                                <span className="title">SCRIPTCHAO</span>
                                <span className="line">
                                    <i className="line-after">{null}</i>
                                </span>

                            </Link>
                        </div>
                        <div className="nav-menu">
                            {
                                nav.map(value =>
                                    <NavLink
                                        exact
                                        to={value.to}
                                        activeClassName="active"
                                        key={value.to}
                                    >
                                        <i className={`iconfont icon-${value.icon}`}>{null}</i>
                                        <span>{value.text}</span>
                                    </NavLink>)
                            }
                        </div>
                    </div>
                    <div className="nav-right">
                        {
                            userInfo.userId ?
                                <Dropdown overlay={menu}>
                                    <div className="login-ed">
                                        <i className="aa">{null}</i>
                                        <span>{`欢迎! ${userInfo.username}`}</span>
                                    </div>
                                </Dropdown> :
                                <div className="login">
                                    <Button
                                        size="small"
                                        onClick={this.handleLogin.bind(this, 0)}
                                    >
                                        注册
                                    </Button>
                                    <Button
                                        size="small"
                                        style={{ marginLeft: 15 }}
                                        onClick={this.handleLogin.bind(this, 0)}
                                    >
                                        登录
                                    </Button>
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
        );
    }

    handleLoginOut() {
        this.userStore.getLoginOut()
            .then((response) => {
                if (response) {
                    localStorage.clear();
                    this.userStore.getUserInfo();
                }
            });
    }

    handleLogin(type) {
        this.userStore.loginType = type;
        this.userStore.loginShow = true;
    }

    handleClose() {
        this.userStore.loginShow = false;
    }
}
