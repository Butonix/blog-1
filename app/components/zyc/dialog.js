/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {createPortal} from 'react-dom'
import './dialog.sass'
import {Button} from './index'

export default class Dialog extends React.Component {

    constructor(args) {
        super(args);

        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }

    static defaultProps = {
        header: true,
        footer: true
    };

    componentWillUnmount() {
        document.body.removeChild(this.node);
    }

    handleClose() {
        this.props.onClose()

    }

    handleOk() {
        this.props.onOk()
    }

    render() {
        let {show, title, header, width, footer} = this.props;

        if (footer && typeof footer === 'boolean') {
            footer = [
                <Button key="sure" onClick={this.handleOk.bind(this)} className="btn">确认</Button>,
                <Button key="close" onClick={this.handleClose.bind(this)} className="btn">取消</Button>
            ]
        }

        if (show) {
            return (
                createPortal(
                    <div className="zyc-dialog" data-flex="main:center cross:center">
                        <div className="dialog-bg" onClick={this.handleClose.bind(this)}>{null}</div>
                        <div className="dialog-content"
                             style={{
                                 width: width ? width : null
                             }}
                        >
                            {
                                header ?
                                    <div className="header" data-flex="main:justify dir:right">
                                        <i className="iconfont icon-guanbi"
                                           onClick={this.handleClose.bind(this)}>{null}</i>
                                        {
                                            title ? <span>{title}</span> : null
                                        }
                                    </div> : null
                            }
                            {this.props.children}
                            {
                                footer ?
                                    <div className="footer">
                                        {footer.map((button, index) => button)}
                                    </div> : null
                            }
                        </div>
                    </div>, this.node)
            )
        } else {
            return null
        }
    }
}