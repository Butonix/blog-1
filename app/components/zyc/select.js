/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {createPortal} from 'react-dom'
import './select.sass'

class SelectItem extends React.Component {
    constructor(args) {
        super(args);

    }

    handleChange() {
        this.props.onClick()
        console.log(this)
    }

    render() {
        return (
            <div className="zyc-select-item" onClick={this.handleChange.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}

@observer
class Select extends React.Component {

    @observable show;
    @observable direction = {};

    static Item = SelectItem;

    constructor(args) {
        super(args);

    }

    componentDidMount() {

        this.direction = this.getDirection(this.refs.select);
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }

    handleShow() {
        this.show = true
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
        let {className} = this.props;

        let {top, left, height, width} = this.direction;

        return (
            <div
                onClick={this.handleShow.bind(this)}
                className={className ? `zyc-select ${className}` : 'zyc-select'}
                ref="select"
            >
                <div className="zyc-select-placeholder">
                    请选择分类
                </div>
                {
                    this.show ? createPortal(
                        <div className="zyc-select-portal"
                             style={{
                                 top: top + height + 5,
                                 left: left,
                                 width: width
                             }}
                        >
                            {this.props.children}
                        </div>, this.node
                    ) : null
                }
            </div>
        )
    }
}


export default Select