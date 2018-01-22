/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observer } from 'mobx-react';
import './menu.sass';

@observer
class MenuItem extends React.Component {

    handleClick() {
        this.props.onClick();
    }

    render() {

        return (
            <div className="zyc-menu-item" onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </div>
        );
    }
}

@observer
class Menu extends React.Component {

    static Item = MenuItem;

    render() {

        return (
            <div className="zyc-menu">
                {this.props.children}
            </div>
        );

    }
}


export default Menu;
