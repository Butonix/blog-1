/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {NavLink} from 'react-router-dom'
import './adminMenu.sass'

@inject('UserStore') @observer
export default class AdminMenu extends React.Component {
    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    render() {

        const {userInfo} = this.userStore;

        let menu = userInfo.userType == 1 ?
            [
                {
                    text: '首页',
                    to: '/admin',
                    icon: 'shouye'
                },

                {
                    text: '用户管理',
                    to: '/admin/managerUser',
                    icon: 'yonghuguanli'
                },
                {
                    text: '发布文章',
                    to: '/admin/newArticle',
                    icon: 'fabuwenzhang'
                },
                {
                    text: '标签管理',
                    to: '/admin/managerTags',
                    icon: 'biaoqianguanli'
                },
                {
                    text: '文章管理',
                    to: '/admin/managerArticle',
                    icon: 'wenzhangguanli'
                },
            ] :
            [
                {
                    text: '首页',
                    to: '/admin',
                    icon: 'shouye'
                },
                {
                    text: '发布文章',
                    to: '/admin/newArticle',
                    icon: 'fabuwenzhang'
                },
                {
                    text: '文章管理',
                    to: '/admin/managerArticle',
                    icon: 'wenzhangguanli'
                },
            ];


        return (
            <div className="com-admin-menu">
                {
                    menu.map((value) =>
                        <NavLink
                            exact={true}
                            to={value.to}
                            activeClassName="active"
                            key={value.to}
                            data-flex="cross:center"
                        >
                            <i className={`iconfont icon-${value.icon}`}>{null}</i>
                            <span>{value.text}</span>
                        </NavLink>
                    )
                }
            </div>
        )
    }
}
