/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Menu, Dropdown, Icon, Col, Row, Layout } from 'antd';
import './header.sass';
import Login from './login';
import { Dialog } from '../zyc';
import history from '../../history';

const { Header } = Layout;

const menuData = [
    {
        name: '首页',
        path: '/',
        icon: 'user'
    },
    {
        name: '分类',
        path: '/categorise',
        icon: 'user'
    }
];


@inject('UserStore') @observer
export default class ComHeader extends React.Component {

    @observable current = '';

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

    handleNav = () => {

    }

    render() {

        const { loginShow, userInfo, loginType } = this.userStore;

        // const nav = [
        //     {
        //         text: '首页',
        //         to: '/',
        //         icon: 'qiantaishouye',
        //     },
        //     {
        //         text: '分类',
        //         to: '/categories',
        //         icon: 'fenlei',
        //     },
        // ];


        const menu =
            <Menu onClick={this.handleClick}>
                {
                    userInfo.userType !== 3 ?
                        <Menu.Item key="admin">
                            <Icon type="user" style={{ marginRight: 10 }}/>
                            <span>后台管理</span>
                        </Menu.Item> : null
                }
                {
                    userInfo.userType !== 3 ?
                        <Menu.Divider/> : null
                }
                <Menu.Item key="quit">
                    <Icon type="user" style={{ marginRight: 10 }}/>
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>;


        return (
            <Header className="com-header">
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
                        111
                    </Col>
                    <Col
                        md={12}
                        xs={0}
                    >
                        <Menu
                            mode="horizontal"
                            onClick={this.handleNav}
                            selectedKeys={[]}
                            style={{
                                lineHeight: '64px',
                                borderBottom: 'none',
                                background: 'rgb(245,245,245)',
                            }}
                        >
                            <Menu.Item key="home">
                                <Link to="/">
                                    <Icon type="user"/>
                                    <span>首页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="categories">
                                <Link to="/categories">
                                    <Icon type="user"/>
                                    <span>分类</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                        {/*<div className="nav-menu">*/}
                        {/*{*/}
                        {/*nav.map(value =>*/}
                        {/*<NavLink*/}
                        {/*exact*/}
                        {/*to={value.to}*/}
                        {/*activeClassName="active"*/}
                        {/*key={value.to}*/}
                        {/*>*/}
                        {/*<i className={`iconfont icon-${value.icon}`}>{null}</i>*/}
                        {/*<span>{value.text}</span>*/}
                        {/*</NavLink>)*/}
                        {/*}*/}
                        {/*</div>*/}
                    </Col>
                    <Col
                        md={6}
                        xs={14}

                    >
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
            </Header>
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
