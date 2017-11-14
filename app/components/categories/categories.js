/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'


@observer
export default class Categories extends React.Component {

    render() {
        console.log('categories')
        return (
            <div className="categories">
                categories
            </div>
        )
    }
}
