/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {createPortal} from 'react-dom'
import './portal.sass'

@observer
export default class Portal extends React.Component {

    @observable direction = {};

    constructor(args) {
        super(args);

        this.resize = this.resize.bind(this)
    }

    componentWillMount() {
        window.addEventListener('resize', this.resize);

        this.node = document.createElement('div');
        document.body.appendChild(this.node);

        this.direction = this.getDirection(this.props.target)
    }

    componentDidMount() {

    }

    resize() {
        this.direction = this.getDirection(this.props.target);
    }

    componentWillUnmount() {
        document.body.removeChild(this.node);
        window.removeEventListener('resize', this.resize)
    }

    getDirection(target) {
        let l = 0, t = 0, w = 0, h = 0;

        if (target) {
            h = target.offsetHeight;
            w = target.offsetWidth;
        }

        while (target) {
            l += target.offsetLeft;
            t += target.offsetTop;
            target = target.offsetParent
        }

        return {left: l, top: t + window.pageYOffset, width: w, height: h}
    }


    render() {
        let {top, left, height, width} = this.direction;

        return createPortal(
            <div className="zyc-portal" style={{
                left: left,
                top: top + height + 5,
                width: width
            }}>
                {this.props.children}
            </div>, this.node)
    }
}