/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'


@observer
export default class CategoriesTag extends React.Component {

    render() {
        console.log('categoriesTag')
        return (
            <div className="categories-tag">
                tags
            </div>
        )
    }
}
