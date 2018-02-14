/**
 * Created by Administrator on 2018/2/14.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Icon} from 'antd'
import './drawerMenu.sass'

@observer
export default class DrawerMenu extends React.Component {
    @observable open;


    componentWillReceiveProps() {
        this.open = false
    }


    handleOpen = () => {
        this.open = !this.open
    };

    handleHide = () => {
        this.open = false
    };

    render() {
        const {width} = this.props;
        return (
            <div
                className="drawer-menu"
                style={{
                    pointerEvents: this.open ? 'auto' : 'none'
                }}
            >
                <div
                    className="drawer-bg"
                    onClick={this.handleHide}
                    style={{opacity: this.open ? 1 : 0}}
                >{null}</div>
                <div
                    className="drawer-content"
                    style={{
                        left: this.open ? 0 : -width,
                        width
                    }}
                >
                    <div className="drawer-icon" onClick={this.handleOpen}>
                        <Icon type={this.open ? 'menu-fold' : 'menu-unfold'}/>
                    </div>
                    {this.props.children}
                </div>
            </div>

        )
    }
}
