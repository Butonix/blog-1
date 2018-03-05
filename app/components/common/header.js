/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import {NavLink, Link} from 'react-router-dom';
import {Button, Menu, Dropdown, Icon, Col, Row, Layout, Avatar} from 'antd';
import './header.sass';
import history from '../../history';
import ComMenu from '../comMenu'
import Login from '../login'
import Register from '../register'

const menuData = [
    {
        name: '首页',
        path: '/',
        icon: 'shouye',
    },
    {
        name: '分类',
        path: '/categories',
        icon: 'fenlei',
    },
    {
        name: '关于',
        path: '/about',
        icon: 'guanyuwo'
    },
    {
        name: '简历',
        path: '/resume',
        icon: 'jianli'
    }
];


@inject('UserStore', 'ArticleStore') @observer
export default class ComHeader extends React.Component {

    @observable visible;
    @observable isHover;
    @observable loginShow;
    @observable registerShow;

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
        this.articleStore = this.props.ArticleStore;
    }


    componentDidMount() {
        this.articleStore.initStore();
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

        this.isHover = false;
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

    handleHover = (flag) => {
        this.isHover = flag;

    };


    render() {

        const { userInfo } = this.userStore;

        const { pathname } = window.location;
        const { name } = this.getName(menuData, pathname);

        return (
            <div className="header">
                <Row>
                    <Col
                        md={{ offset: 2, span: 4 }}
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
                                <Button type="primary" ghost style={{ border: 'none' }}>
                                    <span>{name}</span>
                                    <Icon type="xiangxia"/>
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
                                    onVisibleChange={this.handleHover}
                                    visible={this.isHover}
                                    trigger={['hover', 'click']}
                                    overlay={
                                        <Menu
                                            onClick={this.handleClick}
                                        >
                                            {
                                                userInfo.userType !== 3 ?
                                                    <Menu.Item key="admin">
                                                        <Link to="/admin">
                                                            <Icon type="houtaiguanli" style={{ marginRight: 10 }}/>
                                                            <span>后台管理</span>
                                                        </Link>
                                                    </Menu.Item> : null
                                            }
                                            {
                                                userInfo.userType !== 3 ?
                                                    <Menu.Divider/> : null
                                            }
                                            <Menu.Item key="quit">
                                                <Icon type="tuichudenglu" style={{ marginRight: 10 }}/>
                                                <span>退出登录</span>
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                    <div className="login-ed">
                                        <Avatar
                                            src="/static/img/nav-user.jpg"
                                            style={{ marginRight: 10 }}
                                        />
                                        <span>{`欢迎! ${userInfo.username}`}</span>
                                    </div>
                                </Dropdown> :
                                <div className="login">
                                    <Button
                                        size="small"
                                        onClick={this.handleRegister.bind(this)}
                                    >
                                        注册
                                    </Button>
                                    <Button
                                        size="small"
                                        style={{ marginLeft: 15 }}
                                        onClick={this.handleLogin.bind(this)}
                                    >
                                        登录
                                    </Button>
                                </div>
                        }
                    </Col>
                </Row>
                <Login
                    visible={this.loginShow}
                    onCancel={this.handleClose.bind(this)}
                />
                <Register
                    visible={this.registerShow}
                    onCancel={this.handleClose.bind(this)}
                />
            </div>
        );
    }

    handleLogin() {
        this.loginShow = true
    }

    handleRegister() {
        this.registerShow = true
    }

    handleClose() {
        this.loginShow = false;
        this.registerShow = false;
    }
}
