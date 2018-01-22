/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { createPortal } from 'react-dom';
import './portal.sass';

@observer
export default class Portal extends React.Component {

    @observable direction = {};

    constructor(args) {
        super(args);

        this.resize = this.resize.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.resize);

        this.node = document.createElement('div');
        document.body.appendChild(this.node);

        this.direction = this.getDirection(this.props.target);
    }

    componentDidMount() {

    }

    resize() {
        this.direction = this.getDirection(this.props.target);
    }

    componentWillUnmount() {
        document.body.removeChild(this.node);
        window.removeEventListener('resize', this.resize);
    }

    getDirection(value) {
        let l = 0;
        let t = 0;
        let w = 0;
        let h = 0;
        let target = value;

        if (target) {
            h = target.offsetHeight;
            w = target.offsetWidth;
        }

        while (target) {
            l += target.offsetLeft;
            t += target.offsetTop;
            target = target.offsetParent;
        }

        return {
            left: l,
            top: t,
            width: w,
            height: h,
        };
    }


    render() {
        const { top, left, height, width } = this.direction;
        const { fixed } = this.props;

        return createPortal(<div className="zyc-portal"
            style={{
                left,
                top: fixed ? top + window.pageYOffset + height + 5 : top + height + 5,
                width,
            }}>{this.props.children}
        </div>, this.node);

    }
}