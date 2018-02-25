/**
 * Created by Administrator on 2018/2/13.
 */

import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd'

const {SubMenu} = Menu;

export default class ComMenu extends Component {

    constructor(args) {
        super(args);
        this.menus = this.props.menus

    }

    getFlatMenuKeys(menus) {
        let keys = [];
        menus.forEach((item) => {
            if (item.children) {
                keys.push(item.path);
                keys = keys.concat(this.getFlatMenuKeys(item.children));
            } else {
                keys.push(item.path);
            }
        });
        return keys;
    }

    getSelectedMenuKeys(pathname) {
        const keys = this.getFlatMenuKeys(this.menus);

        return keys.filter((item) => {
            if (item === '/' || item === '/admin') {
                return item === pathname
            }
            return new RegExp(item).test(pathname)
        })
    }

    getMenuItem(menus) {
        if (!menus) {
            return null
        }
        return menus.filter(item => item.name).map(item => this.getSubMenuOrItem(item))
    }

    getSubMenuOrItem(item) {
        if (item.children) {
            return (
                <SubMenu
                    key={item.path}
                    title={
                        item.icon ? (
                            <span>
                                <Icon type={item.icon} style={{marginRight: 10}}/>
                                <span>{item.name}</span>
                            </span>
                        ) : <span>{item.name}</span>
                    }
                >
                    {this.getMenuItem(item.children)}
                </SubMenu>
            );
        }
        return (
            <Menu.Item key={item.path}>
                {
                    item.icon ?
                        <Link to={item.path}>
                            <Icon type={item.icon} style={{marginRight: 10}}/>
                            <span>{item.name}</span>
                        </Link> :
                        <Link to={item.path}>
                            <span>{item.name}</span>
                        </Link>
                }
            </Menu.Item>
        );
    }


    render() {
        const {pathname, defaultSelectKeys, menus, ...props} = this.props;
        let selectedKeys = this.getSelectedMenuKeys(pathname);

        if (!selectedKeys.length) {
            selectedKeys = defaultSelectKeys
        }

        return (
            <Menu
                {...props}
                selectedKeys={selectedKeys}
            >
                {this.getMenuItem(this.menus)}
            </Menu>
        )
    }
}
