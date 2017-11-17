/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './tag.sass'

export default class Tag extends React.Component {

    constructor(args) {
        super(args);

    }

    handleClick() {
        this.props.onClose()
    }


    render() {
        let {className} = this.props;

        return (
            <div className={className ? `zyc-tag ${className}` : 'zyc-tag'}>
                <span>{this.props.children}</span>
                <i className="iconfont icon-guanbi" onClick={this.handleClick.bind(this)}>{null}</i>
            </div>
        )
    }
}