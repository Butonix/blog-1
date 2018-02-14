/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import {NavLink, Link} from 'react-router-dom';
import {Button, Menu, Dropdown, Icon, Col, Row, Layout, Avatar} from 'antd';
import './header.sass';
import Login from './login';
import {Dialog} from '../zyc';
import history from '../../history';
import ComMenu from '../comMenu'

const {Header} = Layout;

const menuData = [
    {
        name: '首页',
        path: '/',
        icon: 'user'
    },
    {
        name: '分类',
        path: '/categories',
        icon: 'user'
    }
];


@inject('UserStore') @observer
export default class ComHeader extends React.Component {
    @observable visible;

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
    };

    getName(menus, pathname) {
        return menus.find((item) => {
            if (item.children) {
                return this.getName(item.children, pathname)
            }
            if (item.path === '/') {
                return item.path === pathname
            }
            return new RegExp(item.path).test(pathname)
        })

    }

    handleMenu = () => {
        this.visible = false
    };

    handleDrop = (flag) => {
        this.visible = flag
    };


    render() {

        const {loginShow, userInfo, loginType} = this.userStore;

        const {pathname} = window.location;
        const {name} = this.getName(menuData, pathname);

        return (
            <div className="header">
                <Row>
                    <Col
                        md={6}
                        xs={0}
                    >
                        <span className="nav-logo" onClick={() => {
                            history.push('/')
                        }}>
                            <span className="title">SCRIPTCHAO</span>
                        </span>
                    </Col>
                    <Col
                        md={0}
                        xs={10}
                    >
                        <Dropdown
                            overlay={
                                <ComMenu
                                    pathname={pathname}
                                    defaultSelectKeys={['/']}
                                    menus={menuData}
                                    onClick={this.handleMenu}
                                />
                            }
                            visible={this.visible}
                            onVisibleChange={this.handleDrop}
                            trigger={['click']}
                        >
                            <div className="nav-menu">
                                <Button type="primary" ghost style={{border: 'none'}}>
                                    <span>{name}</span>
                                    <Icon type="caret-down"/>
                                </Button>
                            </div>
                        </Dropdown>
                    </Col>
                    <Col
                        md={12}
                        xs={0}
                    >
                        <ComMenu
                            pathname={pathname}
                            mode="horizontal"
                            defaultSelectKeys={['/']}
                            menus={menuData}
                            style={{
                                lineHeight: '64px',
                                borderBottom: 'none',
                                background: 'rgb(245,245,245)',
                            }}
                        />
                    </Col>
                    <Col
                        md={6}
                        xs={14}
                    >
                        {
                            userInfo.userId ?
                                <Dropdown
                                    overlay={
                                        <Menu onClick={this.handleClick}>
                                            {
                                                userInfo.userType !== 3 ?
                                                    <Menu.Item key="admin">
                                                        <Link to="/admin">
                                                            <Icon type="user" style={{marginRight: 10}}/>
                                                            <span>后台管理</span>
                                                        </Link>
                                                    </Menu.Item> : null
                                            }
                                            {
                                                userInfo.userType !== 3 ?
                                                    <Menu.Divider/> : null
                                            }
                                            <Menu.Item key="quit">
                                                <Icon type="user" style={{marginRight: 10}}/>
                                                <span>退出登录</span>
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                    <div className="login-ed">
                                        <Avatar
                                            src="/static/img/nav-user.jpg"
                                            style={{marginRight: '10px'}}
                                        />
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
                                        style={{marginLeft: 15}}
                                        onClick={this.handleLogin.bind(this, 1)}
                                    >
                                        登录
                                    </Button>
                                </div>
                        }
                    </Col>
                </Row>
                <Dialog
                    show={loginShow}
                    header={false}
                    footer={false}
                    onClose={this.handleClose.bind(this)}
                >
                    <Login type={loginType}/>
                </Dialog>
            </div>
        );
    }

    handleLogin(type) {
        this.userStore.loginType = type;
        this.userStore.loginShow = true;
    }

    handleClose() {
        this.userStore.loginShow = false;
    }
}
