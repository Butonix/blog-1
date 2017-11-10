/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import ReactDom from 'react-dom'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {createPortal} from 'react-dom'
import './dropDown.sass'


@observer
export default class DropDown extends React.Component {

    @observable show;
    @observable direction = {};
    @observable timer;

    constructor(args) {
        super(args);
    }

    componentDidMount() {
        this.direction = this.getDirection(this.refs.dropDown);
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }

    handleEnter() {
        clearTimeout(this.timer);
        this.show = true
    }

    handleLeaver() {
        this.timer = setTimeout(() => {
            this.show = false
        }, 100)
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

        return {left: l, top: t, width: w, height: h}
    }


    render() {
        let {top, left, height} = this.direction;
        return (
            <div className="zyc-dropDown" ref="dropDown"
                 onMouseEnter={this.handleEnter.bind(this)}
                 onMouseLeave={this.handleLeaver.bind(this)}
            >
                {this.props.children}
                {
                    this.show ? createPortal(
                        <div className="zyc-dropDown-portal"
                             style={{
                                 top: top + height + 5,
                                 left: left
                             }}>
                            {this.props.overlay}
                        </div>, this.node
                    ) : null
                }
            </div>
        )
    }
}
