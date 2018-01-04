/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Portal from './portal';
import './dropDown.sass';


@observer
export default class DropDown extends React.Component {

    @observable show;
    @observable timer;


    handleEnter() {
        clearTimeout(this.timer);
        this.show = true;
    }

    handleLeaver() {
        this.timer = setTimeout(() => {
            this.show = false;
        }, 100);
    }

    render() {
        return (
            <div
                className="zyc-dropDown"
                ref="dropDown"
                onMouseEnter={this.handleEnter.bind(this)}
                onMouseLeave={this.handleLeaver.bind(this)}
            >
                {this.props.children}
                {
                    this.show ?
                        <Portal
                            target={this.refs.dropDown}
                            fixed
                        >
                            {this.props.overlay}
                        </Portal> : null
                }
            </div>
        );
    }
}
