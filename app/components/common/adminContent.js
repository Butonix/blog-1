/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './adminContent.sass'

@observer
export default class AdminContent extends React.Component {

    render() {
        return (
            <div className="com-admin-content">
                {this.props.children}
            </div>
        )
    }
}
