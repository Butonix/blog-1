/**
 * Created by scriptchao on 2018/1/23.
 */

import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { Dialog } from '../zyc';
import './dialogDelete.sass';

@observer
class DialogDelete extends React.Component {
    render() {
        const { show } = this.props;
        return (
            <Dialog
                title="删除确认"
                show={show}
                width={300}
                onOk={this.props.onOk}
                onClose={this.props.onClose}
            >
                <div className="dialog-delete">
                    <span className="zyc-text-red">是否确认删除?</span>
                </div>
            </Dialog>
        );
    }
}


export default DialogDelete;

