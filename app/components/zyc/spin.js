/**
 * Created by scriptchao on 2017/12/6.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './spin.sass'

@observer
class Spin extends React.Component {

    render() {
        return (
            <div className="zyc-spin">
                {null}
            </div>
        )
    }
}


function SpinRender() {

}

SpinRender.prototype = {
    show: function () {
        ReactDOM.render(<Spin />, document.getElementById('spin'))
    },
    close: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById('spin'))

    }
};

export default new SpinRender