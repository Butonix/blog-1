/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observer } from 'mobx-react';
import './input.sass';

@observer
export default class Input extends React.Component {

    static defaultProps = {
        type: 'text'
    };

    handleChange(e) {
        this.props.onChange && this.props.onChange(e);
    }

    handleBlur() {
        this.props.onBlur && this.props.onBlur();
    }


    render() {
        const { type, style, placeholder, className, value } = this.props;

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
        );
    }
}