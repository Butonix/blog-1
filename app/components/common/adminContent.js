/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

export default class AdminContent extends React.Component {

    render() {
        return (
            <header className="css-adminContent">
                {this.props.children}
            </header>
        )
    }
}
