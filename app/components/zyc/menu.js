/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './menu.sass'


class MenuItem extends React.Component {

    constructor(args) {
        super(args);
    }

    handleClick() {
        this.props.onClick()
    }

    render() {

        return (
            <div className="zyc-menu-item" onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}


class Menu extends React.Component {

    static Item = MenuItem;

    constructor(args) {
        super(args);
    }

    render() {

        return (
            <div className="zyc-menu">
                {this.props.children}
            </div>
        )

    }
}


export default Menu
