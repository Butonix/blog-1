/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observer } from 'mobx-react';
import './button.sass';

@observer
export default class Button extends React.Component {


    static defaultProps = {
        type: 'primary',
    };


    handleClick() {
        this.props.onClick && this.props.onClick();
    }


    render() {
        const { className, type } = this.props;
        return (
            <button
                className={className ? `zyc-button ${className} ${type}` : `zyc-button ${type}`}
                onClick={this.handleClick.bind(this)}
            >
                {this.props.children}
            </button>
        );
    }
}