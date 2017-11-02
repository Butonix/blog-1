/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {createPortal} from 'react-dom'
import './dialog.sass'

export default class Dialog extends React.Component {

    constructor(args) {
        super(args);

        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }

    componentWillUnmount() {
        document.body.removeChild(this.node);
    }

    handleClose() {
        this.props.onClose()

    }

    render() {
        let {show} = this.props;

        if (show) {
            return (
                createPortal(
                    <div className="zyc-dialog" data-flex="main:center cross:center">
                        <div className="dialog-bg" onClick={this.handleClose.bind(this)}>{null}</div>
                        <div className="dialog-content">
                            {this.props.children}
                        </div>
                    </div>, this.node)
            )
        } else {
            return null
        }
    }
}