/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import './tag.sass';

export default class Tag extends React.Component {

    render() {
        const { className } = this.props;

        return (
            <div className={className ? `zyc-tag ${className}` : 'zyc-tag'}>
                <span>{this.props.children}</span>
                <i className="iconfont icon-guanbi" onClick={() => { this.props.onClose && this.props.onClose(); }}>{null}</i>
            </div>
        );
    }
}