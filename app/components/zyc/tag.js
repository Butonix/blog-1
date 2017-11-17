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


    render() {
        let {className} = this.props;

        return (
            <div className={className ? `zyc-tag ${className}` : 'zyc-tag'}>
                <span>{this.props.children}</span>
                <i className="iconfont icon-guanbi">{null}</i>
            </div>
        )
    }
}