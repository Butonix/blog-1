/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './button.sass'

export default class Button extends React.Component {

    constructor(args) {
        super(args);

    }

    static defaultProps = {
        type: 'primary',
    };


    handleClick() {
        this.props.onClick()
    }


    render() {
        let {className, type} = this.props;
        return (
            <button
                className={className ? `zyc-button ${className} ${type}` : `zyc-button ${type}`}
                onClick={this.handleClick.bind(this)}
            >
                {this.props.children}
            </button>
        )
    }
}