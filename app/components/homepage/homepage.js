/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './homepage.sass'

@observer
export default class Homepage extends React.Component {

    componentDidMount() {
        // console.log(this.props.history)
    }

    render() {
        console.log('homepage')
        return (
            <div className="homepage">
                homepage
            </div>
        )
    }
}