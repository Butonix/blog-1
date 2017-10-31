/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

export default class Main extends React.Component {

    render() {
        return (
            <main className="css-main">
                <div className="css-main-inner">
                    {this.props.children}
                </div>
            </main>
        )
    }
}
