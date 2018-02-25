/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Icon} from 'antd'
import './backTop.sass';
import './animation';
import './tween';

@observer
export default class BackTop extends React.Component {

    @observable needBack;

    constructor(args) {
        super(args);
        this.scroll = this.scroll.bind(this);

    }

    componentWillMount() {
        window.addEventListener('scroll', this.scroll);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
    }

    scroll() {
        if (window.pageYOffset >= this.props.visibleHeight) {
            this.needBack = true;
        } else {
            this.needBack = false;
        }
    }

    handleBackTop() {

        Math.animation(window.pageYOffset, 0, (value) => {
            window.scroll(0, value);
        }, 'Quad.easeIn', 300);
    }


    render() {

        return (
            this.needBack ?
                <div className="zyc-backTop" onClick={this.handleBackTop.bind(this)}>
                    <Icon type="fanhuidingbu"/>
                </div> : null
        );
    }
}