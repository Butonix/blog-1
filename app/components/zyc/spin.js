/**
 * Created by scriptchao on 2017/12/6.
 */

import React from 'react';
import ReactDom from 'react-dom';
import { observer } from 'mobx-react';
import './spin.sass';

@observer
class Spin extends React.Component {

    render() {
        return (
            <div className="zyc-spin">
                {null}
            </div>
        );
    }
}


function SpinRender() {

}

SpinRender.prototype = {
    show() {
        ReactDom.render(<Spin />, document.getElementById('spin'));
    },
    close() {
        ReactDom.unmountComponentAtNode(document.getElementById('spin'));
    },
};

export default new SpinRender();