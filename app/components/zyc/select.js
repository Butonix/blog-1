/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Portal from './portal';
import './select.sass';

class SelectItem extends React.Component {

    render() {
        return (
            <div className="zyc-select-item" type="type">
                {this.props.children}
            </div>
        );
    }
}

@observer
class Select extends React.Component {

    @observable show;
    @observable portal;

    static Item = SelectItem;

    constructor(args) {
        super(args);

        this.mousedown = this.mousedown.bind(this);

    }

    componentWillMount() {

        this.createEventListener();
    }

    createEventListener() {
        window.addEventListener('mousedown', this.mousedown);
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.mousedown);
    }

    mousedown(e) {
        
        if (this.show && !(this.refs.select.contains(e.target) || ReactDom.findDOMNode(this.portal).contains(e.target))) {

            this.show = false;
        }
    }

    handleClick(e) {
        if (e.target.attributes.type) {

            const tag = e.target.innerText;
            this.manageTags(tag);

        } else {
            this.showPortal();
        }
    }

    manageTags(tag) {

        if (this.props.value.includes(tag)) {
            this.props.value.splice(this.props.value.indexOf(tag), 1);

        } else {
            this.props.value.push(tag);
        }
        this.props.onSelectTags(this.props.value);

    }

    handleDelText(index) {

        this.props.value.splice(index, 1);
        this.props.onSelectTags(this.props.value);
    }

    showPortal() {
        this.show = true;
    }

    render() {
        const { className, value = [] } = this.props;

        return (
            <div
                onClick={this.handleClick.bind(this)}
                className={className ? `zyc-select ${className}` : 'zyc-select'}
                ref="select"
            >
                {
                    value.length ?
                        value.map((item, index) =>
                            <div className="zyc-select-content" key={item}>
                                <span>{item}</span>
                                <i className="iconfont icon-guanbi"
                                    onClick={this.handleDelText.bind(this, index)}>{null}
                                </i>
                            </div>) :
                        <div className="zyc-select-placeholder">
                            请选择分类
                        </div>
                }
                {
                    this.show ?
                        <Portal
                            ref={(node) => { this.portal = node; }}
                            target={this.refs.select}
                        >
                            <div className="zyc-select-portal">
                                {this.props.children}
                            </div>
                        </Portal> : null
                }
            </div>
        );
    }
}


export default Select;