/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import Portal from './portal'
import './select.sass'

class SelectItem extends React.Component {
    constructor(args) {
        super(args);

    }

    render() {
        return (
            <div className="zyc-select-item" type="type">
                {this.props.children}
            </div>
        )
    }
}

@observer
class Select extends React.Component {

    @observable show;
    @observable portal;
    @observable list = [];

    static Item = SelectItem;

    constructor(args) {
        super(args);

        this.mousedown = this.mousedown.bind(this)

    }

    componentWillMount() {

        this.createEventListener()
    }

    createEventListener() {
        window.addEventListener('mousedown', this.mousedown)
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.mousedown)
    }

    mousedown(e) {
        if (this.show && !(this.refs.select.contains(e.target) || ReactDOM.findDOMNode(this.portal).contains(e.target))) {
            this.show = false
        }
    }

    handleClick(e) {
        if (e.target.attributes.type) {

            let tag = e.target.innerText;
            this.manageTags(tag);

        } else {
            this.showPortal();
        }
    }

    manageTags(tag) {

        if (this.list.includes(tag)) {
            this.list.splice(this.list.indexOf(tag), 1)

        } else {
            this.list.push(tag)
        }
        this.props.onSelectTags(this.list)

    }

    handleDelText(index) {

        this.list.splice(index, 1);
        this.props.onSelectTags(this.list)
    }

    showPortal() {
        this.show = true
    }

    savePortal(node) {
        this.portal = node;
    }

    render() {
        let {className} = this.props;

        return (
            <div
                onClick={this.handleClick.bind(this)}
                className={className ? `zyc-select ${className}` : 'zyc-select'}
                ref="select"
            >
                {
                    this.list.length ? this.list.map((value, index) =>
                        <div className="zyc-select-content" key={value}>
                            <span>{value}</span>
                            <i className="iconfont icon-guanbi"
                               onClick={this.handleDelText.bind(this, index)}>{null}</i>
                        </div>) :
                        <div className="zyc-select-placeholder">
                            请选择分类
                        </div>
                }
                {
                    this.show ?
                        <Portal
                            ref={this.savePortal.bind(this)}
                            target={this.refs.select}
                        >
                            {this.props.children}
                        </Portal> : null
                }
            </div>
        )
    }
}


export default Select