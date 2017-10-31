/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import ReactDom from 'react-dom'
import './dialog.sass'

export default class Dialog extends React.Component {

    render() {
        return (
            <div className="zyc-dialog" data-flex="main:center cross:center">
                <div className="dialog-bg" onClick={this.handleCloseDialog.bind(this)}>{null}</div>
                <div className="dialog-content">
                    {this.props.children}
                </div>
            </div>
        )
    }

    handleCloseDialog() {

        ReactDom.unmountComponentAtNode(document.getElementById('dialog'))

    }
}
