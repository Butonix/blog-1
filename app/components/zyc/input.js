/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './input.sass'

export default class Input extends React.Component {

    constructor(args) {
        super(args);

    }

    static defaultProps = {
        type: 'text'
    };

    handleChange(e) {
        this.props.onChange && this.props.onChange(e)
    }

    handleBlur() {
        this.props.onBlur && this.props.onBlur()
    }


    render() {
        let {type, style, placeholder, className, value} = this.props;

        return (
            <input
                type={type}
                className={className ? `zyc-input ${className}` : 'zyc-input'}
                style={style}
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
            />
        )
    }
}