/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'


@observer
export default class Footer extends React.Component {

    render() {
        console.log('footer');
        return (
            <footer className="com-footer">
                footer
            </footer>
        )
    }
}
