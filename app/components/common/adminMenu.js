/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {NavLink} from 'react-router-dom';
import {Menu, Icon, Row, Col, Layout} from 'antd'
import './adminMenu.sass';
import ComMenu from '../comMenu'


@inject('UserStore') @observer
export default class AdminMenu extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {

        const {userInfo} = this.userStore;

        const {pathname} = window.location;

        const menuData = userInfo.userType === 1 ?
            [
                {
                    name: '首页',
                    path: '/admin',
                    icon: 'shouye'
                },

                {
                    name: '用户管理',
                    path: '/admin/managerUser',
                    icon: 'yonghuguanli'
                },
                {
                    name: '发布文章',
                    path: '/admin/newArticle',
                    icon: 'fabuwenzhang'
                },
                {
                    name: '标签管理',
                    path: '/admin/managerTags',
                    icon: 'biaoqianguanli'
                },
                {
                    name: '文章管理',
                    path: '/admin/managerArticle',
                    icon: 'wenzhangguanli'
                },
                {
                    name: '主界面',
                    path: '/',
                    icon: 'fanhuishouye'
                },
            ] :
            [
                {
                    name: '首页',
                    path: '/admin',
                    icon: 'user'
                },
                {
                    name: '发布文章',
                    path: '/admin/newArticle',
                    icon: 'user'
                },
                {
                    name: '文章管理',
                    path: '/admin/managerArticle',
                    icon: 'user'
                },
                {
                    name: '主界面',
                    path: '/',
                    icon: 'user'
                },
            ];

        return (
            <div className="admin-menu">
                <ComMenu
                    pathname={pathname}
                    defaultSelectKeys={['/admin']}
                    menus={menuData}
                    theme="dark"
                    className="admin-menu"
                    style={{
                        background: 'rgb(51, 51, 51)',
                    }}
                />
            </div>
        );
    }
}
